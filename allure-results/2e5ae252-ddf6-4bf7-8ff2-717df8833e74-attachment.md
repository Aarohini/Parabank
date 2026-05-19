# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui.spec.ts >> ParaBank UI Automation >> TC-NEG-02: @ui @ negative Mismatched passwords shows validation error
- Location: tests\ui.spec.ts:11:13

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://parabank.parasoft.com/parabank/index.htm", waiting until "load"

```

# Test source

```ts
  1   | import {
  2   |     Page,
  3   |     Locator,
  4   |     expect
  5   | } from '@playwright/test';
  6   | 
  7   | export class LoginPage {
  8   | 
  9   |     readonly page: Page;
  10  | 
  11  |     // Locators
  12  | 
  13  |     readonly usernameInput: Locator;
  14  | 
  15  |     readonly passwordInput: Locator;
  16  | 
  17  |     readonly loginButton: Locator;
  18  | 
  19  |     readonly registerLink: Locator;
  20  | 
  21  |     readonly logoutLink: Locator;
  22  | 
  23  |     readonly accountsOverviewHeading: Locator;
  24  | 
  25  |     readonly loginErrorMessage: Locator;
  26  | 
  27  |     constructor(page: Page) {
  28  | 
  29  |         this.page = page;
  30  | 
  31  |         this.usernameInput =
  32  |             page.locator('input[name="username"]');
  33  | 
  34  |         this.passwordInput =
  35  |             page.locator('input[name="password"]');
  36  | 
  37  |         this.loginButton =
  38  |             page.getByRole('button', {
  39  |                 name: 'Log In'
  40  |             });
  41  | 
  42  |         this.registerLink =
  43  |             page.getByRole('link', {
  44  |                 name: 'Register'
  45  |             });
  46  | 
  47  |         this.logoutLink =
  48  |             page.getByText('Log Out');
  49  | 
  50  |         this.accountsOverviewHeading =
  51  |             page.getByRole('heading', {
  52  |                 name: 'Accounts Overview'
  53  |             });
  54  | 
  55  |         // Login failure message locator
  56  |         this.loginErrorMessage =
  57  |             page.locator('#rightPanel p.error');
  58  |     }
  59  | 
  60  |     async navigateToHomePage() {
  61  | 
> 62  |         await this.page.goto(
      |                         ^ Error: page.goto: Target page, context or browser has been closed
  63  |             'https://parabank.parasoft.com/parabank/index.htm'
  64  |         );
  65  |     }
  66  | 
  67  |     async login(
  68  |         username: string,
  69  |         password: string
  70  |     ) {
  71  | 
  72  |         await this.usernameInput.fill(username);
  73  | 
  74  |         await this.passwordInput.fill(password);
  75  | 
  76  |         await this.loginButton.click();
  77  |     }
  78  | 
  79  |     async clickRegisterLink() {
  80  | 
  81  |         await this.registerLink.click();
  82  |     }
  83  | 
  84  |     async logout() {
  85  | 
  86  |         await this.logoutLink.click();
  87  |     }
  88  | 
  89  |     async verifySuccessfulLogin() {
  90  | 
  91  |         await expect(
  92  |             this.accountsOverviewHeading
  93  |         ).toBeVisible();
  94  |     }
  95  | 
  96  |     async verifyLoginFailed() {
  97  | 
  98  |         await expect(
  99  |             this.accountsOverviewHeading
  100 |         ).not.toBeVisible();
  101 |     }
  102 | 
  103 |     async verifyLoginErrorMessage(
  104 |         errorMessage: string
  105 |     ) {
  106 | 
  107 |         await expect(
  108 |             this.loginErrorMessage
  109 |         ).toContainText(errorMessage);
  110 |     }
  111 | }
```