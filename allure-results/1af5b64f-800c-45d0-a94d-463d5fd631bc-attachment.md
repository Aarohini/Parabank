# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance.spec.ts >> Repeated GET Accounts API Calls
- Location: tests\performance.spec.ts:22:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { PerformanceHelper } from '../utils/performanceHelper';
  3  | 
  4  | const accountUrl = 'https://parabank.parasoft.com/parabank/services/bank/accounts/13566';
  5  | 
  6  | test('Validate API Response Time', async ({ request }) => {
  7  | 
  8  |     const startTime = Date.now();
  9  | 
  10 |     const response = await request.get(accountUrl);
  11 | 
  12 |     const endTime = Date.now();
  13 |     const responseTime = endTime - startTime;
  14 |     console.log(`Total response Time: ${responseTime} ms`);
  15 |     
  16 |     
  17 |     PerformanceHelper.validateApiResponseTime(responseTime);
  18 |     expect(response.status()).toBe(200);
  19 | 
  20 | });
  21 | 
  22 | test('Repeated GET Accounts API Calls', async ({ request }) => {
  23 | 
  24 |     const totalRequests = 20;
  25 |     const promises = [];
  26 | 
  27 |     for (let i = 0; i < totalRequests; i++) {
  28 |         promises.push(request.get(accountUrl));
  29 |     }
  30 | 
  31 |     const startTime = Date.now();
  32 |     const responses = await Promise.all(promises);
  33 |     const endTime = Date.now();
  34 | 
  35 |     const totalTime = endTime - startTime;
  36 |     console.log(`Total Throughput Time: ${totalTime} ms`);
  37 | 
  38 |     PerformanceHelper.validateTotalThroughputTime(totalTime, totalRequests);
  39 | 
  40 |     for (const response of responses) {
> 41 |         expect(response.status()).toBe(200);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  42 |     }
  43 | 
  44 | });
  45 | 
```