import { expect } from '@playwright/test';

export class PerformanceHelper {

    static validateApiResponseTime(
        responseTime: number,
        maxResponseTimeMs = 2000
    ) {
        expect(responseTime).toBeLessThanOrEqual(maxResponseTimeMs);
    }

    static validateTotalThroughputTime(
        totalTime: number,
        totalRequests: number,
        maxTotalTimeMs = 10000
    ) {
        expect(totalTime).toBeLessThanOrEqual(maxTotalTimeMs);
        expect(totalTime / totalRequests).toBeLessThanOrEqual(maxTotalTimeMs / totalRequests);
    }

}