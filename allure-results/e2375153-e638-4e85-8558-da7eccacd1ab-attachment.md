# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> Accounts API Tests >> TC-API-01, TC-API-04, TC-API-05 & TC-API-06: Valid GET Account API, validate schema and account type, balance
- Location: tests\api.spec.ts:45:13

# Error details

```
Error: apiRequestContext.get: getaddrinfo ENOTFOUND parabank.parasoft.com
Call log:
  - → GET https://parabank.parasoft.com/parabank/services/bank/accounts/13566
    - user-agent: Playwright/1.60.0 (x64; windows 10.0) node/24.13
    - accept: application/xml
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1  | import { BaseAPI } from './BaseAPI';
  2  | import { Logger } from '../utils/logger';
  3  | export class AccountsAPI extends BaseAPI {
  4  | 
  5  |     async getAccount(accountId: number) {
  6  |          Logger.api('GET',`/accounts/${accountId}`);
  7  | 
> 8  |         return await this.apiContext.get(
     |                                      ^ Error: apiRequestContext.get: getaddrinfo ENOTFOUND parabank.parasoft.com
  9  |             `accounts/${accountId}`
  10 |         );
  11 | 
  12 |     }
  13 | 
  14 |     async createAccount(
  15 |         customerId: number,
  16 |         newAccountType: number,
  17 |         fromAccountId: number
  18 |     ) {
  19 |         Logger.api('POST', `/createAccount`);
  20 | 
  21 |         Logger.info(`Customer ID: ${customerId}`);
  22 | 
  23 |         return await this.apiContext.post(
  24 | 
  25 |             'createAccount',
  26 | 
  27 |             {
  28 | 
  29 |                 params: {
  30 |                     customerId,
  31 |                     newAccountType,
  32 |                     fromAccountId
  33 |                 }
  34 | 
  35 |             }
  36 | 
  37 |         );
  38 | 
  39 |     }
  40 | 
  41 | }
```