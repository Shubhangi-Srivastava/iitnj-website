import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image ${i} missing alt text`).toBeTruthy();
    }
  });

  test('links have discernible text', async ({ page }) => {
    // Check nav links and major CTAs have text content
    const navLinks = page.locator('.nav-links a');
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const text = await navLinks.nth(i).textContent();
      expect(text?.trim().length, `Nav link ${i} has no text`).toBeGreaterThan(0);
    }
  });

  test('form inputs have labels', async ({ page }) => {
    const labels = page.locator('.form-box .fg label');
    const count = await labels.count();
    expect(count).toBeGreaterThanOrEqual(5); // first, last, email, phone, program
  });

  test('key text elements are not invisible (basic contrast check)', async ({ page }) => {
    // Check that main heading is visible
    await page.waitForTimeout(1000);
    const h1 = page.locator('.hero h1');
    await expect(h1).toBeVisible();
    // Check section titles
    const sectionTitles = page.locator('.s-title');
    const titleCount = await sectionTitles.count();
    expect(titleCount).toBeGreaterThan(0);
  });

  test('page has proper title and meta description', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Ideal Institute of Technology');
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc).toContain('nonprofit');
  });
});
