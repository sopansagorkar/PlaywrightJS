const { test, expect } = require('@playwright/test');

// Helper: returns the first existing locator from candidate selectors
async function findLocator(page, candidates) {
    for (const s of candidates) {
        const loc = page.locator(s);
        if (await loc.count() > 0) return loc;
    }
    return null;
}

test.describe('Checkout Process Testing', () => {
    test.beforeEach(async ({ page }) => {
        // Login and add items to cart using stable selectors
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();

        // Add a product to cart
        const addBtn = await findLocator(page, [
            '[data-test="add-to-cart-sauce-labs-backpack"]',
            '[data-test="add-to-cart-sauce-labs-backpack"]',
            '[data-test="add-to-cart-sauce-labs-bike-light"]'
        ]);
        if (addBtn) await addBtn.click();

        // Go to cart
        const cart = await findLocator(page, ['.shopping_cart_link', '[data-test="shopping-cart-link"]']);
        if (cart) await cart.click();
        await expect(page.locator('.cart_list')).toBeVisible();
    });

    test('Complete Checkout Process', async ({ page }) => {
        // Start checkout
        const checkoutBtn = await findLocator(page, ['[data-test="checkout"]', 'button#checkout', 'button[name="checkout"]']);
        await checkoutBtn.click();

        // Fill checkout information
        await page.fill('[data-test="firstName"]', 'Test');
        await page.fill('[data-test="lastName"]', 'User');
        await page.fill('[data-test="postalCode"]', '12345');
        const continueBtn = await findLocator(page, ['[data-test="continue"]', 'button#continue']);
        await continueBtn.click();

        // Verify checkout overview
        await expect(page.locator('.checkout_summary_container')).toBeVisible();
        await expect(page.locator('.inventory_item_price').first()).toBeVisible();
        await expect(page.locator('.summary_subtotal_label')).toBeVisible();

        // Complete purchase
        const finishBtn = await findLocator(page, ['[data-test="finish"]', 'button#finish']);
        await finishBtn.click();

        // Verify order confirmation
        await expect(page.locator('.checkout_complete_container')).toBeVisible();
        await expect(page.locator('.complete-header')).toBeVisible();
    });

    test('Checkout Form Validation', async ({ page }) => {
        const checkoutBtn = await findLocator(page, ['[data-test="checkout"]', 'button#checkout']);
        await checkoutBtn.click();

        // Test empty form submission
        const continueBtn = await findLocator(page, ['[data-test="continue"]', 'button#continue']);
        await continueBtn.click();
        const errorLoc = await findLocator(page, ['[data-test="error"]', '.error-message-container', '[data-test="error-message"]']);
        await expect(errorLoc).toBeVisible();

        // Test partial form completion
        await page.fill('[data-test="firstName"]', 'Test');
        await continueBtn.click();
        await expect(errorLoc).toBeVisible();
    });

    test('Order Summary Verification', async ({ page }) => {
        const checkoutBtn = await findLocator(page, ['[data-test="checkout"]', 'button#checkout']);
        await checkoutBtn.click();

        // Fill checkout information
        await page.fill('[data-test="firstName"]', 'Test');
        await page.fill('[data-test="lastName"]', 'User');
        await page.fill('[data-test="postalCode"]', '12345');
        const continueBtn = await findLocator(page, ['[data-test="continue"]', 'button#continue']);
        await continueBtn.click();

        // Verify order summary details
        await expect(page.locator('.summary_subtotal_label')).toBeVisible();
        await expect(page.locator('.summary_tax_label')).toBeVisible();
        await expect(page.locator('.summary_total_label')).toBeVisible();

        // Verify item details
        await expect(page.locator('.inventory_item_price')).toBeVisible();
        await expect(page.locator('.inventory_item_desc')).toBeVisible();
    });
});