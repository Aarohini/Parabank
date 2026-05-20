# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance.spec.ts >> Validate API Response Time
- Location: tests\performance.spec.ts:6:5

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2000
Received:    2061
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | 
  3  | export class PerformanceHelper {
  4  | 
  5  |     static validateApiResponseTime(
  6  |         responseTime: number,
  7  |         maxResponseTimeMs = 2000
  8  |     ) {
> 9  |         expect(responseTime).toBeLessThanOrEqual(maxResponseTimeMs);
     |                              ^ Error: expect(received).toBeLessThanOrEqual(expected)
  10 |     }
  11 | 
  12 |     static validateTotalThroughputTime(
  13 |         totalTime: number,
  14 |         totalRequests: number,
  15 |         maxTotalTimeMs = 10000
  16 |     ) {
  17 |         expect(totalTime).toBeLessThanOrEqual(maxTotalTimeMs);
  18 |         expect(totalTime / totalRequests).toBeLessThanOrEqual(maxTotalTimeMs / totalRequests);
  19 |     }
  20 | 
  21 | }
```