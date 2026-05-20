# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.ts >> Accounts API Tests >> TC-NEG-API-03: @api Invalid From Account ID
- Location: tests\api.spec.ts:99:13

# Error details

```
Error: apiRequestContext.post: connect ETIMEDOUT 172.66.170.155:443
Call log:
  - → POST https://parabank.parasoft.com/parabank/services/bank/createAccount?customerId=15320&newAccountType=0&fromAccountId=999999
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
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
  8  |         return await this.apiContext.get(
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
> 23 |         return await this.apiContext.post(
     |                                      ^ Error: apiRequestContext.post: connect ETIMEDOUT 172.66.170.155:443
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