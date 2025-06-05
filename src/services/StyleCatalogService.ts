import type { AspectRatio, ImageStyle, StyleCategory } from '../types/index.js';

export interface StyleCatalog {
  getAspectRatios(): AspectRatio[];
  getStyles(): ImageStyle[];
  getStylesByCategory(category: StyleCategory): ImageStyle[];
  getTips(): string[];
}

export class StyleCatalogService implements StyleCatalog {
  private readonly aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];

  private readonly styles: ImageStyle[] = [
    { name: 'photorealistic', description: 'Realistic photography style', category: 'realistic' },
    { name: 'portrait', description: 'Professional portrait photography', category: 'realistic' },
    { name: 'landscape', description: 'Natural landscape photography', category: 'realistic' },

    { name: 'anime', description: 'Japanese animation style', category: 'artistic' },
    { name: 'cartoon', description: 'Western cartoon style', category: 'artistic' },
    { name: 'oil painting', description: 'Traditional oil painting', category: 'artistic' },
    { name: 'watercolor', description: 'Watercolor painting technique', category: 'artistic' },
    { name: 'sketch', description: 'Pencil or charcoal sketch', category: 'artistic' },

    { name: 'digital art', description: 'Modern digital artwork', category: 'digital' },
    { name: 'pixel art', description: '8-bit pixel art style', category: 'digital' },
    { name: 'cyberpunk', description: 'Futuristic cyberpunk aesthetic', category: 'digital' },
    { name: 'steampunk', description: 'Victorian-era steampunk style', category: 'digital' },

    { name: 'minimalist', description: 'Clean minimalist design', category: 'abstract' },
    { name: 'abstract', description: 'Non-representational abstract art', category: 'abstract' },
    { name: 'geometric', description: 'Geometric shapes and patterns', category: 'abstract' },
  ];

  private readonly tips: string[] = [
    'Be specific in your prompts for better results',
    'Include lighting, composition, and mood details',
    'Specify colors, textures, and artistic techniques',
    "Use negative prompts by mentioning what you don't want",
    'Consider the target aspect ratio when composing your prompt',
    'Combine multiple styles for unique effects',
  ];

  getAspectRatios(): AspectRatio[] {
    return [...this.aspectRatios];
  }

  getStyles(): ImageStyle[] {
    return [...this.styles];
  }

  getStylesByCategory(category: StyleCategory): ImageStyle[] {
    return this.styles.filter((style) => style.category === category);
  }

  getTips(): string[] {
    return [...this.tips];
  }
}
