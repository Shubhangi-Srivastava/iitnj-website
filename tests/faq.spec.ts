import { test, expect } from '@playwright/test';

test.describe('FAQ Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all 6 FAQ items render', async ({ page }) => {
    const items = page.locator('.faq-item');
    await expect(items).toHaveCount(6);
  });

  test('clicking a question opens the answer', async ({ page }) => {
    const firstItem = page.locator('.faq-item').first();
    await expect(firstItem).not.toHaveClass(/open/);
    await firstItem.locator('.faq-q').click();
    await expect(firstItem).toHaveClass(/open/);
  });

  test('only one FAQ can be open at a time', async ({ page }) => {
    const items = page.locator('.faq-item');
    await items.nth(0).locator('.faq-q').click();
    await expect(items.nth(0)).toHaveClass(/open/);

    await items.nth(1).locator('.faq-q').click();
    await expect(items.nth(1)).toHaveClass(/open/);
    await expect(items.nth(0)).not.toHaveClass(/open/);
  });

  test('clicking open FAQ closes it', async ({ page }) => {
    const firstItem = page.locator('.faq-item').first();
    await firstItem.locator('.faq-q').click();
    await expect(firstItem).toHaveClass(/open/);
    await firstItem.locator('.faq-q').click();
    await expect(firstItem).not.toHaveClass(/open/);
  });

  test('answer text is correct for first FAQ', async ({ page }) => {
    const firstItem = page.locator('.faq-item').first();
    await firstItem.locator('.faq-q').click();
    const answer = firstItem.locator('.faq-a p');
    await expect(answer).toContainText('3-6 months');
  });
});
