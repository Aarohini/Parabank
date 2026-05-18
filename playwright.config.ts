import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    timeout: 60000,

    fullyParallel: true,

    workers: 1,

    use: {

        headless: false,

        screenshot: 'on',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'

    },

    projects: [

        {
            name: 'Chromium',

            use: {

                ...devices['Desktop Chrome'],

                browserName: 'chromium'

            }

        },

        {
            name: 'WebKit',

            use: {

                ...devices['Desktop Safari'],

                browserName: 'webkit'

            }

        }

    ],

    reporter: [

        [
            'html',
            {
                outputFolder: 'html-report',

                open: 'never',

                attachmentsBaseURL: 'test-results/'
            }
        ],

        [
            'allure-playwright',
            {
                outputFolder: 'allure-results',

                attachmentsBaseURL: 'test-results/'
            }
        ],

        ['list']

    ],

    webServer: undefined

});