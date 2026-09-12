# Playwright DemoBlaze Automation Framework

A JavaScript-based UI automation framework built using Playwright Test and the Page Object Model (POM) design pattern.

This project automates key user journeys on the DemoBlaze e-commerce application, including login, signup, product validation, cart operations, checkout, and complete end-to-end purchase flow.

---

## Tech Stack

- JavaScript
- Playwright
- Playwright Test
- Node.js
- Page Object Model (POM)
- Custom Playwright Fixtures
- JSON Test Data
- dotenv
- Git
- GitHub
- GitHub Actions

---

## Application Under Test

DemoBlaze E-commerce Application:

https://www.demoblaze.com

---

## Framework Features

- Page Object Model architecture
- Reusable page classes
- Custom Playwright fixtures
- Centralized test data management
- Reusable helper utilities
- Environment-based configuration
- Positive and negative test scenarios
- Smoke, regression, negative, and E2E test tagging
- Cross-browser execution
- GitHub Actions CI pipeline
- HTML test reporting
- Playwright report artifact upload

---

## Project Structure

```text
Playwright-DemoBlaze-Automation-Framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
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
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── e2e-purchase.spec.js
│   ├── login.spec.js
│   ├── product.spec.js
│   └── signup.spec.js
│
├── utils/
│   ├── Constants.js
│   ├── Helper.js
│   └── RandomData.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md