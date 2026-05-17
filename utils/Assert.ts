import { expect, APIResponse } from '@playwright/test';

export class Assert {

    static verifyStatusCode(
        response: APIResponse,
        expectedStatus: number
    ) {

        expect(response.status()).toBe(expectedStatus);

    }

}