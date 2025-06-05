import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ServerManager } from '../../src/utils/ServerManager.js';
import { GeminiImageService } from '../../src/services/GeminiImageService.js';
import { StyleCatalogService } from '../../src/services/StyleCatalogService.js';
import { ImageGenerationTool } from '../../src/tools/ImageGenerationTool.js';
import { StyleCatalogTool } from '../../src/tools/StyleCatalogTool.js';

// Mock external dependencies
vi.mock('fastmcp', () => ({
  FastMCP: vi.fn().mockImplementation((options) => ({
    options,
    start: vi.fn(),
    addTool: vi.fn(),
  })),
}));

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn(),
    }),
  })),
}));

vi.mock('../../src/config/index.js', () => ({
  ConfigManager: {
    getInstance: vi.fn().mockReturnValue({
      config: {
        name: 'Test MCP Server',
        version: '0.1.0',
        googleApiKey: 'test-key',
        model: 'gemini-2.0-flash-exp',
      },
    }),
  },
}));

describe('Server Integration', () => {
  let serverManager: ServerManager;
  let server: any;

  beforeEach(() => {
    vi.clearAllMocks();
    serverManager = new ServerManager();
    server = serverManager.getServer();
  });

  it('should initialize all components successfully', () => {
    const imageService = new GeminiImageService();
    const styleCatalogService = new StyleCatalogService();

    expect(imageService).toBeDefined();
    expect(styleCatalogService).toBeDefined();
  });

  it('should register tools correctly', () => {
    const imageService = new GeminiImageService();
    const styleCatalogService = new StyleCatalogService();

    new ImageGenerationTool(server, imageService);
    new StyleCatalogTool(server, styleCatalogService);

    expect(server.addTool).toHaveBeenCalledTimes(2);
    expect(server.addTool).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'generate_image',
        description: expect.any(String),
        parameters: expect.any(Object),
        execute: expect.any(Function),
      })
    );
    expect(server.addTool).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'list_image_styles',
        description: expect.any(String),
        parameters: expect.any(Object),
        execute: expect.any(Function),
      })
    );
  });

  it('should handle full workflow', async () => {
    const imageService = new GeminiImageService();
    const styleCatalogService = new StyleCatalogService();

    // Register tools
    new ImageGenerationTool(server, imageService);
    new StyleCatalogTool(server, styleCatalogService);

    // Verify style catalog functionality
    const aspectRatios = styleCatalogService.getAspectRatios();
    const styles = styleCatalogService.getStyles();

    expect(aspectRatios).toContain('1:1');
    expect(styles.length).toBeGreaterThan(0);
    expect(styles[0]).toHaveProperty('name');
    expect(styles[0]).toHaveProperty('category');
  });

  it('should handle service dependencies correctly', () => {
    const imageService = new GeminiImageService();
    
    // Test that service can be created without errors
    expect(() => new ImageGenerationTool(server, imageService)).not.toThrow();
    
    const styleCatalogService = new StyleCatalogService();
    
    // Test that service can be created without errors
    expect(() => new StyleCatalogTool(server, styleCatalogService)).not.toThrow();
  });
});