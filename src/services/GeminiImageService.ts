import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigManager } from '../config/index.js';
import type { ImageGenerationRequest, ImageGenerationResponse } from '../types/index.js';

export interface ImageGenerationService {
  generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse>;
}

export class GeminiImageService implements ImageGenerationService {
  private genAI: GoogleGenerativeAI;
  private config: ConfigManager;

  constructor() {
    this.config = ConfigManager.getInstance();
    this.genAI = new GoogleGenerativeAI(this.config.config.googleApiKey);
  }

  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.config.config.model,
      });

      const fullPrompt = this.buildPrompt(request);

      const result = await model.generateContent([
        {
          text: fullPrompt,
        },
      ]);

      const response = result.response;
      const text = response.text();

      return {
        success: true,
        prompt: fullPrompt,
        response: text,
        model: this.config.config.model,
        aspectRatio: request.aspectRatio || '1:1',
        style: request.style || '',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        prompt: request.prompt,
        model: this.config.config.model,
        aspectRatio: request.aspectRatio || '1:1',
        style: request.style || '',
      };
    }
  }

  private buildPrompt(request: ImageGenerationRequest): string {
    let fullPrompt = request.prompt;

    if (request.style) {
      fullPrompt += ` Style: ${request.style}.`;
    }

    if (request.aspectRatio) {
      fullPrompt += ` Aspect ratio: ${request.aspectRatio}.`;
    }

    return fullPrompt;
  }
}
