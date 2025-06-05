import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ServerManager } from '../../src/utils/ServerManager.js';

// Mock FastMCP
vi.mock('fastmcp', () => ({
  FastMCP: vi.fn().mockImplementation((options) => ({
    options,
    start: vi.fn(),
    addTool: vi.fn(),
  })),
}));

// Mock ConfigManager
vi.mock('../../src/config/index.js', () => ({
  ConfigManager: {
    getInstance: vi.fn().mockReturnValue({
      config: {
        name: 'Test MCP Server',
        version: '0.1.0',
        googleApiKey: 'test-key',
        model: 'test-model',
      },
    }),
  },
}));

describe('ServerManager', () => {
  let serverManager: ServerManager;
  let mockExit: any;
  let mockConsoleError: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    serverManager = new ServerManager();
  });

  afterEach(() => {
    mockExit.mockRestore();
    mockConsoleError.mockRestore();
  });

  it('should create FastMCP server with correct configuration', async () => {
    const { FastMCP } = await import('fastmcp');
    
    expect(FastMCP).toHaveBeenCalledWith({
      name: 'Test MCP Server',
      version: '0.1.0',
    });
  });

  it('should return server instance', () => {
    const server = serverManager.getServer();
    
    expect(server).toBeDefined();
    expect(server.options.name).toBe('Test MCP Server');
  });

  it('should start server successfully', async () => {
    const server = serverManager.getServer();
    (server.start as any).mockResolvedValue(undefined);

    await serverManager.start();

    expect(server.start).toHaveBeenCalledWith({
      transportType: 'stdio',
    });
  });

  it('should handle server start error', async () => {
    const server = serverManager.getServer();
    const mockError = new Error('Server start failed');
    (server.start as any).mockRejectedValue(mockError);

    await serverManager.start();

    expect(mockConsoleError).toHaveBeenCalledWith('Failed to start MCP server:', mockError);
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should setup graceful shutdown handlers', () => {
    const mockOn = vi.spyOn(process, 'on');
    
    // Create a new instance to test the setup
    new ServerManager();

    expect(mockOn).toHaveBeenCalledWith('SIGINT', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('SIGTERM', expect.any(Function));
    
    mockOn.mockRestore();
  });
});