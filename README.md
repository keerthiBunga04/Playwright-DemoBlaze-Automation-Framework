# Playwright DemoBlaze Automation Framework

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

DemoBlaze  
https://www.demoblaze.com

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

---

## Project Structure

```text
Playwright-DemoBlaze-Automation-Framework/
│
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