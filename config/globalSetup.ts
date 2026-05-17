import { test as base, TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Attach all test artifacts (screenshots, videos, traces) to the test report
 * This ensures they appear in both HTML and Allure reports
 */
base.afterEach(async ({ page }, testInfo: TestInfo) => {
    const testResultsDir = testInfo.outputDir;
    
    // List all files in the test results directory
    if (fs.existsSync(testResultsDir)) {
        const files = fs.readdirSync(testResultsDir);
        
        for (const file of files) {
            const filePath = path.join(testResultsDir, file);
            const stat = fs.statSync(filePath);
            
            if (!stat.isDirectory()) {
                // Attach trace files
                if (file.endsWith('.zip') && file.includes('trace')) {
                    await testInfo.attach('trace', {
                        path: filePath,
                        contentType: 'application/zip',
                    });
                }
                
                // Attach screenshot files
                if (file.endsWith('.png')) {
                    await testInfo.attach('screenshot', {
                        path: filePath,
                        contentType: 'image/png',
                    });
                }
                
                // Attach video files
                if (file.endsWith('.webm')) {
                    await testInfo.attach('video', {
                        path: filePath,
                        contentType: 'video/webm',
                    });
                }
                
                // Attach error context markdown
                if (file === 'error-context.md') {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    await testInfo.attach('error-context', {
                        body: content,
                        contentType: 'text/markdown',
                    });
                }
            }
        }
    }
});

export {};

