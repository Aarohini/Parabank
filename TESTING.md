# Testing Guide

This project uses Playwright for UI, API, and end-to-end testing with comprehensive reporting via Allure and HTML reporters.

## Installation

```bash
npm install
```

## Running Tests

### All Tests
```bash
npm test
```

### UI Tests Only
```bash
npm run test:ui-tests
```

### API Tests Only
```bash
npm run test:api-tests
```

### E2E Tests Only
```bash
npm run test:e2e-tests
```

### Interactive Test UI
```bash
npm run test:ui
```

### Debug Mode
```bash
npm run test:debug
```

## Viewing Reports

### HTML Report
After running tests:
```bash
npm run report:html
```

The HTML report includes:
- Test results and execution timeline
- Screenshots (on failure)
- Video recordings (on failure)
- Trace files for debugging
- Detailed error messages

### Allure Report
To generate and open the Allure report:
```bash
npm run report:allure
```

The Allure report includes:
- Interactive test timeline
- Test history
- Categorized test results
- Attachments (screenshots, traces, etc.)
- Test statistics and trends

**Note:** Allure Command Line is required. Install globally with:
```bash
npm install -g allure-commandline
```

## Report Contents

Both reports include:

### Screenshots
- Captured on test failure
- Shows the exact page state when the failure occurred

### Videos
- Recorded on test failure
- Helps visualize the test flow and identify issues

### Traces
- Full browser traces retained on failure
- Can be opened with `playwright show-trace` for debugging
- Includes network requests, console logs, and interactions

## Test Configuration

The `playwright.config.ts` file configures:
- **Screenshot**: `only-on-failure` - captures screenshots only when tests fail
- **Video**: `retain-on-failure` - records video only when tests fail
- **Trace**: `retain-on-failure` - keeps full traces only when tests fail

This optimizes storage while providing maximum debugging information for failures.

## Test Files

- **`tests/ui.spec.ts`** - UI automation tests (registration, login, account operations)
- **`tests/api.spec.ts`** - API endpoint tests (GET/POST account operations)
- **`tests/e2e.spec.ts`** - End-to-end tests (complete workflows with both UI and API validation)

## Project Structure

```
├── tests/                 # Test files
├── pages/                 # Page Object Models
├── fixtures/              # Test fixtures (API context, etc.)
├── utils/                 # Utility functions
├── test-data/             # Test data files
├── html-report/           # HTML report output
├── allure-results/        # Allure report data
└── playwright.config.ts   # Playwright configuration
```

## CI/CD Integration

To integrate with CI/CD pipelines:

```bash
# Run tests and generate reports
npm test

# Archive reports for CI/CD
# HTML report: ./html-report/
# Allure report data: ./allure-results/
```

## Troubleshooting

### Report Not Generated
- Ensure tests ran: check that test-results directory has files
- For Allure: verify `allure-commandline` is installed globally

### Missing Attachments
- Verify tests are failing (screenshots/videos only on failure)
- Check that `screenshot`, `video`, and `trace` settings in `playwright.config.ts` are not set to `'off'`

### Browser Issues
- Ensure Chromium is installed: `npx playwright install chromium`
- Clear browser cache: `rm -rf ~/.cache/ms-playwright`
