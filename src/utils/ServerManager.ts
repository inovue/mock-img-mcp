import { FastMCP } from 'fastmcp';
import { ConfigManager } from '../config/index.js';

export class ServerManager {
  private server: FastMCP;
  private config: ConfigManager;

  constructor() {
    this.config = ConfigManager.getInstance();
    this.server = new FastMCP({
      name: this.config.config.name,
      version: this.config.config.version as `${number}.${number}.${number}`,
    });

    this.setupGracefulShutdown();
  }

  getServer(): FastMCP {
    return this.server;
  }

  async start(): Promise<void> {
    try {
      await this.server.start({
        transportType: 'stdio',
      });
    } catch (error) {
      console.error('Failed to start MCP server:', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(): void {
    const shutdown = (signal: string) => {
      console.log(`Received ${signal}, shutting down gracefully...`);
      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  }
}
