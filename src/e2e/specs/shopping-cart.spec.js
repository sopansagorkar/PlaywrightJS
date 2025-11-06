const { test, expect } = require('@playwright/test');

test.describe('Shopping Cart Testing', () => {
    test.beforeEach(async ({ page }) => {
        // Login using direct selectors
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    });

    test('Add Items to Cart', async ({ page }) => {
        // Add multiple items to cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

        // Verify cart badge
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await expect(page.locator('.shopping_cart_badge')).toHaveText(/\d+/);

        // Verify cart contents
    await page.click('.shopping_cart_link');
    const cartCount = await page.locator('.cart_item').count();
    await expect(cartCount).toBeGreaterThan(0);
    });

    test('Remove Items from Cart', async ({ page }) => {
        // Add item then remove from product page
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await page.click('[data-test="remove-sauce-labs-backpack"]');
        // badge may disappear when empty
        // Add item and remove from cart page
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="remove-sauce-labs-bike-light"]');

        // Verify cart is empty (badge not visible)
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

    test('Cart Persistence', async ({ page }) => {
        // Add items to cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

        // Refresh page
        await page.reload();

        // Verify items remain in cart
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    await page.click('.shopping_cart_link');
    const persistedCount = await page.locator('.cart_item').count();
    await expect(persistedCount).toBeGreaterThan(0);
    });
});