# Bug Reports Submission

This repository contains bug reports found during testing. 

It includes:

- **API-bugs.md** – all API-related issues with steps to reproduce.
- **UI-bugs.md** – all User Interface issues with steps to reproduce.

Each bug includes:
- Steps to reproduce
- Expected result
- Actual result

---

## Test Structure

Tests are divided into:

- **API tests** → /tests/api
- **UI tests** → /tests/ui

---

## Setup

1. Install dependencies:
npm install

2. Create .env
BASE_URL=https://your-url
API_USER=your-username
API_PASSWORD=your-password
UI_USER=your-username
UI_PASSWORD=your-password

3. Run all tests
npx playwright test

4. The following test is intentionally failing as it reveals a real defect in the application:
Test:
Scenario 1: Verify correct row by unique values

Issue:
First Name and Last Name values are swapped in the UI.

5. Run only API tests
npx playwright test tests/api

6. Run only UI tests
npx playwright test tests/ui

7. Run tests in headed mode (browser visible)
npx playwright test --headed

8. Technologies Used
Playwright
JavaScript / Node.js

9. Known Limitations
Tests are not fully isolated (shared user account)
Parallel execution may cause test failures
Sequential execution is recommended (workers: 1)


