import { BaseAPI } from './BaseAPI';
import { Logger } from '../utils/logger';
export class AccountsAPI extends BaseAPI {

    async getAccount(accountId: number) {
         Logger.api('GET',`/accounts/${accountId}`);

        return await this.apiContext.get(
            `accounts/${accountId}`
        );

    }

    async createAccount(
        customerId: number,
        newAccountType: number,
        fromAccountId: number
    ) {
        Logger.api('POST', `/createAccount`);

        Logger.info(`Customer ID: ${customerId}`);

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