import { test, expect } from '../fixtures/apiFixture';
import { AccountsAPI } from '../pages/AccountsAPI';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { OpenAccountPage } from '../pages/openAccountPage';
import { getTestScenarios } from '../utils/testDataUtils';

test.describe('TC-E2E-01: Validate New Account Created via UI Exists in API Response', () => {
    test('TC-E2E-01: Should register user, open account via UI, and verify account ID via API', 
        async ({ page,apiContext}) => {
      
        
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

        await loginPage.navigateToHomePage();
        await loginPage.clickRegisterLink();
        await registerPage.registerUser(scenario);

        const successMessage = page.getByText('Your account was created successfully. You are now logged in.');
        await expect(successMessage).toBeVisible();

        await openAccountPage.navigateToOpenAccountPage();
        await openAccountPage.createCheckingAccount();

        await expect(page.getByText('Account Opened!')).toBeVisible();

        const uiAccountNumber = await openAccountPage.getNewAccountNumber();
        expect(uiAccountNumber).toBeTruthy();

        const accountResponse = await accountsAPI.getAccount(parseInt(uiAccountNumber!, 10));
        
        const responseText = await accountResponse.text();


        expect(responseText).toContain(`<id>${uiAccountNumber}</id>`);
        
        console.log(`✓ Account verified: UI account ID (${uiAccountNumber}) matches API response`);
    });
});
