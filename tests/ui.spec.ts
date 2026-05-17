import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';

import { RegisterPage } from '../pages/registerPage';

import { OpenAccountPage } from '../pages/openAccountPage';

import { getTestScenarios, UserRegistrationScenario } from '../utils/testDataUtils';

test.describe('ParaBank UI Automation', () => {
    const testCases: UserRegistrationScenario[] = getTestScenarios();

    for (const scenario of testCases) {
        test(scenario.description, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const registerPage = new RegisterPage(page);
            const openAccountPage = new OpenAccountPage(page);

            await loginPage.navigateToHomePage();
            await loginPage.clickRegisterLink();

            await registerPage.registerUser(scenario);

            const successMessage = page.getByText('Your account was created successfully. You are now logged in.');

            if (scenario.expectSuccess) {
                await expect(successMessage).toBeVisible();
                await page.click('text=Log Out');
                await loginPage.login(scenario.username, scenario.password);
                await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
                await openAccountPage.navigateToOpenAccountPage();
                await openAccountPage.createCheckingAccount();
                await expect(page.getByText('Account Opened!')).toBeVisible();
                const accountNumber = await openAccountPage.getNewAccountNumber();
                console.log(`New Account Number: ${accountNumber}`);
            } else {
                await expect(successMessage).not.toBeVisible();
                await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();
                if (scenario.expectedError) {
                    await expect(page.locator(`text=${scenario.expectedError}`)).toBeVisible();
                }
            }
        });
    }
});
