# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> Accounts API Tests >> TC-API-01, TC-API-04, TC-API-05 & TC-API-06: Valid GET Account API, validate schema and account type, balance
- Location: tests\api.spec.ts:45:13

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "<type>SAVINGS</type>"
Received string:    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><account><id>13566</id><customerId>12434</customerId><type>CHECKING</type><balance>-284.50</balance></account>"
```

# Test source

```ts
  1   | import { APIResponse } from '@playwright/test';
  2   | 
  3   | import { test, expect } from '../fixtures/apiFixture';
  4   | 
  5   | import { AccountsAPI } from '../pages/AccountsAPI';
  6   | 
  7   | import { Assert } from '../utils/Assert';
  8   | 
  9   | import apiGETData from '../test-data/getAPI.json';
  10  | 
  11  | import apiPOSTData from '../test-data/createAPI.json';
  12  | 
  13  | import { XMLParser } from 'fast-xml-parser';
  14  | 
  15  | import Ajv from 'ajv';
  16  | 
  17  | import { accountSchema } from '../utils/schema';
  18  | 
  19  | import { Logger } from '../utils/logger';
  20  | 
  21  | const ajv = new Ajv();
  22  | 
  23  | const parser = new XMLParser();
  24  | 
  25  | test.describe('Accounts API Tests', () => {
  26  | 
  27  |     let accountsAPI: AccountsAPI;
  28  | 
  29  |     let response: APIResponse;
  30  | 
  31  |     test.beforeEach(async ({ apiContext }) => {
  32  | 
  33  |         accountsAPI = new AccountsAPI(apiContext);
  34  | 
  35  |         Logger.info('Accounts API Test Execution Started');
  36  | 
  37  |     });
  38  | 
  39  |     // =====================================================
  40  |     // GET ACCOUNT API TESTS
  41  |     // =====================================================
  42  | 
  43  |     for (const apiData of apiGETData) {
  44  | 
  45  |         test(apiData.testName, async () => {
  46  | 
  47  |             Logger.info(
  48  |                 `Executing Testcase: ${apiData.testName}`
  49  |             );
  50  | 
  51  |             const accountId = apiData.accountId as number;
  52  | 
  53  |             Logger.info(
  54  |                 `Sending GET Request for Account ID: ${accountId}`
  55  |             );
  56  | 
  57  |             response = await accountsAPI.getAccount(accountId);
  58  | 
  59  |             const responseText = await response.text();
  60  | 
  61  |             Logger.info(
  62  |                 `Response Body: ${responseText}`
  63  |             );
  64  | 
  65  |             // Status Code Validation
  66  | 
  67  |             Assert.verifyStatusCode(
  68  |                 response,
  69  |                 apiData.expectedStatus
  70  |             );
  71  | 
  72  |             Logger.success(
  73  |                 `Status Code Validated: ${apiData.expectedStatus}`
  74  |             );
  75  | 
  76  |             // Positive Validations
  77  | 
  78  |             if (apiData.expectedStatus === 200) {
  79  | 
  80  |                 // Account ID Validation
  81  | 
  82  |                 if (
  83  |                     apiData.accountId !== undefined &&
  84  |                     apiData.accountId !== ''
  85  |                 ) {
  86  | 
  87  |                     expect(responseText).toContain(
  88  |                         `<id>${apiData.accountId}</id>`
  89  |                     );
  90  | 
  91  |                     Logger.success(
  92  |                         'Account ID Validation Passed'
  93  |                     );
  94  | 
  95  |                 }
  96  | 
  97  |                 // Account Type Validation
  98  | 
  99  |                 if (apiData.expectedType) {
  100 | 
> 101 |                     expect(responseText).toContain(
      |                                          ^ Error: expect(received).toContain(expected) // indexOf
  102 |                         `<type>${apiData.expectedType}</type>`
  103 |                     );
  104 | 
  105 |                     Logger.success(
  106 |                         'Account Type Validation Passed'
  107 |                     );
  108 | 
  109 |                 }
  110 | 
  111 |                 // Schema Validation
  112 | 
  113 |                 const jsonData = parser.parse(responseText);
  114 | 
  115 |                 const validate = ajv.compile(accountSchema);
  116 | 
  117 |                 const isValid = validate(jsonData);
  118 | 
  119 |                 expect(isValid).toBeTruthy();
  120 | 
  121 |                 Logger.success(
  122 |                     'Schema Validation Passed'
  123 |                 );
  124 | 
  125 |                 // TC-API-06
  126 |                 // Balance Validation
  127 | 
  128 |                 expect(
  129 |                     jsonData.account.balance
  130 |                 ).not.toBeNull();
  131 | 
  132 |                 expect(
  133 |                     Number(jsonData.account.balance)
  134 |                 ).not.toBeNaN();
  135 | 
  136 |                 Logger.success(
  137 |                     'Balance Validation Passed'
  138 |                 );
  139 | 
  140 |             }
  141 | 
  142 |         });
  143 | 
  144 |     }
  145 | 
  146 |     // =====================================================
  147 |     // CREATE ACCOUNT API TESTS
  148 |     // =====================================================
  149 | 
  150 |     for (const apiData of apiPOSTData) {
  151 | 
  152 |         test(apiData.testName, async () => {
  153 | 
  154 |             Logger.info(
  155 |                 `Executing Testcase: ${apiData.testName}`
  156 |             );
  157 | 
  158 |             Logger.info(
  159 |                 `Sending CREATE Account Request for Customer ID: ${apiData.customerId}`
  160 |             );
  161 | 
  162 |             response = await accountsAPI.createAccount(
  163 | 
  164 |                 apiData.customerId,
  165 | 
  166 |                 apiData.newAccountType,
  167 | 
  168 |                 apiData.fromAccountId
  169 | 
  170 |             );
  171 | 
  172 |             const responseText = await response.text();
  173 | 
  174 |             Logger.info(
  175 |                 `Response Body: ${responseText}`
  176 |             );
  177 | 
  178 |             // Status Code Validation
  179 | 
  180 |             Assert.verifyStatusCode(
  181 |                 response,
  182 |                 apiData.expectedStatus
  183 |             );
  184 | 
  185 |             Logger.success(
  186 |                 `Status Code Validated: ${apiData.expectedStatus}`
  187 |             );
  188 | 
  189 |             // Positive Validations
  190 | 
  191 |             if (apiData.expectedStatus === 200) {
  192 | 
  193 |                 expect(responseText).toContain(
  194 |                     '<account>'
  195 |                 );
  196 | 
  197 |                 Logger.success(
  198 |                     'Account Creation Validation Passed'
  199 |                 );
  200 | 
  201 |                 // Account Type Validation
```