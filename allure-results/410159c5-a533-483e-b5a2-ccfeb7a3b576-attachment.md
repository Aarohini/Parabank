# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> TC-E2E-01: Validate New Account Created via UI Exists in API Response >> TC-E2E-01: Should register user, open account via UI, and verify account ID via API
- Location: tests\e2e.spec.ts:12:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Your account was created successfully. You are now logged in.')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Your account was created successfully. You are now logged in.')

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
- heading "Signing up is easy!" [level=1]
- paragraph: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
- table:
  - rowgroup:
    - 'row "First Name: Aarohini"':
      - cell "First Name:"
      - cell "Aarohini":
        - textbox: Aarohini
      - cell
    - 'row "Last Name: Last name is required."':
      - cell "Last Name:"
      - cell:
        - textbox
      - cell "Last name is required."
    - 'row "Address: Haldia Institute of Technology"':
      - cell "Address:"
      - cell "Haldia Institute of Technology":
        - textbox: Haldia Institute of Technology
      - cell
    - 'row "City: Haldia"':
      - cell "City:"
      - cell "Haldia":
        - textbox: Haldia
      - cell
    - 'row "State: West Bengal"':
      - cell "State:"
      - cell "West Bengal":
        - textbox: West Bengal
      - cell
    - 'row "Zip Code: 721657"':
      - cell "Zip Code:"
      - cell "721657":
        - textbox: "721657"
      - cell
    - 'row "Phone #: 98385640245"':
      - 'cell "Phone #:"'
      - cell "98385640245":
        - textbox: "98385640245"
      - cell
    - 'row "SSN: 255174521"':
      - cell "SSN:"
      - cell "255174521":
        - textbox: "255174521"
      - cell
    - row:
      - cell
    - 'row "Username: tvalidxgoh4mppz"':
      - cell "Username:"
      - cell "tvalidxgoh4mppz":
        - textbox: tvalidxgoh4mppz
      - cell
    - row "Password:":
      - cell "Password:"
      - cell:
        - textbox
      - cell
    - row "Confirm:":
      - cell "Confirm:"
      - cell:
        - textbox
      - cell
    - row "Register":
      - cell
      - cell "Register":
        - button "Register"
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
  3  | export class RegisterPage {
  4  | 
  5  |     readonly page: Page;
  6  | 
  7  |     //locators
  8  | 
  9  |     readonly firstName: Locator;
  10 |     readonly lastName: Locator;
  11 |     readonly address: Locator;
  12 |     readonly city: Locator;
  13 |     readonly state: Locator;
  14 |     readonly zipCode: Locator;
  15 |     readonly phoneNumber: Locator;
  16 |     readonly ssn: Locator;
  17 |     readonly username: Locator;
  18 |     readonly password: Locator;
  19 |     readonly confirmPassword: Locator;
  20 |     readonly registerButton: Locator;
  21 |     readonly registrationSuccessMessage: Locator;
  22 |     readonly signupHeading: Locator;
  23 | 
  24 |     constructor(page: Page) {
  25 | 
  26 |         this.page = page;
  27 | 
  28 |         //this.firstName = page.getByLabel("First Name");
  29 |          this.firstName = page.getByRole('textbox').nth(2);
  30 | 
  31 |         this.lastName = page.locator('#customer\\.lastName');
  32 |         this.address = page.locator('#customer\\.address\\.street');
  33 |         this.city =page.locator('#customer\\.address\\.city');
  34 |         this.state =page.locator('#customer\\.address\\.state');
  35 |         this.zipCode = page.locator('#customer\\.address\\.zipCode');
  36 |         this.phoneNumber =page.locator('#customer\\.phoneNumber');
  37 |         this.ssn = page.locator('#customer\\.ssn');
  38 |         this.username =page.locator('#customer\\.username');
  39 |         this.password =page.locator('#customer\\.password');
  40 |         this.confirmPassword = page.locator('#repeatedPassword');
  41 |         this.registerButton = page.getByRole('button', {name: 'Register'});
  42 |         this.registrationSuccessMessage = page.getByText(
  43 | 'Your account was created successfully. You are now logged in.');
  44 | 
  45 |         this.signupHeading = page.getByRole('heading', {name: 'Signing up is easy!'});
  46 |     }
  47 | 
  48 |     async registerUser(userData: any) {
  49 | 
  50 |         const fields = [
  51 | 
  52 |             { key: 'firstName', locator: this.firstName },
  53 |             { key: 'lastName', locator: this.lastName },
  54 |             { key: 'address', locator: this.address },
  55 |             { key: 'city', locator: this.city },
  56 |             { key: 'state', locator: this.state },
  57 |             { key: 'zipCode', locator: this.zipCode },
  58 |             { key: 'phoneNumber', locator: this.phoneNumber },
  59 |             { key: 'ssn', locator: this.ssn },
  60 |             { key: 'username', locator: this.username },
  61 |             { key: 'password', locator: this.password }
  62 |         ];
  63 | 
  64 |         for (const field of fields) {
  65 |             if (userData[field.key] !== undefined) {
  66 |                 await field.locator.fill(userData[field.key]);
  67 |             }
  68 |         }
  69 | 
  70 |         const confirmValue = userData.confirmPassword ?? userData.password;
  71 | 
  72 |         if (confirmValue !== undefined) {
  73 |             await this.confirmPassword.fill(confirmValue);
  74 |         }
  75 | 
  76 |         await this.registerButton.click();
  77 |     }
  78 | 
  79 |     async verifySuccessfulRegistration() 
  80 |     {
> 81 |         await expect(this.registrationSuccessMessage).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  82 |     }
  83 | 
  84 |     async verifyRegistrationFailed() 
  85 |     {
  86 |         await expect(this.signupHeading).toBeVisible();
  87 |     }
  88 | 
  89 |     async verifyErrorMessage(errorMessage: string) 
  90 |     {
  91 |         await expect(
  92 |             this.page.getByText(errorMessage)).toBeVisible();
  93 |     }
  94 | }
```