import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('form renders with all fields', async ({ page }) => {
    const formBox = page.locator('.form-box');
    await expect(formBox.locator('input[type="text"]')).toHaveCount(2); // first name, last name
    await expect(formBox.locator('input[type="email"]')).toHaveCount(1);
    await expect(formBox.locator('input[type="tel"]')).toHaveCount(1);
    await expect(formBox.locator('select')).toHaveCount(1);
  });

  test('form validation — empty required fields prevent submit', async ({ page }) => {
    const submitBtn = page.locator('.form-submit');
    await submitBtn.click();
    // Form should NOT show submitted since fields are empty (HTML5 validation)
    const btnText = await submitBtn.locator('span').textContent();
    expect(btnText).toContain('Submit Application');
  });

  test('successful submission shows submitted message', async ({ page }) => {
    const formBox = page.locator('.form-box');
    const inputs = formBox.locator('input[type="text"]');
    await inputs.nth(0).fill('Jane');
    await inputs.nth(1).fill('Doe');
    await formBox.locator('input[type="email"]').fill('jane@test.com');
    await formBox.locator('input[type="tel"]').fill('5551234567');
    await formBox.locator('select').selectOption({ index: 1 });
    await page.locator('.form-submit').click();
    await expect(page.locator('.form-submit span')).toContainText('✓ Submitted!');
  });

  test('program dropdown has all program options', async ({ page }) => {
    const options = page.locator('.form-box select option:not([disabled])');
    const count = await options.count();
    // 5 IT + 4 Construction + 3 Entrepreneurship + 4 Creative + 1 "Not sure" = 17
    expect(count).toBeGreaterThanOrEqual(17);
  });

  test('phone call link is present below form', async ({ page }) => {
    const phoneLink = page.locator('.form-box a[href="tel:6094951700"]');
    await expect(phoneLink).toBeAttached();
    await expect(phoneLink).toContainText('(609) 495-1700');
  });
});
