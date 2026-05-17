import { APIRequestContext } from '@playwright/test';

export class BaseAPI {

    protected apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {

        this.apiContext = apiContext;

    }

}