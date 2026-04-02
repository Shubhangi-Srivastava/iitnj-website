import { test, expect } from '@playwright/test';

test.describe('Programs Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all 16 program cards render', async ({ page }) => {
    const cards = page.locator('.p-card');
    await expect(cards).toHaveCount(16);
  });

  test('filter tabs work — click Technology shows only IT cards', async ({ page }) => {
    await page.locator('.tab[data-f="it"]').click();
    const visibleCards = page.locator('.p-card:not(.hidden)');
    const allVisible = await visibleCards.all();
    for (const card of allVisible) {
      await expect(card).toHaveAttribute('data-c', 'it');
    }
    expect(allVisible.length).toBe(5);
  });

  test('"All" tab shows all cards', async ({ page }) => {
    // First filter
    await page.locator('.tab[data-f="it"]').click();
    // Then click All
    await page.locator('.tab[data-f="all"]').click();
    const hiddenCards = page.locator('.p-card.hidden');
    await expect(hiddenCards).toHaveCount(0);
  });

  test('each card has icon, title, description, and tag', async ({ page }) => {
    const firstCard = page.locator('.p-card').first();
    await expect(firstCard.locator('.p-left')).toBeAttached();
    await expect(firstCard.locator('h3')).toBeAttached();
    await expect(firstCard.locator('p')).toBeAttached();
    await expect(firstCard.locator('.p-tag')).toBeAttached();
  });

  test('Spanish courses note is visible', async ({ page }) => {
    const spanishNote = page.locator('text=Construction courses also available in Spanish');
    await expect(spanishNote).toBeAttached();
  });

  test('cards have hover arrow element', async ({ page }) => {
    const arrows = page.locator('.p-card .p-arrow');
    const count = await arrows.count();
    expect(count).toBe(16);
  });
});
