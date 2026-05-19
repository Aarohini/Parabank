import {Page,Locator,expect} from '@playwright/test';

export class OpenAccountPage {

    readonly page: Page;



    readonly openNewAccountLink: Locator;
    readonly accountTypeDropdown: Locator;
    readonly existingAccountDropdown: Locator;
    readonly openAccountButton: Locator;
    readonly accountOpenedMessage: Locator;
    readonly newAccountNumber: Locator;

    constructor(page: Page) {

        this.page = page;

        this.openNewAccountLink = page.getByRole('link', {name: 'Open New Account'});

        this.accountTypeDropdown = page.locator('#type');

        this.existingAccountDropdown = page.locator('#fromAccountId');

        this.openAccountButton = page.getByRole('button', { name: 'Open New Account' });

        this.accountOpenedMessage = page.getByText('Account Opened!');

        this.newAccountNumber = page.locator('#newAccountId');
    }

    async navigateToOpenAccountPage() {

        await this.openNewAccountLink.click();
    }

    async createCheckingAccount() {

        // Select Checking Account

        await this.accountTypeDropdown
            .selectOption('0');

        // Select Existing Account

        await this.existingAccountDropdown
            .selectOption({ index: 0 });

        // Open Account

        await this.openAccountButton.click();
    }

    async createSavingsAccount() {

        // Select Savings Account

        await this.accountTypeDropdown
            .selectOption('1');

        // Select Existing Account

        await this.existingAccountDropdown
            .selectOption({ index: 0 });

        // Open Account

        await this.openAccountButton.click();
    }

    async verifyAccountOpened() {

        await expect(
            this.accountOpenedMessage
        ).toBeVisible();
    }

    async getNewAccountNumber() {

        return await this.newAccountNumber
            .textContent();
    }
}