# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance.spec.ts >> Repeated GET Accounts API Calls
- Location: tests\performance.spec.ts:20:5

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
  14 | 
  15 |     PerformanceHelper.validateApiResponseTime(responseTime);
  16 |     expect(response.status()).toBe(200);
  17 | 
  18 | });
  19 | 
  20 | test('Repeated GET Accounts API Calls', async ({ request }) => {
  21 | 
  22 |     const totalRequests = 20;
  23 |     const promises = [];
  24 | 
  25 |     for (let i = 0; i < totalRequests; i++) {
  26 |         promises.push(request.get(accountUrl));
  27 |     }
  28 | 
  29 |     const startTime = Date.now();
  30 |     const responses = await Promise.all(promises);
  31 |     const endTime = Date.now();
  32 | 
  33 |     const totalTime = endTime - startTime;
  34 |     console.log(`Total Throughput Time: ${totalTime} ms`);
  35 | 
  36 |     PerformanceHelper.validateTotalThroughputTime(totalTime, totalRequests);
  37 | 
  38 |     for (const response of responses) {
> 39 |         expect(response.status()).toBe(200);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  40 |     }
  41 | 
  42 | });
  43 | 
```