import { config } from 'dotenv';
import type { ServerConfig } from '../types/index.js';

// Load environment variables
config();

export class ConfigManager {
  private static instance: ConfigManager;
  private _config: ServerConfig;

  private constructor() {
    this._config = this.loadConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): ServerConfig {
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is required');
    }

    return {
      name: 'Mock Image MCP Server',
      version: '0.1.0' as const,
      googleApiKey,
      model: 'gemini-2.0-flash-exp',
    };
  }

  public get config(): ServerConfig {
    return { ...this._config };
  }
}
