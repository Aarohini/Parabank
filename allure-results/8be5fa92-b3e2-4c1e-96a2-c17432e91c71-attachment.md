# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> Accounts API Tests >> TC-API-01, TC-API-04, TC-API-05 & TC-API-06: @api Valid GET Account API, validate schema and account type, balance
- Location: tests\api.spec.ts:30:13

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "<type>CHECKING</type>"
Received string:    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><account><id>13566</id><customerId>12212</customerId><type>SAVINGS</type><balance>100.00</balance></account>"
```

# Test source

```ts
  1   | import { APIResponse } from '@playwright/test';
  2   | import { test, expect } from '../fixtures/apiFixture';
  3   | import { AccountsAPI } from '../pages/AccountsAPI';
  4   | import { Assert } from '../utils/Assert';
  5   | import apiGETData from '../test-data/getAPI.json';
  6   | import apiPOSTData from '../test-data/createAPI.json';
  7   | import { XMLParser } from 'fast-xml-parser';
  8   | import Ajv from 'ajv';
  9   | import { accountSchema } from '../utils/schema';
  10  | import { Logger } from '../utils/logger';
  11  | 
  12  | const ajv = new Ajv();
  13  | const parser = new XMLParser();
  14  | 
  15  | test.describe('Accounts API Tests', () => {
  16  | 
  17  |     let accountsAPI: AccountsAPI;
  18  |     let response: APIResponse;
  19  | 
  20  |     test.beforeEach(async ({ apiContext }) => {
  21  | 
  22  |         accountsAPI = new AccountsAPI(apiContext);
  23  | 
  24  |         Logger.info('Accounts API Test Execution Started');
  25  | 
  26  |     });
  27  | 
  28  |     for (const apiData of apiGETData) {
  29  | 
  30  |         test(apiData.testName, async () => {
  31  | 
  32  |             Logger.info(`Executing Testcase: ${apiData.testName}`);
  33  |             const accountId = apiData.accountId as number;
  34  | 
  35  |             Logger.info(`Sending GET Request for Account ID: ${accountId}`);
  36  |             response = await accountsAPI.getAccount(accountId);
  37  | 
  38  |             const responseText = await response.text();
  39  |             Logger.info(`Response Body: ${responseText}`);
  40  | 
  41  | 
  42  |             Assert.verifyStatusCode(response,apiData.expectedStatus);
  43  | 
  44  |             Logger.success(`Status Code Validated: ${apiData.expectedStatus}`);
  45  | 
  46  | 
  47  | 
  48  |             if (apiData.expectedStatus === 200) {
  49  | 
  50  | 
  51  | 
  52  |                 if (
  53  |                     apiData.accountId !== undefined &&
  54  |                     apiData.accountId !== ''
  55  |                 ) {
  56  | 
  57  |                     expect(responseText).toContain(
  58  |                         `<id>${apiData.accountId}</id>`
  59  |                     );
  60  | 
  61  |                     Logger.success('Account ID Validation Passed');
  62  | 
  63  |                 }
  64  | 
  65  | 
  66  | 
  67  |                 if (apiData.expectedType) {
  68  | 
> 69  |                     expect(responseText).toContain(
      |                                          ^ Error: expect(received).toContain(expected) // indexOf
  70  |                         `<type>${apiData.expectedType}</type>`
  71  |                     );
  72  | 
  73  |                     Logger.success('Account Type Validation Passed');
  74  | 
  75  |                 }
  76  | 
  77  | 
  78  |                 const jsonData = parser.parse(responseText);
  79  |                 const validate = ajv.compile(accountSchema);
  80  |                 const isValid = validate(jsonData);
  81  |                 expect(isValid).toBeTruthy();
  82  | 
  83  |                 Logger.success('Schema Validation Passed');
  84  | 
  85  |                 //balance validations
  86  |                 expect(jsonData.account.balance).not.toBeNull();
  87  |                 expect(Number(jsonData.account.balance)).not.toBeNaN();
  88  | 
  89  |                 Logger.success('Balance Validation Passed');
  90  | 
  91  |             }
  92  | 
  93  |         });
  94  | 
  95  |     }
  96  | 
  97  |     for (const apiData of apiPOSTData) {
  98  | 
  99  |         test(apiData.testName, async () => {
  100 | 
  101 |             Logger.info(`Executing Testcase: ${apiData.testName}`);
  102 | 
  103 |             Logger.info(`Sending CREATE Account Request for Customer ID: ${apiData.customerId}`);
  104 | 
  105 |             response = await accountsAPI.createAccount(
  106 |                 apiData.customerId,
  107 |                 apiData.newAccountType,
  108 |                 apiData.fromAccountId
  109 |             );
  110 | 
  111 |             const responseText = await response.text();
  112 | 
  113 |             Logger.info(`Response Body: ${responseText}`);
  114 | 
  115 | 
  116 |             Assert.verifyStatusCode(response,apiData.expectedStatus);
  117 | 
  118 |             Logger.success(`Status Code Validated: ${apiData.expectedStatus}`);
  119 | 
  120 | 
  121 |             if (apiData.expectedStatus === 200) {
  122 | 
  123 |                 expect(responseText).toContain(
  124 |                     '<account>'
  125 |                 );
  126 | 
  127 |                 Logger.success('Account Creation Validation Passed');
  128 | 
  129 | 
  130 |                 if (apiData.expectedType) {
  131 | 
  132 |                     expect(responseText).toContain(
  133 |                         `<type>${apiData.expectedType}</type>`
  134 |                     );
  135 | 
  136 |                     Logger.success('Account Type Validation Passed');
  137 | 
  138 |                 }
  139 | 
  140 | 
  141 |                 const jsonData = parser.parse(responseText);
  142 |                 const validate = ajv.compile(accountSchema);
  143 |                 const isValid = validate(jsonData);
  144 |                 expect(isValid).toBeTruthy();
  145 |                 Logger.success('Schema Validation Passed');
  146 | 
  147 |             }
  148 | 
  149 |         });
  150 | 
  151 |     }
  152 | 
  153 | });
```