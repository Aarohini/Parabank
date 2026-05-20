# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui.spec.ts >> ParaBank UI Automation >> TC-AC-UI-01: @ui @smoke Valid registration, login and open account
- Location: tests\ui.spec.ts:11:13

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Accounts Overview' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Accounts Overview' })

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- heading "Customer Login" [level=2]
- paragraph: Username
- textbox
- paragraph: Password
- textbox
- button "Log In"
- paragraph:
  - link "Forgot login info?":
    - /url: lookup.htm
- paragraph:
  - link "Register":
    - /url: register.htm
- heading "Error!" [level=1]
- paragraph: Please enter a username and password.
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Forum":
      - /url: http://forums.parasoft.com/
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import {Page,Locator,expect} from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  | 
  5  |     readonly page: Page;
  6  | 
  7  |     //locators
  8  |     readonly usernameInput: Locator;
  9  |     readonly passwordInput: Locator;
  10 |     readonly loginButton: Locator;
  11 |     readonly registerLink: Locator;
  12 |     readonly logoutLink: Locator;
  13 |     readonly accountsOverviewHeading: Locator;
  14 |     readonly loginErrorMessage: Locator;
  15 | 
  16 |     constructor(page: Page) {
  17 | 
  18 |         this.page = page;
  19 |         this.usernameInput = page.locator('input[name="username"]');
  20 |         this.passwordInput = page.locator('input[name="password"]');
  21 |         this.loginButton = page.getByRole('button', {name: 'Log In'});
  22 |         this.registerLink = page.getByRole('link', {name: 'Register'});
  23 |         this.logoutLink = page.getByText('Log Out');
  24 |         this.accountsOverviewHeading =page.getByRole('heading', {name: 'Accounts Overview'});
  25 | 
  26 |         //login failure message locator
  27 |         this.loginErrorMessage = page.locator('#rightPanel p.error');
  28 |     }
  29 | 
  30 |     async navigateToHomePage() {
  31 | 
  32 |         await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  33 |     }
  34 | 
  35 |     async login(
  36 |         username: string,
  37 |         password: string
  38 |     ) {
  39 | 
  40 |         await this.usernameInput.fill(username);
  41 | 
  42 |         await this.passwordInput.fill(password);
  43 | 
  44 |         await this.loginButton.click();
  45 |     }
  46 | 
  47 |     async clickRegisterLink() {
  48 |         await this.registerLink.click();
  49 |     }
  50 | 
  51 |     async logout() {
  52 |         await this.logoutLink.click();
  53 |     }
  54 | 
  55 |     async verifySuccessfulLogin() {
> 56 |         await expect(this.accountsOverviewHeading).toBeVisible();
     |                                                    ^ Error: expect(locator).toBeVisible() failed
  57 |     }
  58 | 
  59 |     async verifyLoginFailed() {
  60 | 
  61 |         await expect(this.accountsOverviewHeading).not.toBeVisible();
  62 |     }
  63 | 
  64 |     async verifyLoginErrorMessage(errorMessage: string) {
  65 | 
  66 |         await expect(this.loginErrorMessage).toContainText(errorMessage);
  67 |     }
  68 | }
```