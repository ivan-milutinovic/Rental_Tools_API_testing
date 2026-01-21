# Rental Tools API Automation (MVC/Controller Pattern)

[![Playwright Logo](https://img.shields.io/badge/Playwright-v1.57-brightgreen?logo=playwright&style=for-the-badge)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.93-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v24.11-green?logo=node.js&style=for-the-badge)](https://nodejs.org/)

## 📝 Project Overview

This project is a high-level API automation framework designed for the **Rental Tools API**. It implements an **MVC-inspired Controller architecture** to ensure a clean separation between API interaction logic, data models, and actual test scenarios.

### Key Highlights:

* **Controller Pattern:** Every API resource (Orders, Tools, Auth, Status) has its own dedicated Controller class to manage HTTP requests.
* **Advanced Fixtures:** Custom Playwright fixtures are used to automatically handle dependency injection of controllers and seamless authentication token management.
* **Type Safety:** Full TypeScript integration with interfaces for all request payloads and API responses.
* **Serial Execution:** Critical lifecycle tests (like Order management) are executed in serial mode to maintain data integrity.

---

## 🛠 Technology Stack

* **Playwright Test** - Core test runner and request engine.
* **TypeScript** - Language for static typing and robust development.
* **Dotenv** - Environment variable management (Base URL, credentials).
* **Path Aliases:** Simplified imports using `@controllers`, `@models`, and `@fixtures`.

---

## 📂 Project Structure

```
.
├── api/
[cite_start]│   ├── constants/      # ENDPOINTS definitions [cite: 1]
│   ├── controllers/    # API Resource Controllers (Logic layer)
│   ├── fixtures/       # Custom Playwright fixtures
│   └── models/         # TypeScript Interfaces for API objects
├── tests/              # Test suites (Spec files)
├── playwright.config.ts # Global configuration
└── tsconfig.json       # Path alias and compiler settings

```

---

## ⚙️ Configuration & Setup

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install

```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://api.example.com

```

### 3. Execution

Run all tests:

```bash
npm test

```

Run a specific suite (e.g., Health Check):

```bash
npm run test:status

```

---

## 🧪 Implementation Details

### Automated Authentication

The framework uses a `registeredToken` fixture. It automatically checks if a token exists; if not, it registers a new client and shares the token across the test suite to minimize redundant API calls.

### Order Lifecycle Management

The `order.spec.ts` demonstrates a full CRUD lifecycle:

1. **Setup:** Fetch available tools.
2. **Create:** POST a new order and store the ID.
3. **Verify:** GET order details and validate data integrity.
4. **Cleanup:** DELETE the order to maintain a clean environment.
