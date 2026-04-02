import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero section renders with h1 text', async ({ page }) => {
    const h1 = page.locator('.hero h1');
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text).toContain('Build');
    expect(text).toContain('future');
    expect(text).toContain('Earn');
    expect(text).toContain('learn');
  });

  test('hero pill badge is visible', async ({ page }) => {
    const pill = page.locator('.hero-pill');
    await expect(pill).toBeVisible();
    await expect(pill).toContainText('Now Enrolling');
  });

  test('CTA buttons are present with correct hrefs', async ({ page }) => {
    const mainBtn = page.locator('.hero-btns .btn-main');
    await expect(mainBtn).toBeVisible();
    await expect(mainBtn).toHaveAttribute('href', '#contact');
    const ghostBtn = page.locator('.hero-btns .btn-ghost');
    await expect(ghostBtn).toBeVisible();
    await expect(ghostBtn).toHaveAttribute('href', '#programs');
  });

  test('reassurance text is visible', async ({ page }) => {
    await page.waitForTimeout(1500); // wait for fadeUp animation
    const reassurance = page.locator('.hero-content').getByText('No experience needed');
    await expect(reassurance).toBeVisible();
  });

  test('social proof avatars render', async ({ page }) => {
    const avatars = page.locator('.hero-avs span');
    await expect(avatars).toHaveCount(4);
    const socialText = page.locator('.hero-social');
    await expect(socialText).toContainText('500+ graduates');
  });
});
