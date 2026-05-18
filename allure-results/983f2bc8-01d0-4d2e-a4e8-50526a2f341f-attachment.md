# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui.spec.ts >> ParaBank UI Automation >> TC-NEG-03: Verify registration fails when all mandatory fields are blank
- Location: tests\ui.spec.ts:15:13

# Error details

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('text=Register')

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  | 
  5  |     readonly page: Page;
  6  | 
  7  |     constructor(page: Page) {
  8  |         this.page = page;
  9  |     }
  10 | 
  11 |     usernameInput = 'input[name="username"]';
  12 |     passwordInput = 'input[name="password"]';
  13 | 
  14 |     loginButton = 'input[value="Log In"]';
  15 | 
  16 |     registerLink = 'text=Register';
  17 | 
  18 |     async navigateToHomePage() {
  19 | 
  20 |         await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  21 |         // await this.page.goto('http://localhost:9090/parabank/index.htm');
  22 |     }
  23 | 
  24 |     async login(username: string, password: string) {
  25 |         await this.page.fill(this.usernameInput, username);
  26 |         await this.page.fill(this.passwordInput, password);
  27 |         await this.page.click(this.loginButton);
  28 |     }
  29 | 
  30 |     async clickRegisterLink() {
  31 | 
> 32 |         await this.page.click(this.registerLink);
     |                         ^ Error: page.click: Target page, context or browser has been closed
  33 |     }
  34 | }
```