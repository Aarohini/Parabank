import {Page,Locator,expect} from '@playwright/test';

export class RegisterPage {

    readonly page: Page;

    //Locators

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phoneNumber: Locator;
    readonly ssn: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly registerButton: Locator;
    readonly registrationSuccessMessage: Locator;
    readonly signupHeading: Locator;

    constructor(page: Page) {

        this.page = page;

        //this.firstName = page.getByLabel("First Name");
         this.firstName = page.getByRole('textbox').nth(2);

        this.lastName = page.locator('#customer\\.lastName');
        this.address = page.locator('#customer\\.address\\.street');
        this.city =page.locator('#customer\\.address\\.city');
        this.state =page.locator('#customer\\.address\\.state');
        this.zipCode = page.locator('#customer\\.address\\.zipCode');
        this.phoneNumber =page.locator('#customer\\.phoneNumber');
        this.ssn = page.locator('#customer\\.ssn');
        this.username =page.locator('#customer\\.username');
        this.password =page.locator('#customer\\.password');
        this.confirmPassword = page.locator('#repeatedPassword');
        this.registerButton = page.getByRole('button', {name: 'Register'});
        this.registrationSuccessMessage = page.getByText(
'Your account was created successfully. You are now logged in.');

        this.signupHeading = page.getByRole('heading', {name: 'Signing up is easy!'});
    }

    async registerUser(userData: any) {

        const fields = [

            { key: 'firstName', locator: this.firstName },
            { key: 'lastName', locator: this.lastName },
            { key: 'address', locator: this.address },
            { key: 'city', locator: this.city },
            { key: 'state', locator: this.state },
            { key: 'zipCode', locator: this.zipCode },
            { key: 'phoneNumber', locator: this.phoneNumber },
            { key: 'ssn', locator: this.ssn },
            { key: 'username', locator: this.username },
            { key: 'password', locator: this.password }
        ];

        for (const field of fields) {
            if (userData[field.key] !== undefined) {
                await field.locator.fill(userData[field.key]);
            }
        }

        const confirmValue = userData.confirmPassword ?? userData.password;

        if (confirmValue !== undefined) {
            await this.confirmPassword.fill(confirmValue);
        }

        await this.registerButton.click();
    }

    async verifySuccessfulRegistration() 
    {
        await expect(this.registrationSuccessMessage).toBeVisible();
    }

    async verifyRegistrationFailed() 
    {
        await expect(this.signupHeading).toBeVisible();
    }

    async verifyErrorMessage(errorMessage: string) 
    {
        await expect(
            this.page.getByText(errorMessage)).toBeVisible();
    }
}