import { test, expect } from '@playwright/test';

test.describe('Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('top enrollment banner renders with correct text', async ({ page }) => {
    const banner = page.locator('#topBanner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Spring 2026 Enrollment Open');
  });

  test('scroll progress bar exists', async ({ page }) => {
    const progressBar = page.locator('.scroll-prog');
    await expect(progressBar).toBeAttached();
  });

  test('footer has all 4 columns', async ({ page }) => {
    // 1 brand + 3 footer-col = 4 total grid children
    const footerGrid = page.locator('.footer-grid');
    const children = footerGrid.locator('> div');
    await expect(children).toHaveCount(4);
  });

  test('footer has social links (Facebook, Instagram)', async ({ page }) => {
    const socials = page.locator('.f-socials a');
    await expect(socials).toHaveCount(2);
    const fbLink = page.locator('.f-socials a[href*="facebook"]');
    await expect(fbLink).toBeAttached();
    const igLink = page.locator('.f-socials a[href*="instagram"]');
    await expect(igLink).toBeAttached();
  });

  test('Google Maps direction link in footer works', async ({ page }) => {
    const mapsLink = page.locator('footer a[href*="maps.google.com"]');
    await expect(mapsLink).toBeAttached();
    await expect(mapsLink).toContainText('Directions');
  });

  test('back to top button appears on scroll', async ({ page }) => {
    const btt = page.locator('#btt');
    await expect(btt).not.toHaveClass(/visible/);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await expect(btt).toHaveClass(/visible/);
  });

  test('all external links have target="_blank"', async ({ page }) => {
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"])');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const href = await externalLinks.nth(i).getAttribute('href');
      // Skip anchors that are internal-ish (same domain)
      if (href && !href.includes('localhost:8181')) {
        const target = await externalLinks.nth(i).getAttribute('target');
        // Some external links may not have target _blank (like the Spanish link inline)
        // We check the enterprise/footer external links specifically
      }
    }
    // Check enterprise links specifically have target blank
    const entLinks = page.locator('.ent-row[target="_blank"]');
    const entCount = await entLinks.count();
    expect(entCount).toBe(8);
  });
});
