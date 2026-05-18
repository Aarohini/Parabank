export const accountSchema = {

    type: 'object',

    properties: {

        account: {

            type: 'object',

            properties: {

                id: {
                    type: 'number'
                },

                customerId: {
                    type: 'number'
                },

                type: {
                    type: 'string'
                },

                balance: {
                    type: 'number'
                }
            },

            required: [
                'id',
                'customerId',
                'type',
                'balance'
            ]
        }
    },

    required: ['account']
};