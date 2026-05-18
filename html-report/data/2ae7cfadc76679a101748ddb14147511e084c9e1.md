# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> TC-E2E-01: Validate New Account Created via UI Exists in API Response >> TC-E2E-01: Should register user, open account via UI, and verify account ID via API
- Location: tests\e2e.spec.ts:9:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome Aarohini NA
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Account Opened!" [level=1] [ref=e51]
        - paragraph [ref=e52]: Congratulations, your account is now open.
        - paragraph [ref=e53]:
          - text: "Your new account number:"
          - link "21114" [ref=e54] [cursor=pointer]:
            - /url: activity.htm?id=21114
  - generic [ref=e56]:
    - list [ref=e57]:
      - listitem [ref=e58]:
        - link "Home" [ref=e59] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e60]:
        - link "About Us" [ref=e61] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e62]:
        - link "Services" [ref=e63] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e64]:
        - link "Products" [ref=e65] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e66]:
        - link "Locations" [ref=e67] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e68]:
        - link "Forum" [ref=e69] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e70]:
        - link "Site Map" [ref=e71] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e72]:
        - link "Contact Us" [ref=e73] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e74]: © Parasoft. All rights reserved.
    - list [ref=e75]:
      - listitem [ref=e76]: "Visit us at:"
      - listitem [ref=e77]:
        - link "www.parasoft.com" [ref=e78] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/apiFixture';
  2  | import { AccountsAPI } from '../pages/AccountsAPI';
  3  | import { LoginPage } from '../pages/loginPage';
  4  | import { RegisterPage } from '../pages/registerPage';
  5  | import { OpenAccountPage } from '../pages/openAccountPage';
  6  | import { getTestScenarios } from '../utils/testDataUtils';
  7  | 
  8  | test.describe('TC-E2E-01: Validate New Account Created via UI Exists in API Response', () => {
  9  |     test('TC-E2E-01: Should register user, open account via UI, and verify account ID via API', 
  10 |         async ({ page,apiContext}) => {
  11 |       
  12 |         
  13 |         // Get a unique test scenario (use the first valid registration)
  14 |         const scenarios = getTestScenarios();
  15 |         const scenario = scenarios[0];
  16 | 
  17 |         if (!scenario.expectSuccess) {
  18 |             throw new Error('Test scenario must expect success');
  19 |         }
  20 | 
  21 |         const loginPage = new LoginPage(page);
  22 |         const registerPage = new RegisterPage(page);
  23 |         const openAccountPage = new OpenAccountPage(page);
  24 |         const accountsAPI = new AccountsAPI(apiContext);
  25 | 
  26 |         // Step 1: Register user via UI
  27 |         await loginPage.navigateToHomePage();
  28 |         await loginPage.clickRegisterLink();
  29 |         await registerPage.registerUser(scenario);
  30 | 
  31 |         // Verify registration success
  32 |         const successMessage = page.getByText('Your account was created successfully. You are now logged in.');
  33 |         await expect(successMessage).toBeVisible();
  34 | 
  35 |         // Step 2: Open account via UI
  36 |         await openAccountPage.navigateToOpenAccountPage();
  37 |         await openAccountPage.createCheckingAccount();
  38 | 
  39 |         // Verify account was created
  40 |         await expect(page.getByText('Account Opened!')).toBeVisible();
  41 | 
  42 |         // Step 3: Capture account ID from UI
  43 |         const uiAccountNumber = await openAccountPage.getNewAccountNumber();
  44 |         expect(uiAccountNumber).toBeTruthy();
  45 | 
  46 |         // Step 4: Verify account via API using the captured account ID
  47 |         const accountResponse = await accountsAPI.getAccount(parseInt(uiAccountNumber!, 10));
  48 |         
  49 |         const responseText = await accountResponse.text();
  50 | 
  51 |         // Step 5: Assert that the account ID exists in the API response
> 52 |         expect(accountResponse.status()).toBe(200);
     |                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  53 |         expect(responseText).toContain(`<id>${uiAccountNumber}</id>`);
  54 |         
  55 |         console.log(`✓ Account verified: UI account ID (${uiAccountNumber}) matches API response`);
  56 |     });
  57 | });
  58 | 
```