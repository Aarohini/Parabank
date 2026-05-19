import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    // Locators

    readonly usernameInput: Locator;

    readonly passwordInput: Locator;

    readonly loginButton: Locator;

    readonly registerLink: Locator;

    readonly logoutLink: Locator;

    readonly accountsOverviewHeading: Locator;

    readonly loginErrorMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput =
            page.locator('input[name="username"]');

        this.passwordInput =
            page.locator('input[name="password"]');

        this.loginButton =
            page.getByRole('button', {
                name: 'Log In'
            });

        this.registerLink =
            page.getByRole('link', {
                name: 'Register'
            });

        this.logoutLink =
            page.getByText('Log Out');

        this.accountsOverviewHeading =
            page.getByRole('heading', {
                name: 'Accounts Overview'
            });

        // Login failure message locator
        this.loginErrorMessage =
            page.locator('#rightPanel p.error');
    }

    async navigateToHomePage() {

        await this.page.goto(
            'https://parabank.parasoft.com/parabank/index.htm'
        );
    }

    async login(
        username: string,
        password: string
    ) {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    async clickRegisterLink() {

        await this.registerLink.click();
    }

    async logout() {

        await this.logoutLink.click();
    }

    async verifySuccessfulLogin() {

        await expect(
            this.accountsOverviewHeading
        ).toBeVisible();
    }

    async verifyLoginFailed() {

        await expect(
            this.accountsOverviewHeading
        ).not.toBeVisible();
    }

    async verifyLoginErrorMessage(
        errorMessage: string
    ) {

        await expect(
            this.loginErrorMessage
        ).toContainText(errorMessage);
    }
}