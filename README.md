# Playwright DemoBlaze Automation Framework

[![Playwright Tests](https://github.com/keerthiBunga04/Playwright-DemoBlaze-Automation-Framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/keerthiBunga04/Playwright-DemoBlaze-Automation-Framework/actions/workflows/playwright.yml)

A scalable end-to-end test automation framework built using Playwright, JavaScript, and the Page Object Model design pattern.

The framework automates UI workflows and API validations for the DemoBlaze application across Chromium, Firefox, and WebKit browsers.

---

## Tech Stack

- JavaScript
- Playwright
- Node.js
- Page Object Model (POM)
- Playwright Fixtures
- API Testing
- Git & GitHub
- GitHub Actions
- HTML Test Reports

---

## Application Under Test

[DemoBlaze](https://www.demoblaze.com)

---

## Framework Features

- Cross-browser testing
- Page Object Model architecture
- Custom Playwright fixtures
- Reusable utility functions
- Centralized test data management
- Positive and negative test scenarios
- End-to-end purchase flow validation
- UI and API automation
- Screenshot, video, and trace capture on failure
- HTML test reporting
- GitHub Actions CI integration
- Environment configuration using `.env`
- Test tagging for smoke, regression, negative, and E2E tests

---

## Project Structure

```text
Playwright-DemoBlaze-Automation-Framework/

├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── api/
│   └── clients/
│       └── ProductApiClient.js
│
├── fixtures/
│   ├── checkout.json
│   ├── messages.json
│   ├── products.json
│   ├── users.json
│   └── test-fixtures.js
│
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── ProductPage.js
│   └── SignupPage.js
│
├── tests/
│   ├── api/
│   │   └── products-api.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── e2e-purchase.spec.js
│   ├── login.spec.js
│   ├── product.spec.js
│   └── signup.spec.js
│
├── utils/
│   ├── ApiAssertions.js
│   ├── Constants.js
│   ├── Helper.js
│   └── RandomData.js
│
├── .env
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

---

## Prerequisites

Make sure the following are installed:

- Node.js 18 or higher
- npm
- Git

Verify the installations:

```bash
node -v
npm -v
git --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/keerthiBunga04/Playwright-DemoBlaze-Automation-Framework.git
```

Navigate into the project directory:

```bash
cd Playwright-DemoBlaze-Automation-Framework
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Environment Configuration

Create a `.env` file in the project root:

```env
BASE_URL=https://www.demoblaze.com
API_BASE_URL=https://api.demoblaze.com
```

The `.env` file is excluded from Git using `.gitignore`.

---

## How to Run Tests

### Run all tests

```bash
npm test
```

or:

```bash
npx playwright test
```

### Run tests in Chromium

```bash
npm run test:chromium
```

### Run tests in Firefox

```bash
npm run test:firefox
```

### Run tests in WebKit

```bash
npm run test:webkit
```

---

## Running Tests by Tag

### Smoke tests

```bash
npm run test:smoke
```

### Regression tests

```bash
npm run test:regression
```

### Negative tests

```bash
npm run test:negative
```

### End-to-end tests

```bash
npm run test:e2e
```

---

## API Testing

API tests are implemented using Playwright's API request fixture.

Current API coverage includes:

- Validate successful product collection response
- Validate product response structure
- Validate product data types
- Retrieve a product by valid product ID
- Validate behavior for an invalid product ID
- Validate product categories
- Reusable API assertion utilities
- Centralized API test data

---

## UI Test Coverage

Current UI automation covers:

- User login with valid credentials
- Login with invalid credentials
- Login with empty credentials
- Successful user signup
- Duplicate username validation
- Empty signup validation
- Product selection
- Product details validation
- Add product to cart
- Cart product validation
- Cart total validation
- Checkout modal validation
- Customer details submission
- Successful purchase confirmation

---

## End-to-End Test Coverage

The complete purchase workflow validates:

1. Open the DemoBlaze application
2. Select a product
3. Validate product title and price
4. Add the product to the cart
5. Handle the confirmation dialog
6. Navigate to the cart
7. Verify the selected product is present
8. Validate the cart total
9. Open the checkout modal
10. Enter customer details
11. Complete the purchase
12. Verify the purchase confirmation message

---

## Browser Coverage

Tests are executed against:

- Chromium
- Firefox
- WebKit

---

## Test Reporting

The framework generates an HTML report after test execution.

To open the report:

```bash
npm run report
```

The framework also captures the following failure artifacts:

- Screenshots on failure
- Videos on failure
- Traces on failure

---

## CI/CD Integration

GitHub Actions is configured to automatically execute the Playwright test suite on:

- Push to the `main` branch
- Pull requests targeting the `main` branch

The CI pipeline performs the following steps:

1. Checks out the repository
2. Sets up Node.js
3. Installs project dependencies
4. Installs Playwright browsers
5. Executes the complete test suite
6. Uploads the Playwright HTML report as an artifact

---

## Test Execution Result

The complete test suite has been successfully executed locally and through GitHub Actions.

The framework includes:

- UI automation tests
- API automation tests
- Cross-browser execution
- Smoke test coverage
- Regression test coverage
- Negative test scenarios
- End-to-end test coverage
- Continuous Integration validation

---

## Test Execution Summary

| Category | Status |
|---|---|
| UI Automation | Passed |
| API Automation | Passed |
| Chromium | Passed |
| Firefox | Passed |
| WebKit | Passed |
| Smoke Tests | Passed |
| Regression Tests | Passed |
| Negative Tests | Passed |
| End-to-End Tests | Passed |
| GitHub Actions CI | Passed |

---

## Design Principles

This framework follows:

- Page Object Model for maintainability
- Reusable fixtures for dependency management
- Centralized test data for easy updates
- Reusable assertion utilities
- Environment-based configuration
- Clear separation of tests, pages, API clients, fixtures, and utilities
- Reliable locator strategies
- Cross-browser compatibility
- Maintainable and scalable test architecture

---

## Project Highlights

- Designed a maintainable automation framework using the Page Object Model.
- Implemented reusable custom Playwright fixtures.
- Separated test logic, page actions, test data, API clients, and assertions.
- Automated both positive and negative test scenarios.
- Implemented UI and API testing within the same framework.
- Added cross-browser execution using Chromium, Firefox, and WebKit.
- Configured environment variables using dotenv.
- Integrated automated execution with GitHub Actions.
- Added failure artifacts including screenshots, videos, and traces.
- Used test tags for smoke, regression, negative, and end-to-end execution.
- Maintained the project using Git and GitHub.

---

## Future Enhancements

Possible future improvements include:

- Allure reporting
- Parallel test execution optimization
- Test data factory improvements
- More API endpoint coverage
- Authentication state management
- Docker-based execution
- Slack or email notifications
- Advanced CI pipeline configuration

---

## Author

**Keerthi Bunga**

BCA Data Science Student  
Aspiring QA Automation Engineer / SDET

---

## Repository

[GitHub Repository](https://github.com/keerthiBunga04/Playwright-DemoBlaze-Automation-Framework)