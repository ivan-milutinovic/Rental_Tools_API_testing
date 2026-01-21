import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* max time for one test */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* tests in parrallel */
  fullyParallel: false,
  /* fail-safe for CI */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  /* base UTL */
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    trace: 'on-first-retry',
  },
});