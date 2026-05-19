# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui.spec.ts >> ParaBank UI Automation >> TC-LOGIN-02 Verify Login with Invalid Password
- Location: tests\ui.spec.ts:143:13

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#rightPanel p.error')
Timeout: 5000ms
- Expected substring  - 1
+ Received string     + 3

- The username and password could not be verified.
+
+ 			An internal error has occurred and has been logged.
+ 		

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#rightPanel p.error')
    10 × locator resolved to <p class="error">↵⇆⇆⇆An internal error has occurred and has been l…</p>
       - unexpected value "
			An internal error has occurred and has been logged.
		"

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
- paragraph: Welcome demo demo
- heading "Account Services" [level=2]
- list:
  - listitem:
    - link "Open New Account":
      - /url: openaccount.htm
  - listitem:
    - link "Accounts Overview":
      - /url: overview.htm
  - listitem:
    - link "Transfer Funds":
      - /url: transfer.htm
  - listitem:
    - link "Bill Pay":
      - /url: billpay.htm
  - listitem:
    - link "Find Transactions":
      - /url: findtrans.htm
  - listitem:
    - link "Update Contact Info":
      - /url: updateprofile.htm
  - listitem:
    - link "Request Loan":
      - /url: requestloan.htm
  - listitem:
    - link "Log Out":
      - /url: logout.htm
- heading "Accounts Overview" [level=1]
- table:
  - rowgroup:
    - row "Account Balance* Available Amount":
      - columnheader "Account"
      - columnheader "Balance*"
      - columnheader "Available Amount"
  - rowgroup:
    - row "24444 $515.50 $515.50":
      - cell "24444":
        - link "24444":
          - /url: activity.htm?id=24444
      - cell "$515.50"
      - cell "$515.50"
    - row "Total $515.50":
      - cell "Total"
      - cell "$515.50"
      - cell
  - rowgroup:
    - row "*Balance includes deposits that may be subject to holds":
      - cell "*Balance includes deposits that may be subject to holds"
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
  62  |         await this.page.goto(
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
> 109 |         ).toContainText(errorMessage);
      |           ^ Error: expect(locator).toContainText(expected) failed
  110 |     }
  111 | }
```