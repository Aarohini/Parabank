import { APIResponse } from '@playwright/test';

import { test, expect } from '../fixtures/apiFixture';

import { AccountsAPI } from '../pages/AccountsAPI';

import { Assert } from '../utils/Assert';

import apiGETData from '../test-data/getAPI.json';

import apiPOSTData from '../test-data/createAPI.json';

import { XMLParser } from 'fast-xml-parser';

import Ajv from 'ajv';

import { accountSchema } from '../utils/schema';

import { Logger } from '../utils/logger';

const ajv = new Ajv();

const parser = new XMLParser();

test.describe('Accounts API Tests', () => {

    let accountsAPI: AccountsAPI;

    let response: APIResponse;

    test.beforeEach(async ({ apiContext }) => {

        accountsAPI = new AccountsAPI(apiContext);

        Logger.info('Accounts API Test Execution Started');

    });

    for (const apiData of apiGETData) {

        test(apiData.testName, async () => {

            Logger.info(
                `Executing Testcase: ${apiData.testName}`
            );

            const accountId = apiData.accountId as number;

            Logger.info(
                `Sending GET Request for Account ID: ${accountId}`
            );

            response = await accountsAPI.getAccount(accountId);

            const responseText = await response.text();

            Logger.info(
                `Response Body: ${responseText}`
            );

            // Status Code Validation

            Assert.verifyStatusCode(
                response,
                apiData.expectedStatus
            );

            Logger.success(
                `Status Code Validated: ${apiData.expectedStatus}`
            );

            // Positive Validations

            if (apiData.expectedStatus === 200) {

                // Account ID Validation

                if (
                    apiData.accountId !== undefined &&
                    apiData.accountId !== ''
                ) {

                    expect(responseText).toContain(
                        `<id>${apiData.accountId}</id>`
                    );

                    Logger.success(
                        'Account ID Validation Passed'
                    );

                }

                // Account Type Validation

                if (apiData.expectedType) {

                    expect(responseText).toContain(
                        `<type>${apiData.expectedType}</type>`
                    );

                    Logger.success(
                        'Account Type Validation Passed'
                    );

                }

                // Schema Validation

                const jsonData = parser.parse(responseText);

                const validate = ajv.compile(accountSchema);

                const isValid = validate(jsonData);

                expect(isValid).toBeTruthy();

                Logger.success(
                    'Schema Validation Passed'
                );

                // TC-API-06:Balance Validation

                expect(
                    jsonData.account.balance
                ).not.toBeNull();

                expect(
                    Number(jsonData.account.balance)
                ).not.toBeNaN();

                Logger.success(
                    'Balance Validation Passed'
                );

            }

        });

    }

    for (const apiData of apiPOSTData) {

        test(apiData.testName, async () => {

            Logger.info(
                `Executing Testcase: ${apiData.testName}`
            );

            Logger.info(
                `Sending CREATE Account Request for Customer ID: ${apiData.customerId}`
            );

            response = await accountsAPI.createAccount(

                apiData.customerId,

                apiData.newAccountType,

                apiData.fromAccountId

            );

            const responseText = await response.text();

            Logger.info(
                `Response Body: ${responseText}`
            );

            // Status Code Validation

            Assert.verifyStatusCode(
                response,
                apiData.expectedStatus
            );

            Logger.success(
                `Status Code Validated: ${apiData.expectedStatus}`
            );

            // Positive Validations

            if (apiData.expectedStatus === 200) {

                expect(responseText).toContain(
                    '<account>'
                );

                Logger.success(
                    'Account Creation Validation Passed'
                );

                // Account Type Validation

                if (apiData.expectedType) {

                    expect(responseText).toContain(
                        `<type>${apiData.expectedType}</type>`
                    );

                    Logger.success(
                        'Account Type Validation Passed'
                    );

                }

                // Schema Validation

                const jsonData = parser.parse(responseText);

                const validate = ajv.compile(accountSchema);

                const isValid = validate(jsonData);

                expect(isValid).toBeTruthy();

                Logger.success(
                    'Schema Validation Passed'
                );

            }

        });

    }

});