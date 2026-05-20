import { test, expect } from '@playwright/test';
import { PerformanceHelper } from '../utils/performanceHelper';

const accountUrl = 'https://parabank.parasoft.com/parabank/services/bank/accounts/13566';

test('Validate API Response Time', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.get(accountUrl);

    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(`Total response Time: ${responseTime} ms`);
    
    
    PerformanceHelper.validateApiResponseTime(responseTime);
    expect(response.status()).toBe(200);

});

test('Repeated GET Accounts API Calls', async ({ request }) => {

    const totalRequests = 20;
    const promises = [];

    for (let i = 0; i < totalRequests; i++) {
        promises.push(request.get(accountUrl));
    }

    const startTime = Date.now();
    const responses = await Promise.all(promises);
    const endTime = Date.now();

    const totalTime = endTime - startTime;
    console.log(`Total Throughput Time: ${totalTime} ms`);

    PerformanceHelper.validateTotalThroughputTime(totalTime, totalRequests);

    for (const response of responses) {
        expect(response.status()).toBe(200);
    }

});
