import type { FastMCP } from 'fastmcp';
import { z } from 'zod';
import type { ImageGenerationService } from '../services/GeminiImageService.js';
import type { AspectRatio, ImageGenerationRequest } from '../types/index.js';

export class ImageGenerationTool {
  constructor(
    private server: FastMCP,
    private imageService: ImageGenerationService
  ) {
    this.registerTool();
  }

  private registerTool(): void {
    const ImageGenerationParams = z.object({
      prompt: z.string().describe('The text prompt for image generation'),
      aspect_ratio: z
        .enum(['1:1', '16:9', '9:16', '4:3', '3:4'])
        .default('1:1')
        .describe('Aspect ratio for the image'),
      style: z.string().default('').describe('Style modifier for the image'),
    });

    this.server.addTool({
      name: 'generate_image',
      description: 'Generate an image using Gemini 2.0 Flash Preview',
      parameters: ImageGenerationParams,
      execute: async (args) => {
        const { prompt, aspect_ratio = '1:1', style = '' } = args;
        const request: ImageGenerationRequest = {
          prompt,
          aspectRatio: aspect_ratio as AspectRatio,
          style,
        };

        const result = await this.imageService.generateImage(request);
        return JSON.stringify(result, null, 2);
      },
    });
  }
}
