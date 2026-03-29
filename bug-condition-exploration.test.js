/**
 * Bug Condition Exploration Test
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11**
 * 
 * This test MUST FAIL on unfixed code - failure confirms the bugs exist.
 * When this test passes after fixes, it confirms the expected behavior is satisfied.
 * 
 * Property 1: Bug Condition - Structural and Performance Issues Detection
 * For any codebase state where the bug condition holds (isBugCondition returns true),
 * the test will fail, documenting counterexamples that demonstrate the bugs exist.
 */

const fs = require('fs');
const path = require('path');

describe('Bug Condition Exploration - Portfolio Optimization Issues', () => {
  
  describe('Structural Issues (Requirements 1.1, 1.2)', () => {
    
    test('should NOT have empty src/ directories', () => {
      // Check for empty directories in src/
      const emptyDirs = [];
      const dirsToCheck = [
        'src/app/sections',
        'src/components/layout',
        'src/components/sections',
        'src/lib/db',
        'src/lib/validations'
      ];
      
      dirsToCheck.forEach(dir => {
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir);
          if (files.length === 0) {
            emptyDirs.push(dir);
          }
        }
      });
      
      // EXPECTED TO FAIL on unfixed code: empty directories exist
      expect(emptyDirs).toEqual([]);
    });
    
    test('should have only ONE CV file (Abhishek_Gupta_CV.pdf)', () => {
      const cvFiles = [];
      const possibleCVFiles = [
        'Abhishek Gupta CV.pdf',
        'Abhishek_Gupta_CV.pdf'
      ];
      
      possibleCVFiles.forEach(file => {
        if (fs.existsSync(file)) {
          cvFiles.push(file);
        }
      });
      
      // EXPECTED TO FAIL on unfixed code: both CV files exist
      expect(cvFiles).toEqual(['Abhishek_Gupta_CV.pdf']);
    });
  });
  
  describe('Performance Issues (Requirements 1.3, 1.4, 1.5, 1.6, 1.7)', () => {
    
    test('index.html should have external CSS file (not inline)', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for external CSS link
      const hasExternalCSS = indexContent.includes('<link rel="stylesheet" href="styles.css">');
      
      // Check that inline <style> tag is NOT present or is minimal
      const styleTagMatch = indexContent.match(/<style>([\s\S]*?)<\/style>/);
      const hasLargeInlineCSS = styleTagMatch && styleTagMatch[1].split('\n').length > 50;
      
      // EXPECTED TO FAIL on unfixed code: no external CSS, large inline CSS exists
      expect(hasExternalCSS).toBe(true);
      expect(hasLargeInlineCSS).toBe(false);
    });
    
    test('index.html should have external JS file (not inline)', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for external JS link
      const hasExternalJS = indexContent.includes('<script src="script.js"');
      
      // Check that inline <script> tag with large code is NOT present
      const scriptTagMatch = indexContent.match(/<script>([\s\S]*?)<\/script>/);
      const hasLargeInlineJS = scriptTagMatch && scriptTagMatch[1].split('\n').length > 50;
      
      // EXPECTED TO FAIL on unfixed code: no external JS, large inline JS exists
      expect(hasExternalJS).toBe(true);
      expect(hasLargeInlineJS).toBe(false);
    });
    
    test('index.html should be under 500 lines (modular structure)', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      const lineCount = indexContent.split('\n').length;
      
      // EXPECTED TO FAIL on unfixed code: file is 1,957 lines
      expect(lineCount).toBeLessThan(500);
    });
    
    test('CDN libraries should have resource hints (preconnect/dns-prefetch)', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for resource hints
      const hasPreconnectTailwind = indexContent.includes('<link rel="preconnect" href="https://cdn.tailwindcss.com">');
      const hasPreconnectCDNJS = indexContent.includes('<link rel="preconnect" href="https://cdnjs.cloudflare.com">');
      const hasPreconnectUnpkg = indexContent.includes('<link rel="preconnect" href="https://unpkg.com">');
      const hasDNSPrefetchJSDelivr = indexContent.includes('<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">');
      
      // EXPECTED TO FAIL on unfixed code: no resource hints present
      expect(hasPreconnectTailwind).toBe(true);
      expect(hasPreconnectCDNJS).toBe(true);
      expect(hasPreconnectUnpkg).toBe(true);
      expect(hasDNSPrefetchJSDelivr).toBe(true);
    });
  });
  
  describe('Accessibility Issues (Requirements 1.8, 1.9)', () => {
    
    test('navigation links should have aria-label attributes', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for aria-label on navigation links
      const aboutLinkHasAria = indexContent.includes('href="#about"') && 
                               indexContent.match(/<a[^>]*href="#about"[^>]*aria-label="[^"]*"/);
      const experienceLinkHasAria = indexContent.includes('href="#experience"') && 
                                    indexContent.match(/<a[^>]*href="#experience"[^>]*aria-label="[^"]*"/);
      
      // EXPECTED TO FAIL on unfixed code: navigation links lack aria-label
      expect(aboutLinkHasAria).toBeTruthy();
      expect(experienceLinkHasAria).toBeTruthy();
    });
    
    test('buttons should have aria-label attributes', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for aria-label on menu button
      const menuBtnHasAria = indexContent.match(/<button[^>]*id="menuBtn"[^>]*aria-label="[^"]*"/);
      
      // EXPECTED TO FAIL on unfixed code: buttons lack aria-label
      expect(menuBtnHasAria).toBeTruthy();
    });
    
    test('custom cursor should be disabled for reduced motion preference', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for prefers-reduced-motion media query for cursor
      const hasReducedMotionCSS = indexContent.includes('@media (prefers-reduced-motion: reduce)') &&
                                   indexContent.includes('.cursor') &&
                                   indexContent.includes('display: none');
      
      // EXPECTED TO FAIL on unfixed code: no accessibility option for custom cursor
      expect(hasReducedMotionCSS).toBe(true);
    });
  });
  
  describe('SEO Issues (Requirements 1.10, 1.11)', () => {
    
    test('sitemap.xml should have current/past date (not future date)', () => {
      const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
      
      // Extract lastmod date
      const lastmodMatch = sitemapContent.match(/<lastmod>([\d-]+)<\/lastmod>/);
      expect(lastmodMatch).toBeTruthy();
      
      const lastmodDate = new Date(lastmodMatch[1]);
      const today = new Date();
      
      // EXPECTED TO FAIL on unfixed code: date is 2026-03-27 (future)
      expect(lastmodDate.getTime()).toBeLessThanOrEqual(today.getTime());
    });
    
    test('index.html should have theme-color meta tag', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for theme-color meta tag
      const hasThemeColor = indexContent.includes('<meta name="theme-color"');
      
      // EXPECTED TO FAIL on unfixed code: theme-color meta tag missing
      expect(hasThemeColor).toBe(true);
    });
    
    test('index.html should have canonical URL', () => {
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check for canonical link
      const hasCanonical = indexContent.includes('<link rel="canonical"');
      
      // EXPECTED TO FAIL on unfixed code: canonical URL missing
      expect(hasCanonical).toBe(true);
    });
  });
});
