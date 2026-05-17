import { test as base, request, APIRequestContext } from '@playwright/test';

type APIFixture = {
    apiContext: APIRequestContext;
};


export const test = base.extend<APIFixture>({

    apiContext: async ({}, use) => {

        const apiContext = await request.newContext({

            baseURL:
                'https://parabank.parasoft.com/parabank/services/bank/',

            extraHTTPHeaders: {
                Accept: 'application/xml'
            }

        });

        await use(apiContext);

        await apiContext.dispose();

    }

});

export const expect = test.expect;