import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImageGenerationTool } from '../../src/tools/ImageGenerationTool.js';
import type { ImageGenerationService } from '../../src/services/GeminiImageService.js';
import type { FastMCP } from 'fastmcp';

describe('ImageGenerationTool', () => {
  let mockServer: FastMCP;
  let mockImageService: ImageGenerationService;
  let mockToolFunction: any;

  beforeEach(() => {
    mockToolFunction = vi.fn();
    
    mockServer = {
      addTool: vi.fn().mockImplementation((config) => {
        mockToolFunction = config.execute;
      }),
    } as any;

    mockImageService = {
      generateImage: vi.fn(),
    } as any;

    new ImageGenerationTool(mockServer, mockImageService);
  });

  it('should register tool with correct parameters', () => {
    expect(mockServer.addTool).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'generate_image',
        description: 'Generate an image using Gemini 2.0 Flash Preview',
        parameters: expect.any(Object),
        execute: expect.any(Function),
      })
    );
  });

  it('should call image service with correct parameters', async () => {
    const mockResponse = {
      success: true,
      prompt: 'test prompt',
      response: 'generated image',
      model: 'gemini-2.0-flash-exp',
      aspectRatio: '16:9' as const,
      style: 'anime',
    };

    (mockImageService.generateImage as any).mockResolvedValue(mockResponse);

    const result = await mockToolFunction({
      prompt: 'test prompt',
      aspect_ratio: '16:9',
      style: 'anime',
    });

    expect(mockImageService.generateImage).toHaveBeenCalledWith({
      prompt: 'test prompt',
      aspectRatio: '16:9',
      style: 'anime',
    });

    expect(result).toEqual(JSON.stringify(mockResponse, null, 2));
  });

  it('should use default values when not provided', async () => {
    const mockResponse = {
      success: true,
      prompt: 'test prompt',
      response: 'generated image',
      model: 'gemini-2.0-flash-exp',
      aspectRatio: '1:1' as const,
      style: '',
    };

    (mockImageService.generateImage as any).mockResolvedValue(mockResponse);

    const result = await mockToolFunction({
      prompt: 'test prompt',
    });

    expect(mockImageService.generateImage).toHaveBeenCalledWith({
      prompt: 'test prompt',
      aspectRatio: '1:1',
      style: '',
    });

    expect(result).toEqual(JSON.stringify(mockResponse, null, 2));
  });

  it('should handle service errors', async () => {
    const mockErrorResponse = {
      success: false,
      error: 'Service error',
      prompt: 'test prompt',
      model: 'gemini-2.0-flash-exp',
      aspectRatio: '1:1' as const,
      style: '',
    };

    (mockImageService.generateImage as any).mockResolvedValue(mockErrorResponse);

    const result = await mockToolFunction({
      prompt: 'test prompt',
    });

    expect(result).toEqual(JSON.stringify(mockErrorResponse, null, 2));
  });
});