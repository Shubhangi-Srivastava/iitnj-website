import { test, expect } from '@playwright/test';

test.describe('Sections Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('about section: editorial split layout and 4 pillars', async ({ page }) => {
    await expect(page.locator('.about-split')).toBeAttached();
    await expect(page.locator('.about-text')).toBeAttached();
    await expect(page.locator('.about-vis')).toBeAttached();
    const pillars = page.locator('.pillar');
    await expect(pillars).toHaveCount(4);
  });

  test('stats section: 4 stats render with correct target values', async ({ page }) => {
    const stats = page.locator('.mega-stat');
    await expect(stats).toHaveCount(4);
    // Check data-target values
    const counters = page.locator('.mega-count');
    const targets = await counters.evaluateAll(els => els.map(el => el.getAttribute('data-target')));
    expect(targets).toEqual(['500', '10', '15', '6']);
  });

  test('EWYL: 6 enterprise items in grid', async ({ page }) => {
    const ents = page.locator('.ent-grid .ent');
    await expect(ents).toHaveCount(6);
  });

  test('gallery: 6 images in bento grid', async ({ page }) => {
    const galItems = page.locator('.gal-bento .gal-item');
    await expect(galItems).toHaveCount(6);
  });

  test('enterprises list: 8 enterprise rows with links', async ({ page }) => {
    const entRows = page.locator('.ent-list .ent-row');
    await expect(entRows).toHaveCount(8);
    // Each should be a link
    for (let i = 0; i < 8; i++) {
      const href = await entRows.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('team: 15 team member cards with images', async ({ page }) => {
    const teamCards = page.locator('.team-card');
    await expect(teamCards).toHaveCount(15);
    // Each has an image
    for (let i = 0; i < 15; i++) {
      await expect(teamCards.nth(i).locator('img')).toBeAttached();
    }
  });

  test('news: featured article + 4 side cards', async ({ page }) => {
    await expect(page.locator('.news-featured')).toHaveCount(1);
    const sideCards = page.locator('.news-stack .news-card');
    await expect(sideCards).toHaveCount(4);
  });

  test('financial: 4 aid options + CTA box', async ({ page }) => {
    const aidItems = page.locator('.aid-item');
    await expect(aidItems).toHaveCount(4);
    await expect(page.locator('.fin-cta')).toBeAttached();
  });

  test('how to apply: 3 steps render', async ({ page }) => {
    const steps = page.locator('.step');
    await expect(steps).toHaveCount(3);
  });

  test('partners: logo images render', async ({ page }) => {
    const partnerImgs = page.locator('.partners-inner img');
    const count = await partnerImgs.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
