import { GeminiImageService } from './services/GeminiImageService.js';
import { StyleCatalogService } from './services/StyleCatalogService.js';
import { ImageGenerationTool } from './tools/ImageGenerationTool.js';
import { StyleCatalogTool } from './tools/StyleCatalogTool.js';
import { ServerManager } from './utils/ServerManager.js';

async function main(): Promise<void> {
  // Initialize server manager
  const serverManager = new ServerManager();
  const server = serverManager.getServer();

  // Initialize services
  const imageService = new GeminiImageService();
  const styleCatalogService = new StyleCatalogService();

  // Register tools
  new ImageGenerationTool(server, imageService);
  new StyleCatalogTool(server, styleCatalogService);

  // Start server
  await serverManager.start();
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
  });
}

export { main };
