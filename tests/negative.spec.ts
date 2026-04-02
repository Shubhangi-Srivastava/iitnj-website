import { test, expect } from '@playwright/test';

test.describe('Negative Scenarios', () => {
  test('page does not have console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForTimeout(2000);
    // Filter out known benign errors (e.g., external resource loads)
    const realErrors = errors.filter(e => !e.includes('Failed to load resource') && !e.includes('favicon'));
    expect(realErrors).toEqual([]);
  });

  test('submitting form with invalid email shows validation', async ({ page }) => {
    await page.goto('/');
    const formBox = page.locator('.form-box');
    const inputs = formBox.locator('input[type="text"]');
    await inputs.nth(0).fill('Jane');
    await inputs.nth(1).fill('Doe');
    await formBox.locator('input[type="email"]').fill('notanemail');
    await formBox.locator('select').selectOption({ index: 1 });
    await page.locator('.form-submit').click();
    // HTML5 validation should prevent submission — button text should NOT change
    const btnText = await page.locator('.form-submit span').textContent();
    expect(btnText).toContain('Submit Application');
  });

  test('submitting empty form does not proceed', async ({ page }) => {
    await page.goto('/');
    await page.locator('.form-submit').click();
    const btnText = await page.locator('.form-submit span').textContent();
    expect(btnText).toContain('Submit Application');
  });

  test('clicking non-existent anchor does not break page', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const a = document.createElement('a');
      a.href = '#nonexistent';
      document.body.appendChild(a);
      a.click();
    });
    // Page should still be functional
    await expect(page.locator('nav')).toBeVisible();
  });

  test('no broken image sources', async ({ page }) => {
    await page.goto('/');
    const brokenImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      const broken: string[] = [];
      imgs.forEach(img => {
        if (img.naturalWidth === 0 && img.complete) {
          broken.push(img.src);
        }
      });
      return broken;
    });
    // Allow external images that may fail in test env
    // Just check no local images are broken
    const localBroken = brokenImages.filter(src => src.includes('localhost'));
    expect(localBroken).toEqual([]);
  });

  test('filter to a category then back to All restores all cards', async ({ page }) => {
    await page.goto('/');
    const allCards = await page.locator('.p-card').count();
    await page.locator('.tab[data-f="con"]').click();
    const filtered = await page.locator('.p-card:not(.hidden)').count();
    expect(filtered).toBeLessThan(allCards);
    await page.locator('.tab[data-f="all"]').click();
    const restored = await page.locator('.p-card:not(.hidden)').count();
    expect(restored).toBe(allCards);
  });

  test('rapid clicking FAQ items does not break accordion', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('.faq-item');
    // Rapid click multiple items
    for (let i = 0; i < 6; i++) {
      await items.nth(i % 6).locator('.faq-q').click();
    }
    // At most one should be open
    const openCount = await page.locator('.faq-item.open').count();
    expect(openCount).toBeLessThanOrEqual(1);
  });

  test('double-clicking form submit does not double-submit', async ({ page }) => {
    await page.goto('/');
    const formBox = page.locator('.form-box');
    await formBox.locator('input[type="text"]').nth(0).fill('Jane');
    await formBox.locator('input[type="text"]').nth(1).fill('Doe');
    await formBox.locator('input[type="email"]').fill('jane@test.com');
    await formBox.locator('select').selectOption({ index: 1 });
    const btn = page.locator('.form-submit');
    await btn.dblclick();
    // Button should be disabled after first submit
    await expect(btn).toBeDisabled();
  });

  test('very wide window (3000px) does not break layout', async ({ page }) => {
    await page.setViewportSize({ width: 3000, height: 720 });
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    // Content should not wildly exceed viewport
    expect(bodyWidth).toBeLessThanOrEqual(3100);
  });

  test('very narrow window (320px) does not overflow horizontally', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5;
    });
    expect(overflow).toBe(false);
  });
});
