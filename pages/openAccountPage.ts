import { Page } from '@playwright/test';

export class OpenAccountPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    openNewAccountLink = 'text=Open New Account';

    accountTypeDropdown = '#type';

    existingAccountDropdown = '#fromAccountId';

    openAccountButton = 'input[value="Open New Account"]';

    accountOpenedMessage = 'text=Account Opened!';

    newAccountNumber = '#newAccountId';

    

    async navigateToOpenAccountPage() {

        await this.page.click(this.openNewAccountLink);
    }

    async createCheckingAccount() {

        await this.page.selectOption(this.accountTypeDropdown, '0');


        await this.page.selectOption(this.existingAccountDropdown, { index: 0 });

        await this.page.click(this.openAccountButton);
    }

    async createSavingsAccount() {

        await this.page.selectOption(this.accountTypeDropdown, '1');

        await this.page.click(this.openAccountButton);
    }

    async getNewAccountNumber() {

        return await this.page.textContent(this.newAccountNumber);
    }
}