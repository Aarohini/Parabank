import { BaseAPI } from './BaseAPI';

export class AccountsAPI extends BaseAPI {

    async getAccount(accountId: number) {

        return await this.apiContext.get(
            `accounts/${accountId}`
        );

    }

    async createAccount(
        customerId: number,
        newAccountType: number,
        fromAccountId: number
    ) {

        return await this.apiContext.post(

            'createAccount',

            {

                params: {
                    customerId,
                    newAccountType,
                    fromAccountId
                }

            }

        );

    }

}