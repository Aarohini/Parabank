import { Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    usernameInput = 'input[name="username"]';
    passwordInput = 'input[name="password"]';

    loginButton = 'input[value="Log In"]';

    registerLink = 'text=Register';

    async navigateToHomePage() {

        // await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await this.page.goto('http://localhost:9090/parabank/index.htm');
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async clickRegisterLink() {

        await this.page.click(this.registerLink);
    }
}