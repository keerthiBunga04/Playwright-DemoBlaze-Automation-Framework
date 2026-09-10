// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * Project: DemoBlaze Automation Framework
 */

export default defineConfig({

  // Test directory
  testDir: './tests',

  // Run tests sequentially for stable execution against DemoBlaze
  fullyParallel: false,

  // Fail the build on CI if test.only is accidentally left in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker to avoid concurrent access to the shared DemoBlaze application
  workers: 1,

  // HTML test report
  reporter: 'html',

  // Shared settings for all browser projects
  use: {

    // Collect trace when retrying a failed test
    trace: 'on-first-retry',
  },

  // Browser projects
  projects: [

    // Chromium
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Firefox
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    // WebKit
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    /*
    // Mobile Chrome
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },

    // Mobile Safari
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },

    // Microsoft Edge
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },

    // Google Chrome
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    */
  ],
});