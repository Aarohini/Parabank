import { Page } from '@playwright/test';

export class RegisterPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    firstName = '#customer\\.firstName';
    lastName = '#customer\\.lastName';
    address = '#customer\\.address\\.street';
    city = '#customer\\.address\\.city';
    state = '#customer\\.address\\.state';
    zipCode = '#customer\\.address\\.zipCode';
    phoneNumber = '#customer\\.phoneNumber';
    ssn = '#customer\\.ssn';
    username = '#customer\\.username';
    password = '#customer\\.password';
    confirmPassword = '#repeatedPassword';
    registerButton = 'input[value="Register"]';

    
    async registerUser(userData: any) {
        const fields = [
            { key: 'firstName', selector: this.firstName },
            { key: 'lastName', selector: this.lastName },
            { key: 'address', selector: this.address },
            { key: 'city', selector: this.city },
            { key: 'state', selector: this.state },
            { key: 'zipCode', selector: this.zipCode },
            { key: 'phoneNumber', selector: this.phoneNumber },
            { key: 'ssn', selector: this.ssn },
            { key: 'username', selector: this.username },
            { key: 'password', selector: this.password }
        ];

        for (const field of fields) {
            if (userData[field.key] !== undefined) {
                await this.page.locator(field.selector).fill(userData[field.key]);
            }
        }

        const confirmValue = userData.confirmPassword ?? userData.password;
        if (confirmValue !== undefined) {
            await this.page.locator(this.confirmPassword).fill(confirmValue);
        }

        await this.page.locator(this.registerButton).click();
    }
}