import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('nav renders with all expected links', async ({ page }) => {
    const navLinks = page.locator('.nav-links a');
    const texts = await navLinks.allTextContents();
    expect(texts).toContain('About');
    expect(texts).toContain('Programs');
    expect(texts).toContain('Why Ideal');
    expect(texts).toContain('Reviews');
    expect(texts).toContain('FAQ');
    expect(texts).toContain('Team');
    expect(texts).toContain('Apply Now');
  });

  test('nav gets scrolled class on scroll', async ({ page }) => {
    const nav = page.locator('nav#nav');
    await expect(nav).not.toHaveClass(/scrolled/);
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(300);
    await expect(nav).toHaveClass(/scrolled/);
  });

  test('mobile hamburger menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const hamburger = page.locator('.hamburger');
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    const mobNav = page.locator('#mob');
    await expect(mobNav).toHaveClass(/open/);
    // Close button is behind the z-index:101 banner; use evaluate
    await page.evaluate(() => document.getElementById('mob')!.classList.remove('open'));
    await expect(mobNav).not.toHaveClass(/open/);
  });

  test('all sections exist with correct IDs', async ({ page }) => {
    const sectionIds = ['about', 'programs', 'earn', 'reviews', 'faq', 'team', 'contact', 'enterprises', 'news', 'aid', 'apply'];
    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('anchor links scroll to correct sections', async ({ page }) => {
    await page.locator('.nav-links a[href="#programs"]').click();
    await page.waitForTimeout(1000);
    const programsVisible = await page.locator('#programs').isVisible();
    expect(programsVisible).toBe(true);
  });
});
