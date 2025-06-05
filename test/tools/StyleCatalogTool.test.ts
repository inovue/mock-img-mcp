import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StyleCatalogTool } from '../../src/tools/StyleCatalogTool.js';
import type { StyleCatalog } from '../../src/services/StyleCatalogService.js';
import type { FastMCP } from 'fastmcp';

describe('StyleCatalogTool', () => {
  let mockServer: FastMCP;
  let mockStyleCatalog: StyleCatalog;
  let mockToolFunction: any;

  beforeEach(() => {
    mockToolFunction = vi.fn();
    
    mockServer = {
      addTool: vi.fn().mockImplementation((config) => {
        mockToolFunction = config.execute;
      }),
    } as any;

    mockStyleCatalog = {
      getAspectRatios: vi.fn().mockReturnValue(['1:1', '16:9', '9:16', '4:3', '3:4']),
      getStyles: vi.fn().mockReturnValue([
        { name: 'photorealistic', description: 'Realistic photography', category: 'realistic' },
        { name: 'anime', description: 'Japanese animation', category: 'artistic' },
      ]),
      getStylesByCategory: vi.fn(),
      getTips: vi.fn().mockReturnValue(['Be specific in prompts', 'Include lighting details']),
    } as any;

    // Setup category filtering
    (mockStyleCatalog.getStylesByCategory as any)
      .mockImplementation((category: string) => {
        const allStyles = [
          { name: 'photorealistic', description: 'Realistic photography', category: 'realistic' },
          { name: 'anime', description: 'Japanese animation', category: 'artistic' },
        ];
        return allStyles.filter(style => style.category === category);
      });

    new StyleCatalogTool(mockServer, mockStyleCatalog);
  });

  it('should register tool with correct parameters', () => {
    expect(mockServer.addTool).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'list_image_styles',
        description: 'List available image styles and aspect ratios',
        parameters: expect.any(Object),
        execute: expect.any(Function),
      })
    );
  });

  it('should return comprehensive style information', async () => {
    const result = await mockToolFunction({});

    expect(mockStyleCatalog.getAspectRatios).toHaveBeenCalled();
    expect(mockStyleCatalog.getStyles).toHaveBeenCalled();
    expect(mockStyleCatalog.getStylesByCategory).toHaveBeenCalledWith('realistic');
    expect(mockStyleCatalog.getStylesByCategory).toHaveBeenCalledWith('artistic');
    expect(mockStyleCatalog.getStylesByCategory).toHaveBeenCalledWith('digital');
    expect(mockStyleCatalog.getStylesByCategory).toHaveBeenCalledWith('abstract');
    expect(mockStyleCatalog.getTips).toHaveBeenCalled();

    const expected = {
      aspect_ratios: ['1:1', '16:9', '9:16', '4:3', '3:4'],
      styles: ['photorealistic', 'anime'],
      styles_by_category: {
        realistic: [{ name: 'photorealistic', description: 'Realistic photography', category: 'realistic' }],
        artistic: [{ name: 'anime', description: 'Japanese animation', category: 'artistic' }],
        digital: [],
        abstract: [],
      },
      style_details: [
        { name: 'photorealistic', description: 'Realistic photography', category: 'realistic' },
        { name: 'anime', description: 'Japanese animation', category: 'artistic' },
      ],
      tips: ['Be specific in prompts', 'Include lighting details'],
    };
    
    expect(result).toEqual(JSON.stringify(expected, null, 2));
  });

  it('should handle empty style catalogs', async () => {
    (mockStyleCatalog.getStyles as any).mockReturnValue([]);
    (mockStyleCatalog.getAspectRatios as any).mockReturnValue([]);
    (mockStyleCatalog.getTips as any).mockReturnValue([]);
    (mockStyleCatalog.getStylesByCategory as any).mockReturnValue([]);

    const result = await mockToolFunction({});
    const parsed = JSON.parse(result);

    expect(parsed.styles).toEqual([]);
    expect(parsed.aspect_ratios).toEqual([]);
    expect(parsed.tips).toEqual([]);
    expect(parsed.style_details).toEqual([]);
  });
});