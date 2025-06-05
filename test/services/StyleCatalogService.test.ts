import { describe, it, expect } from 'vitest';
import { StyleCatalogService } from '../../src/services/StyleCatalogService.js';

describe('StyleCatalogService', () => {
  const service = new StyleCatalogService();

  it('should return all aspect ratios', () => {
    const ratios = service.getAspectRatios();
    
    expect(ratios).toEqual(['1:1', '16:9', '9:16', '4:3', '3:4']);
    expect(ratios).toHaveLength(5);
  });

  it('should return all styles', () => {
    const styles = service.getStyles();
    
    expect(styles).toBeInstanceOf(Array);
    expect(styles.length).toBeGreaterThan(0);
    expect(styles[0]).toHaveProperty('name');
    expect(styles[0]).toHaveProperty('description');
    expect(styles[0]).toHaveProperty('category');
  });

  it('should filter styles by category', () => {
    const realisticStyles = service.getStylesByCategory('realistic');
    const artisticStyles = service.getStylesByCategory('artistic');
    
    expect(realisticStyles.every(style => style.category === 'realistic')).toBe(true);
    expect(artisticStyles.every(style => style.category === 'artistic')).toBe(true);
    expect(realisticStyles.length).toBeGreaterThan(0);
    expect(artisticStyles.length).toBeGreaterThan(0);
  });

  it('should return all style categories', () => {
    const allStyles = service.getStyles();
    const categories = [...new Set(allStyles.map(style => style.category))];
    
    expect(categories).toContain('realistic');
    expect(categories).toContain('artistic');
    expect(categories).toContain('digital');
    expect(categories).toContain('abstract');
  });

  it('should return tips array', () => {
    const tips = service.getTips();
    
    expect(tips).toBeInstanceOf(Array);
    expect(tips.length).toBeGreaterThan(0);
    expect(tips.every(tip => typeof tip === 'string')).toBe(true);
  });

  it('should return immutable arrays', () => {
    const ratios1 = service.getAspectRatios();
    const ratios2 = service.getAspectRatios();
    
    expect(ratios1).not.toBe(ratios2);
    expect(ratios1).toEqual(ratios2);
    
    const styles1 = service.getStyles();
    const styles2 = service.getStyles();
    
    expect(styles1).not.toBe(styles2);
    expect(styles1).toEqual(styles2);
  });

  it('should include specific expected styles', () => {
    const styles = service.getStyles();
    const styleNames = styles.map(style => style.name);
    
    expect(styleNames).toContain('photorealistic');
    expect(styleNames).toContain('anime');
    expect(styleNames).toContain('oil painting');
    expect(styleNames).toContain('digital art');
    expect(styleNames).toContain('minimalist');
  });
});