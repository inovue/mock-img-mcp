import type { FastMCP } from 'fastmcp';
import { z } from 'zod';
import type { StyleCatalog } from '../services/StyleCatalogService.js';

export class StyleCatalogTool {
  constructor(
    private server: FastMCP,
    private styleCatalog: StyleCatalog
  ) {
    this.registerTool();
  }

  private registerTool(): void {
    this.server.addTool({
      name: 'list_image_styles',
      description: 'List available image styles and aspect ratios',
      parameters: z.object({}),
      execute: async () => {
        const styles = this.styleCatalog.getStyles();
        const stylesByCategory = {
          realistic: this.styleCatalog.getStylesByCategory('realistic'),
          artistic: this.styleCatalog.getStylesByCategory('artistic'),
          digital: this.styleCatalog.getStylesByCategory('digital'),
          abstract: this.styleCatalog.getStylesByCategory('abstract'),
        };

        const result = {
          aspect_ratios: this.styleCatalog.getAspectRatios(),
          styles: styles.map((s) => s.name),
          styles_by_category: stylesByCategory,
          style_details: styles,
          tips: this.styleCatalog.getTips(),
        };

        return JSON.stringify(result, null, 2);
      },
    });
  }
}
