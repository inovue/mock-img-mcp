import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConfigManager } from '../../src/config/index.js';

describe('ConfigManager', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset the singleton instance
    (ConfigManager as any).instance = undefined;
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should create a singleton instance', () => {
    process.env.GOOGLE_API_KEY = 'test-key';
    
    const instance1 = ConfigManager.getInstance();
    const instance2 = ConfigManager.getInstance();
    
    expect(instance1).toBe(instance2);
  });

  it('should load configuration from environment variables', () => {
    process.env.GOOGLE_API_KEY = 'test-api-key';
    
    const configManager = ConfigManager.getInstance();
    const config = configManager.config;
    
    expect(config.googleApiKey).toBe('test-api-key');
    expect(config.name).toBe('Mock Image MCP Server');
    expect(config.version).toBe('0.1.0');
    expect(config.model).toBe('gemini-2.0-flash-exp');
  });

  it('should throw error when GOOGLE_API_KEY is missing', () => {
    delete process.env.GOOGLE_API_KEY;
    
    expect(() => {
      ConfigManager.getInstance();
    }).toThrow('GOOGLE_API_KEY environment variable is required');
  });

  it('should return a copy of config to prevent mutation', () => {
    process.env.GOOGLE_API_KEY = 'test-key';
    
    const configManager = ConfigManager.getInstance();
    const config1 = configManager.config;
    const config2 = configManager.config;
    
    expect(config1).not.toBe(config2);
    expect(config1).toEqual(config2);
  });
});