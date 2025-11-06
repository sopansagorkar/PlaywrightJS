const { test, expect } = require('@playwright/test');
const { BasePage } = require('../pages/loginPage');

test.describe('Authentication Testing', () => {
    let basePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        await basePage.visitUrl();
    });

    test('Valid Login - Standard User', async ({ page }) => {
        // Login with standard user
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        
        // Verify successful login
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    });

    test('Invalid Login - Wrong Credentials', async ({ page }) => {
        // Attempt login with invalid credentials
        await page.fill('[data-test="username"]', 'invalid_user');
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');
        
        // Verify error message
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Locked Out User Login', async ({ page }) => {
        // Attempt login with locked out user
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
        
        // Verify locked out message
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out');
    });
});