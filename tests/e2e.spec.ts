import { test, expect } from '../fixtures/apiFixture';
import { AccountsAPI } from '../pages/AccountsAPI';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { OpenAccountPage } from '../pages/openAccountPage';
import { getTestScenarios } from '../utils/testDataUtils';

test.describe('End-to-End: Register, Login, Open Account, and Verify via API', () => {
    test('Should register user, open account via UI, and verify account ID via API', async ({
        page,
        apiContext
    }) => {
        console.log('API Context:', apiContext);
        
        // Get a unique test scenario (use the first valid registration)
        const scenarios = getTestScenarios();
        const scenario = scenarios[0];

        if (!scenario.expectSuccess) {
            throw new Error('Test scenario must expect success');
        }

        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);
        const openAccountPage = new OpenAccountPage(page);
        const accountsAPI = new AccountsAPI(apiContext);

        // Step 1: Register user via UI
        await loginPage.navigateToHomePage();
        await loginPage.clickRegisterLink();
        await registerPage.registerUser(scenario);

        // Verify registration success
        const successMessage = page.getByText('Your account was created successfully. You are now logged in.');
        await expect(successMessage).toBeVisible();

        // Step 2: Open account via UI
        await openAccountPage.navigateToOpenAccountPage();
        await openAccountPage.createCheckingAccount();

        // Verify account was created
        await expect(page.getByText('Account Opened!')).toBeVisible();

        // Step 3: Capture account ID from UI
        const uiAccountNumber = await openAccountPage.getNewAccountNumber();
        expect(uiAccountNumber).toBeTruthy();

        // Step 4: Verify account via API using the captured account ID
        const accountResponse = await accountsAPI.getAccount(parseInt(uiAccountNumber!, 10));
        const responseText = await accountResponse.text();

        // Step 5: Assert that the account ID exists in the API response
        expect(accountResponse.status()).toBe(200);
        expect(responseText).toContain(`<id>${uiAccountNumber}</id>`);
        
        console.log(`✓ Account verified: UI account ID (${uiAccountNumber}) matches API response`);
    });
});
