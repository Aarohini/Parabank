import { APIResponse } from '@playwright/test';
import { test, expect } from '../fixtures/apiFixture';
import { AccountsAPI } from '../pages/AccountsAPI';
import { Assert } from '../utils/Assert';
import apiGETData from '../test-data/getAPI.json';
import apiPOSTData from '../test-data/createAPI.json';

test.describe('Accounts API Tests', () => {

    let accountsAPI: AccountsAPI;

    let response: APIResponse;

    test.beforeEach(async ({ apiContext }) => {

        accountsAPI = new AccountsAPI(apiContext);

    });

    for (const apiData of apiGETData) {

        test(apiData.testName, async () => {

            const accountId = apiData.accountId as number;
            response = await accountsAPI.getAccount(accountId);

            const responseText = await response.text();

            console.log(responseText);

            Assert.verifyStatusCode(response, apiData.expectedStatus);

            if (apiData.expectedStatus === 200) {
                if (apiData.accountId !== undefined && apiData.accountId !== '') {
                    expect(responseText).toContain(
                        `<id>${apiData.accountId}</id>`
                    );
                }

                if (apiData.expectedType) {
                    expect(responseText).toContain(
                        `<type>${apiData.expectedType}</type>`
                    );
                }
            }

        });

    }

    for (const apiData of apiPOSTData) {

        test(`Validate CREATE Account API for ${apiData.testName}`, async () => {

            response = await accountsAPI.createAccount(

                apiData.customerId,

                apiData.newAccountType,

                apiData.fromAccountId

            );

            const responseText = await response.text();

            console.log(responseText);

            Assert.verifyStatusCode(
                response,
                apiData.expectedStatus
            );

            if (apiData.expectedStatus === 200) {
                expect(responseText).toContain('<account>');

                if (apiData.expectedType) {
                    expect(responseText).toContain(
                        `<type>${apiData.expectedType}</type>`
                    );
                }
            }

        });

    }

});