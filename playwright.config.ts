import { defineConfig } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    timeout: 60000,

    fullyParallel: false,

    workers: 1,

    use: {

        headless: false,

        browserName: 'chromium',

        screenshot: 'on',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'
    },

    reporter: [
        ['html', { 
            outputFolder: 'html-report', 
            open: 'never',
            attachmentsBaseURL: 'test-results/'
        }],
        ['allure-playwright', { 
            outputFolder: 'allure-results',
            attachmentsBaseURL: 'test-results/'
        }],
        ['list']
    ],

    webServer: undefined
});