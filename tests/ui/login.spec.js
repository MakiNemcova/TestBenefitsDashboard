import { test, expect } from '@playwright/test';
import { login } from '../../utils/ui/auth';

test.describe("Paylocity Automation Test - Login", () => {
    test.describe.configure({ mode: 'serial' });

    test('Check for Login page', async ({ page }) => {
        await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/');

        //To have Title
        await expect(page).toHaveTitle('Log In - Paylocity Benefits Dashboard')
    })

    test('Login Test', async ({ page }) => {
        await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/');

        // Login
        await login(page);
        await page.getByRole('link', { name: 'Paylocity Benefits Dashboard' }).click();
    })
});