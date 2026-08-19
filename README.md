# Playwright JS

This repository is a Proof-of-Concept demonstrating Playwright tests with JavaScript and Cucumber (Gherkin) glue. The README below describes the project structure and how to run tests.

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run Playwright test suite (uses TestEnv environment variable when applicable):

   ```bash
   npm run test:dev
   ```

3. Run the Playwright tests in debug mode:

   ```bash
   npm run debug:dev
   ```

4. Run the Cucumber suite (the `test` script runs cucumber-js and produces an HTML report):

   ```bash
   npm run test
   ```

You can also run a single spec file with Playwright, for example:

```bash
npm run test:dev -- src/e2e/specs/login.spec.js
```

(Or run Playwright directly with `npx playwright test <path>`.)

## Project structure

- src/e2e/
  - api/           # API helper modules or mocks used by tests
  - data/          # Test data and fixtures (JSON, test inputs)
  - enviroments/   # Environment-specific configuration files (note: directory name follows repository)
  - features/      # .feature files when using Cucumber/Gherkin
  - hooks/         # Cucumber hooks (before/after) and global setup/teardown
  - pages/         # Page objects and element locators
  - plan/          # Test plans or execution notes
  - specs/         # Playwright test specs (e2e test files)
  - steps/         # Step definitions for Cucumber

Other repo files
- playwright.config.js   # Playwright configuration
- cucumber.js            # Cucumber configuration
- global-setup.js        # Global test setup
- global-tearDown.js     # Global test teardown
- browserstack.config.js # BrowserStack configuration (if used)
- package.json           # NPM scripts and dependencies

## Reports

- The cucumber HTML report is generated at `./reports/cucumber_report.html` when you run `npm run test`.
- Playwright test results follow Playwright reporting configuration in `playwright.config.js`.

## NPM scripts

- `npm run test` — Runs cucumber-js with step definitions from `src/e2e/steps` and outputs an HTML report.
- `npm run test:dev` — Runs `npx playwright test` with TestEnv=dev.
- `npm run debug:dev` — Runs Playwright tests in debug mode.

## Notes

- This README reflects the repository layout on the `newwork` branch.
- If you want any additional details (example test, contributing guidelines, or CI steps), tell me what you'd like included and I will update the README.
