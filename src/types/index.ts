export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio?: AspectRatio;
  style?: string;
}

export interface ImageGenerationResponse {
  success: boolean;
  prompt: string;
  response?: string;
  model: string;
  aspectRatio: AspectRatio;
  style: string;
  error?: string;
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface ImageStyle {
  name: string;
  description: string;
  category: StyleCategory;
}

export type StyleCategory = 'realistic' | 'artistic' | 'digital' | 'abstract';

export interface ServerConfig {
  name: string;
  version: string;
  googleApiKey: string;
  model: string;
}
