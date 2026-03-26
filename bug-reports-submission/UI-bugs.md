# UI Bug Reports

## Test Environment

**Environment:** https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod
**URL:** https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn
**Browser:** Google Chrome (Version: 146.0.7680.155)
**Operating System:** MacOS 
**Build/Version:** Not available
**Auth State:** Authenticated user (TestUser933)

## UI Bug: User can access dashboard via browser back button after logout

**Page/Component:** Authentication / Paylocity Benefits Dashboard
**Description:** After logging out, the user is redirected to the login page. However, using the browser back button allows access to the previously loaded dashboard page with employee data. Although actions like adding a new employee do not persist, the dashboard should not be accessible after logout.

**Steps to Reproduce:**
1. Log in to the application
2. Navigate to Paylocity Benefits Dashboard
3. Click Log Out
4. You are redirected to Login page
5. Click browser back button

**Expected Result:** 
User should not be able to access the dashboard after logout.
Application should:
redirect back to login page
or block access (e.g., show unauthorized / session expired message)

**Actual Result:** 
Dashboard page is displayed with employee data after logout.
User can interact with UI (e.g., open Add Employee form), although actions are not persisted.

**Severity:** High

**Screenshots:** 

---

## UI Bug: First Name and Last Name are swapped in employee table

**Page/Component:** Paylocity Benefits Dashboard
**Description:** First Name and Last Name are swapped in Paylocity Benefits Dashboard

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Check Steve Rogers

**Expected Result:** 
First Name = Steve
Last Name = Rogers

**Actual Result:** 
First Name = Rogers
Last Name = Steve

**Severity:** High

**Screenshots:** evidence/screenshots/UI/UIBug1.png

---

## UI Bug: Protected dashboard is accessible via direct URL after logout

**Page/Component:** Authentication / Paylocity Benefits Dashboard
**URL:** https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits
**Description:** 
After logging out, the Benefits dashboard route remains accessible when entered directly in the browser. Although no employee data is displayed, the user can still access the protected page layout without authentication. Access to this route should be restricted to authenticated users only.

**Steps to Reproduce:**
1. Log in to the application
2. Open the Benefits dashboard
3. Log out
4. Manually enter the direct dashboard URL in the browser:
https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits

**Expected Result:** 
User should not be able to access the dashboard route after logout.
Application should:
redirect to login page
or display an unauthorized / session expired message

**Actual Result:** 
Dashboard page layout is displayed without data, even though the user is not authenticated.

**Severity:** Medium

**Screenshots:** 

---

## UI Bug: Application allows interaction in another tab after logout (stale session state)

**Page/Component:** Authentication / Paylocity Benefits Dashboard
**Description:** 
When the application is opened in multiple browser tabs, logging out in one tab does not immediately update the session state in the other tab. The user can still interact with the UI (e.g., open the Add Employee form and fill in data), even though the session is no longer valid. Actions are not successfully completed, but the UI does not reflect the logged-out state.

**Steps to Reproduce:**
1. Open the application in two browser tabs
2. Log in
3. In Tab 1, click Log Out
4. Switch to Tab 2
5. Click “Add Employee”
6. Fill in the form and submit

**Expected Result:** 
After logout in any tab:
all open tabs should reflect logged-out state
user should be redirected to login page
or actions should be blocked with an authorization/session expired message

**Actual Result:** 
User can still interact with the UI in the second tab (open form, enter data), but actions are not completed and no feedback is provided.

**Severity:** Medium

**Screenshots:** 

---

## UI Bug: Unauthorized access to ‘Add Employee’ via Paylocity Benefits Dashboard title

**Page/Component:** Paylocity Benefits Dashboard
**Description:** 
Clicking on the “Paylocity Benefits Dashboard” title allows access to the “Add Employee” page without authentication. This may represent a security issue. Access to the dashboard and “Add Employee” functionality should require authentication.

**Steps to Reproduce:**
1. Navigate to the application without logging in
2. Click on the ‘Paylocity Benefits Dashboard’ title 
3. See ‘Paylocity Benefits Dashboard’ 
4. Click 'Add Employee'
5. See window 'Add Employee'
6. You can fill First, Last Name and Dependets
7. You can Click on Add button
8. The employee is not added, but this window should not be visible.

**Expected Result:** 
Access to the dashboard and “Add Employee” functionality should require authentication.

**Actual Result:** 
The user can access the “Add Employee” page and interact with the form without logging in.

**Severity:** High

**Screenshots:** evidence/screenshots/UI/UIBug4.png

---

## UI Bug: Session does not expire on UI after inactivity

**Page/Component:**  Authentication / Paylocity Benefits Dashboard

**Description:** 
The UI session does not expire after a period of inactivity. Even after extended idle time (tested up to 60 minutes), the application remains accessible without requiring re-authentication.

The user can still interact with the UI (e.g., open “Add Employee” form and submit data), but backend actions are not completed. The UI does not reflect that the session is no longer valid, which creates confusion and potential security concerns.

**Steps to Reproduce:**
!. Log in to the application
2. Open Paylocity Benefits Dashboard
Leave the application idle (no interaction) for:
15 minutes
30 minutes
45 minutes
60 minutes
3. After idle time, try:
Clicking “Add Employee”
Filling out the form
Submitting the form

**Expected Result:** 
Session should expire after a defined inactivity timeout.
User should be:
redirected to Login page OR
shown a “Session expired” / “Unauthorized” message
Any action after session expiration should be blocked
UI should clearly reflect logged-out state

**Actual Result:** 
UI session does not expire even after 60 minutes of inactivity.
User can still navigate and interact with the application.
Forms (e.g., Add Employee) can be opened and submitted.
No feedback is shown to indicate expired session.
Backend actions are not completed, but UI does not communicate failure.

**Severity:** Medium

---

## UI Bug: Long Ids are wrapped across multiple lines, reducing readability

**Page/Component:** Paylocity Benefits Dashboard
**Description:** 
The Id column displays long identifiers that are automatically wrapped onto multiple lines. This makes the values difficult to read and scan. Ids should ideally remain on a single line or be truncated with a tooltip/full view option.

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Check column Id

**Expected Result:** 
Ids are displayed on a single line

**Actual Result:** 
Ids are wrapped onto multiple lines

**Severity:** Medium

**Screenshots:** vidence/screenshots/UI/UIBug7.png

---



## UI Bug: Missing user feedback and validation messages across Employee actions

**Page/Component:** Paylocity Benefits Dashboard / Add Employee / Update Employee / Delete Employee

**Description:** 
The UI does not display validation, error, or success messages for employee actions. This affects multiple scenarios, including invalid form input, update actions, and delete actions. As a result, users do not receive clear feedback about whether an action succeeded, failed, or why it was rejected.

This issue is not limited to the Dependents field. It appears to be a broader UX/UI problem affecting several workflows:

Form validation errors are not shown:
API/business rule errors are not surfaced to the user
Successful actions do not display confirmation messages
Failed actions do not display error messages

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Try one of the following scenarios:
Add a new employee with invalid data (e.g. Dependents = 33, invalid First Name / Last Name) Add lower limit for Dependents. Suggestion: consider a lower limit than 32, if it makes business sense.
Update an employee with invalid or unsupported values.
Delete an employee.

**Expected Result:** 
The application should display clear and contextual feedback messages, for example:

Validation errors near the affected fields:
API/business rule error messages after failed submission
Success confirmation after completed actions
Delete confirmation message after successful deletion
Update confirmation message after successful update

Examples:

“The field Dependents must be between 0 and 32.”
“First Name contains invalid characters.”
“Employee was successfully updated.”
“Employee was successfully deleted.”
“Your session has expired.” / “You are not authorized to perform this action.” where relevant

**Severity:** Medium

---

## UI Bug: Delete action uses only an "x" icon

**Page/Component:** Paylocity Benefits Dashboard / Action Delete
**Description:** The delete action uses only an “x” button. The row being deleted is not highlighted, is not user friendly behavior.

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Click on Actions "x" for some employee

**Expected Result:** 
Highlighting of the row with the user being deleted.

**Actual Result:** 
The row being deleted is not highlighted.

**Severity:** Medium

**Screenshots:** vidence/screenshots/UI/UIBug8.png

---

## UI Bug: The ‘Paylocity Benefits Dashboard’ page briefly flashes even after a successful login

**Page/Component:** Paylocity Benefits Dashboard
**Description:** After login the ‘Paylocity Benefits Dashboard’ page briefly flashes even after a successful login

**Steps to Reproduce:**
1. Log to application
2. See the ‘Paylocity Benefits Dashboard’ page briefly flashes

**Expected Result:** 
No flashes

**Actual Result:** 
Briefly flashes

**Severity:** Low

**Screenshots:** 

---

## UI Bug: Invalid characters First Name and Last Name

**Page/Component:** Paylocity Benefits Dashboard
**Description:** Invalid characters can be entered into the First Name and Last Name fields

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Click Add Employee
3. Add First Name: #$####
4. Add Last Name: 3333
5. Add Dependets: 1
6. Add

**Expected Result:** 
First Name = string
Last Name = string

**Actual Result:** 
First Name = #$####
Last Name = 3333

**Severity:** Low

**Screenshots:** evidence/screenshots/UI/UIBug2.png

---

## UI Bug/Improvement: Missing currency and per year specification

**Page/Component:** Paylocity Benefits Dashboard
**Description:** 
For clarification, I would expect a currency and per year specification for the Salary and other fields

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Check column Salary
3. Check column Gross Pay
4. Check column Benefits Cost
5. Check column Next Pay       

**Expected Result:** 
Salary = 52 000 $ or USD / year
Gross Pay = 2 000 $ or USD / paycheck
Benefits Cost = 57.69 $ or USD / paycheck
Next Pay = 1942.31 $ or USD / paycheck

**Actual Result:** 
Salary = 52 000
Gross Pay = 2 000
Benefits Cost = 57.69
Next Pay = 1942.31

**Severity:** Medium

**Screenshots:** evidence/screenshots/UI/UIBug3.png

---

## UI Bug/Improvement: Employees are not sorted alphabetically in the table

**Page/Component:** Paylocity Benefits Dashboard
**Description:** For clarification, First names and Last names are added to the Paylocity Benefits Dashboard table in a random order. I would expect them to be sorted alphabetically and to have filtering options available for both fields.

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Add new Employee 

**Expected Result:** 
First and last names should be sorted alphabetically.
First and last names should have filtering options.

**Actual Result:** 
First and last names are saved in a random order.
First and last names have no filtering options.

**Severity:** Low

**Screenshots:** vidence/screenshots/UI/UIBug6.png

---

## UI Bug/Improvement: Delete confirmation dialog does not uniquely identify the employee

**Page/Component:** Paylocity Benefits Dashboard
**Description:** For clarification, The delete confirmation dialog only displays the employee's name (e.g., "Adam Novak") without any unique identifier such as ID. Since names are not guaranteed to be unique, this may lead to accidental deletion of the wrong record.

**Steps to Reproduce:**
1. Open Paylocity Benefits Dashboard
2. Click on Actions "x" for some employee

**Expected Result:** 
The confirmation dialog should include a unique identifier (e.g., employee ID)

**Actual Result:** 
Only the employee's name is displayed

**Severity:** Low

**Screenshots:** vidence/screenshots/UI/UIBug11.png

---

## UI Improvement: Missing application version/build information

**Page/Component:** Paylocity Benefits Dashboard / Log In page
**Description:**
The application does not display any build or version information. This makes it difficult to identify the exact version under test, which can complicate debugging, issue tracking, and communication between QA and development teams.

**Expected Result:** 
Application version or build number should be visible (e.g., in footer, header, or About section).

**Actual Result:** 
No version or build information is displayed.

**Severity:** Low
