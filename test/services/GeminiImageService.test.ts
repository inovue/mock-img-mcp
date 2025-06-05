import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiImageService } from '../../src/services/GeminiImageService.js';
import type { ImageGenerationRequest } from '../../src/types/index.js';

// Mock the GoogleGenerativeAI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn(),
    }),
  })),
}));

// Mock the ConfigManager
vi.mock('../../src/config/index.js', () => ({
  ConfigManager: {
    getInstance: vi.fn().mockReturnValue({
      config: {
        googleApiKey: 'test-api-key',
        model: 'gemini-2.0-flash-exp',
      },
    }),
  },
}));

describe('GeminiImageService', () => {
  let service: GeminiImageService;
  let mockGenerateContent: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Get the mocked GoogleGenerativeAI
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const MockedGoogleGenerativeAI = GoogleGenerativeAI as any;
    
    // Setup the mock to return our mock function
    mockGenerateContent = vi.fn();
    MockedGoogleGenerativeAI.mockImplementation(() => ({
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: mockGenerateContent,
      }),
    }));
    
    service = new GeminiImageService();
  });

  it('should generate image successfully', async () => {
    const mockResponse = {
      response: {
        text: () => 'Generated image description',
      },
    };
    mockGenerateContent.mockResolvedValue(mockResponse);

    const request: ImageGenerationRequest = {
      prompt: 'A beautiful sunset',
      aspectRatio: '16:9',
      style: 'photorealistic',
    };

    const result = await service.generateImage(request);

    expect(result.success).toBe(true);
    expect(result.response).toBe('Generated image description');
    expect(result.model).toBe('gemini-2.0-flash-exp');
    expect(result.aspectRatio).toBe('16:9');
    expect(result.style).toBe('photorealistic');
    expect(result.prompt).toContain('A beautiful sunset');
    expect(result.prompt).toContain('Style: photorealistic');
    expect(result.prompt).toContain('Aspect ratio: 16:9');
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('API Error');
    mockGenerateContent.mockRejectedValue(mockError);

    const request: ImageGenerationRequest = {
      prompt: 'Test prompt',
    };

    const result = await service.generateImage(request);

    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
    expect(result.prompt).toBe('Test prompt');
    expect(result.model).toBe('gemini-2.0-flash-exp');
  });

  it('should build prompt correctly with defaults', async () => {
    const mockResponse = {
      response: {
        text: () => 'Generated image description',
      },
    };
    mockGenerateContent.mockResolvedValue(mockResponse);

    const request: ImageGenerationRequest = {
      prompt: 'Simple prompt',
    };

    const result = await service.generateImage(request);

    expect(result.success).toBe(true);
    expect(result.aspectRatio).toBe('1:1');
    expect(result.style).toBe('');
    expect(result.prompt).toBe('Simple prompt');
  });

  it('should build prompt with style only', async () => {
    const mockResponse = {
      response: {
        text: () => 'Generated image description',
      },
    };
    mockGenerateContent.mockResolvedValue(mockResponse);

    const request: ImageGenerationRequest = {
      prompt: 'Test prompt',
      style: 'anime',
    };

    const result = await service.generateImage(request);

    expect(result.success).toBe(true);
    expect(result.prompt).toContain('Style: anime');
    expect(result.prompt).toContain('Test prompt');
  });

  it('should build prompt with aspect ratio only', async () => {
    const mockResponse = {
      response: {
        text: () => 'Generated image description',
      },
    };
    mockGenerateContent.mockResolvedValue(mockResponse);

    const request: ImageGenerationRequest = {
      prompt: 'Test prompt',
      aspectRatio: '4:3',
    };

    const result = await service.generateImage(request);

    expect(result.success).toBe(true);
    expect(result.prompt).toContain('Aspect ratio: 4:3');
    expect(result.prompt).toContain('Test prompt');
  });
});