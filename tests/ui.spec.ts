import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { OpenAccountPage } from '../pages/openAccountPage';
import {getTestScenarios,UserRegistrationScenario} from '../utils/testDataUtils';

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

                if (scenario.expectSuccess) {

                    await registerPage.verifySuccessfulRegistration();
                    await loginPage.logout();

                    await loginPage.login(scenario.username, scenario.password);
                    await loginPage.verifySuccessfulLogin();


                    await openAccountPage.navigateToOpenAccountPage();
                    // await openAccountPage.createSavingsAccount();
                    await openAccountPage.createCheckingAccount();
                    await openAccountPage.verifyAccountOpened();

                    const accountNumber =await openAccountPage.getNewAccountNumber();
                    console.log(`New Account Number: ${accountNumber}`);
                }


                else {

                    await registerPage.verifyRegistrationFailed();
                    if (scenario.expectedError) {

                        await registerPage.verifyErrorMessage(scenario.expectedError);
                    }
                }
            }
        );
    }
});