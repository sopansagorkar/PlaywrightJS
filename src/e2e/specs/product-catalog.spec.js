const { test, expect } = require('@playwright/test');

test.describe('Product Catalog Testing', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate and login using direct selectors
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    });

    test('Product Display Verification', async ({ page }) => {
        await expect(page.locator('.inventory_item_name').first()).toBeVisible();
        await expect(page.locator('.inventory_item_price').first()).toBeVisible();
        await expect(page.locator('.inventory_item_img img').first()).toBeVisible();
    });

    test('Product Sorting Functionality', async ({ page }) => {
        // try multiple selectors for the sort control
        const candidates = ['[data-test="product_sort_container"]', 'select.product_sort_container', '.product_sort_container', 'select[data-test="product_sort_container"]'];
        let sortSelect = null;
        for (const c of candidates) {
            if (await page.locator(c).count() > 0) { sortSelect = page.locator(c); break; }
        }
        if (!sortSelect) throw new Error('Sort select element not found');

        await sortSelect.selectOption('az');
        await expect(page.locator('.inventory_item_name').first()).toBeVisible();

        await sortSelect.selectOption('za');
        await expect(page.locator('.inventory_item_name').first()).toBeVisible();

        await sortSelect.selectOption('lohi');
        await expect(page.locator('.inventory_item_price').first()).toBeVisible();

        await sortSelect.selectOption('hilo');
        await expect(page.locator('.inventory_item_price').first()).toBeVisible();
    });

    test('Product Details Verification', async ({ page }) => {
        await page.locator('.inventory_item_name').first().click();

        await expect(page.locator('.inventory_details_name')).toBeVisible();
        await expect(page.locator('.inventory_details_desc')).toBeVisible();
        await expect(page.locator('.inventory_details_price')).toBeVisible();

        // image element may exist as <img> or as background; try multiple selectors
        const imgCandidates = ['.inventory_details_img img', '.inventory_details_img', 'img.inventory_details_img'];
        let imgFound = false;
        for (const s of imgCandidates) {
            if (await page.locator(s).count() > 0) { imgFound = true; await expect(page.locator(s).first()).toBeVisible(); break; }
        }
        if (!imgFound) throw new Error('Product image not found on details page');
    });
});
