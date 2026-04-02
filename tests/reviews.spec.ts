import { test, expect } from '@playwright/test';

test.describe('Reviews Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('pull quote section renders', async ({ page }) => {
    const pullQuote = page.locator('.pull-quote');
    await expect(pullQuote).toBeAttached();
    await expect(pullQuote.locator('blockquote')).toBeAttached();
    await expect(page.locator('.pq-author')).toContainText('Ryan Oldis');
  });

  test('both marquee rows exist', async ({ page }) => {
    const tracks = page.locator('.mq-track');
    await expect(tracks).toHaveCount(2);
  });

  test('review cards have stars, text, and author name', async ({ page }) => {
    const firstReview = page.locator('.rv').first();
    await expect(firstReview.locator('.rv-stars')).toContainText('★');
    await expect(firstReview.locator('p')).toBeAttached();
    await expect(firstReview.locator('.rv-author strong')).toBeAttached();
  });

  test('Google badge shows 4.8 rating', async ({ page }) => {
    const badge = page.locator('.g-badge');
    await expect(badge).toContainText('4.8');
    await expect(badge).toContainText('Google Reviews');
  });

  test('at least 12 review cards per marquee row (6 original x2 duplication)', async ({ page }) => {
    const row1Cards = page.locator('.mq-track').first().locator('.rv');
    const row1Count = await row1Cards.count();
    expect(row1Count).toBeGreaterThanOrEqual(12);

    const row2Cards = page.locator('.mq-track').nth(1).locator('.rv');
    const row2Count = await row2Cards.count();
    expect(row2Count).toBeGreaterThanOrEqual(12);
  });
});
