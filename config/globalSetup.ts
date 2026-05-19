import { test as base, TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

//Attaching all test artifacts (screenshots, videos, traces) to the test report via thiss
 //This ensures they appear in both HTML and allure reports in jenkins
base.afterEach(async ({ page }, testInfo: TestInfo) => {
    const testResultsDir = testInfo.outputDir;
    
    //tolist all files in the test results directory
    if (fs.existsSync(testResultsDir)) {
        const files = fs.readdirSync(testResultsDir);
        
        for (const file of files) {
            const filePath = path.join(testResultsDir, file);
            const stat = fs.statSync(filePath);
            
            if (!stat.isDirectory()) {
                //to attach trace files
                if (file.endsWith('.zip') && file.includes('trace')) {
                    await testInfo.attach('trace', {
                        path: filePath,
                        contentType: 'application/zip',
                    });
                }
                
                //attach screenshot files
                if (file.endsWith('.png')) {
                    await testInfo.attach('screenshot', {
                        path: filePath,
                        contentType: 'image/png',
                    });
                }
                
                //attach video files
                if (file.endsWith('.webm')) {
                    await testInfo.attach('video', {
                        path: filePath,
                        contentType: 'video/webm',
                    });
                }
                
                //attach error context markdown
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

