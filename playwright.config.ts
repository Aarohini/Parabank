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

        video: 'on',

        trace: 'on'
    }
});