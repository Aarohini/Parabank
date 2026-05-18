# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> Accounts API Tests >> Validate CREATE Account API for Valid CREATE Account API
- Location: tests\api.spec.ts:67:13

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  3   | import { AccountsAPI } from '../pages/AccountsAPI';
  4   | import { Assert } from '../utils/Assert';
  5   | import apiGETData from '../test-data/getAPI.json';
  6   | import apiPOSTData from '../test-data/createAPI.json';
  7   | import { XMLParser } from 'fast-xml-parser';
  8   | import Ajv from 'ajv';
  9   | import { accountSchema } from '../utils/schema';
  10  | 
  11  | const ajv = new Ajv();
  12  | const parser = new XMLParser();
  13  | 
  14  | test.describe('Accounts API Tests', () => {
  15  | 
  16  |     let accountsAPI: AccountsAPI;
  17  | 
  18  |     let response: APIResponse;
  19  | 
  20  |     test.beforeEach(async ({ apiContext }) => {
  21  | 
  22  |         accountsAPI = new AccountsAPI(apiContext);
  23  | 
  24  |     });
  25  | 
  26  |     for (const apiData of apiGETData) {
  27  | 
  28  |         test(apiData.testName, async () => {
  29  | 
  30  |             const accountId = apiData.accountId as number;
  31  |             response = await accountsAPI.getAccount(accountId);
  32  | 
  33  |             const responseText = await response.text();
  34  | 
  35  |             console.log(responseText);
  36  | 
  37  |             Assert.verifyStatusCode(response, apiData.expectedStatus);
  38  | 
  39  |             if (apiData.expectedStatus === 200) {
  40  |                 if (apiData.accountId !== undefined && apiData.accountId !== '') {
  41  |                     expect(responseText).toContain(
  42  |                         `<id>${apiData.accountId}</id>`
  43  |                     );
  44  |                 }
  45  | 
  46  |                 if (apiData.expectedType) {
  47  |                     expect(responseText).toContain(
  48  |                         `<type>${apiData.expectedType}</type>`
  49  |                     );
  50  |                 }
  51  |                 //schema validation of the get response
  52  |                 const jsonData = parser.parse(responseText);
  53  | 
  54  |                 const validate = ajv.compile(accountSchema);
  55  | 
  56  |                 const isValid = validate(jsonData);
  57  | 
  58  |                 expect(isValid).toBeTruthy();
  59  |             }
  60  | 
  61  |         });
  62  | 
  63  |     }
  64  | 
  65  |     for (const apiData of apiPOSTData) {
  66  | 
  67  |         test(`Validate CREATE Account API for ${apiData.testName}`, async () => {
  68  | 
  69  |             response = await accountsAPI.createAccount(
  70  | 
  71  |                 apiData.customerId,
  72  | 
  73  |                 apiData.newAccountType,
  74  | 
  75  |                 apiData.fromAccountId
  76  | 
  77  |             );
  78  | 
  79  |             const responseText = await response.text();
  80  | 
  81  |             console.log(responseText);
  82  | 
  83  |             Assert.verifyStatusCode(
  84  |                 response,
  85  |                 apiData.expectedStatus
  86  |             );
  87  | 
  88  |             if (apiData.expectedStatus === 200) {
  89  |                 expect(responseText).toContain('<account>');
  90  | 
  91  |                 if (apiData.expectedType) {
  92  |                     expect(responseText).toContain(
  93  |                         `<type>${apiData.expectedType}</type>`
  94  |                     );
  95  |                 }
  96  |                 //schema validation of the create response
  97  |                 const jsonData = parser.parse(responseText);
  98  | 
  99  |                 const validate = ajv.compile(accountSchema);
  100 | 
  101 |                 const isValid = validate(jsonData);
  102 | 
> 103 |                 expect(isValid).toBeTruthy();
      |                                 ^ Error: expect(received).toBeTruthy()
  104 |             }
  105 | 
  106 |         });
  107 | 
  108 |     }
  109 | 
  110 | });
```