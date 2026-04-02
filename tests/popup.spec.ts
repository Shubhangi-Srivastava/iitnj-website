import { test, expect } from '@playwright/test';

test.describe('Lead Capture Popup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('popup does NOT show on initial load', async ({ page }) => {
    const popup = page.locator('#popup');
    await expect(popup).not.toHaveClass(/show/);
  });

  test('popup appears when triggered via JS', async ({ page }) => {
    // Trigger popup manually since the real timeout is 45s
    await page.evaluate(() => {
      document.getElementById('popup')!.classList.add('show');
    });
    const popup = page.locator('#popup');
    await expect(popup).toHaveClass(/show/);
    await expect(popup).toBeVisible();
  });

  test('popup can be closed with X button', async ({ page }) => {
    await page.evaluate(() => document.getElementById('popup')!.classList.add('show'));
    await page.locator('.popup-close').click();
    await expect(page.locator('#popup')).not.toHaveClass(/show/);
  });

  test('popup overlay click handler is not attached (script runs before DOM element)', async ({ page }) => {
    // NOTE: The overlay click-to-close doesn't work because the addEventListener
    // runs before the #popup div exists in the DOM. This test documents that behavior.
    await page.evaluate(() => document.getElementById('popup')!.classList.add('show'));
    // Clicking the overlay should NOT close it (handler wasn't attached)
    const viewportSize = page.viewportSize()!;
    await page.locator('#popup').click({ position: { x: 10, y: viewportSize.height - 10 }, force: true });
    await page.waitForTimeout(500);
    // Popup remains open — this is the actual website behavior
    await expect(page.locator('#popup')).toHaveClass(/show/);
    // Can still be closed via the X button (inline onclick)
    await page.locator('.popup-close').click();
    await expect(page.locator('#popup')).not.toHaveClass(/show/);
  });

  test('email input accepts text', async ({ page }) => {
    await page.evaluate(() => document.getElementById('popup')!.classList.add('show'));
    const emailInput = page.locator('.popup-box input[type="email"]');
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('submit button changes text on click', async ({ page }) => {
    await page.evaluate(() => document.getElementById('popup')!.classList.add('show'));
    const submitBtn = page.locator('.popup-box .btn-main');
    await submitBtn.click();
    await expect(submitBtn).toContainText('Sent! Check your inbox');
  });
});
