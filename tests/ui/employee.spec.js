import { test, expect } from '@playwright/test';
import { login } from '../../utils/ui/auth';
import {
  addEmployee,
  getEmployeeRowData,
  deleteEmployee,
  getEmployeeRowLocator,
  waitForEmployeeRow,
  getEmployeeIdFromRow,
  getEmployeeRowById
} from '../../utils/ui/helpers'; import { createEmployeeData } from '../../utils/ui/testData';


test.describe("Paylocity Automation Test - Paylocity Benefits Dashboard'", () => {

  test.describe.configure({ mode: 'serial' });

  test('Scenario 2: Edit Employee - update only First Name', async ({ page }) => {

    // Login
    await page.goto('/Prod/Account/Login');
    await login(page);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    const employeeData = createEmployeeData({});

    await addEmployee(page, employeeData);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();


    const row = await waitForEmployeeRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    await expect(row).toBeVisible();

    const employeeId = await getEmployeeIdFromRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    const rowById = getEmployeeRowById(page, employeeId);

    await expect(rowById).toBeVisible();

    // Edit Employee
    await rowById.locator('.fas.fa-edit').click();

    await page.getByRole('textbox', { name: 'First Name:' }).fill(employeeData.firstName + '-New');
    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    // Get column indexes
    const headers = await page.locator('table thead th').allTextContents();
    const lastNameIndex = headers.findIndex(h => h.includes('Last Name'));

    // Find row by ID 
    const updatedRow = page.locator('table tbody tr')
      .filter({ has: page.getByRole('cell', { name: employeeId, exact: true }) });

    // Get correct cell
    const firstNameCell = updatedRow.locator('td').nth(lastNameIndex);

    // Verify update
    await expect(firstNameCell).toHaveText(`${employeeData.firstName}-New`);

    console.log('Employee First Name successfully updated!');

  });

  test('Scenario 2: Edit Employee - update only Last Name', async ({ page }) => {

    // Login
    await page.goto('/Prod/Account/Login');
    await login(page);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    const employeeData = createEmployeeData({});

    await addEmployee(page, employeeData);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();


    const row = await waitForEmployeeRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    await expect(row).toBeVisible();

    const employeeId = await getEmployeeIdFromRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    const rowById = getEmployeeRowById(page, employeeId);

    await expect(rowById).toBeVisible();

    // Edit Employee
    await rowById.locator('.fas.fa-edit').click();

    await page.getByRole('textbox', { name: 'Last Name:' }).fill(employeeData.lastName + '-New');
    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    // Get column indexes
    const headers = await page.locator('table thead th').allTextContents();
    const firstNameIndex = headers.findIndex(h => h.includes('First Name'));

    const updatedRow = page.locator('table tbody tr')
      .filter({ has: page.getByRole('cell', { name: employeeId, exact: true }) });

    // Get correct cell
    const lastNameCell = updatedRow.locator('td').nth(firstNameIndex);

    // Verify update
    await expect(lastNameCell).toHaveText(`${employeeData.lastName}-New`);

    console.log('Employee Last Name successfully updated!');
  });

  test('Scenario 2: Edit Employee - update only Dependents', async ({ page }) => {

    // Login
    await page.goto('/Prod/Account/Login');
    await login(page);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    const employeeData = createEmployeeData({});

    await addEmployee(page, employeeData);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();


    const row = await waitForEmployeeRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    await expect(row).toBeVisible();

    const employeeId = await getEmployeeIdFromRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    const rowById = getEmployeeRowById(page, employeeId);

    await expect(rowById).toBeVisible();

    // Edit Employee
    await rowById.locator('.fas.fa-edit').click();

    await page.getByRole('textbox', { name: 'Dependents' }).fill('2');

    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    // Get column indexes
    const headers = await page.locator('table thead th').allTextContents();
    const dependentsIndex = headers.findIndex(h => h.includes('Dependents'));

    const updatedRow = page.locator('table tbody tr')
      .filter({ has: page.getByRole('cell', { name: employeeId, exact: true }) });

    // Locate the dependents cell using the correct column index
    const dependentsCell = updatedRow.locator('td').nth(dependentsIndex);

    // Verify the update
    await expect(dependentsCell).toHaveText('2');

    // CLEANUP
    await deleteEmployee(page, employeeId);

    console.log('Employee Dependents successfully updated!');
  });

  test('Scenario 1: Adding an Employee and verifying in the table', async ({ page }) => {

    // Login
    await page.goto('/Prod/Account/Login');
    await login(page);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    const employeeData = createEmployeeData({
      firstName: 'Anezka',
      lastName: 'Koprivova',
    });

    // Add Employee
    await addEmployee(page, employeeData);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    const row = await waitForEmployeeRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    await expect(row).toBeVisible();

    // Get data from UI
    const employee = await getEmployeeRowData(page, employeeData.firstName, employeeData.lastName);

    console.log(employee);

    await expect(row).toBeVisible({ timeout: 10000 });

    // CLEANUP
    await deleteEmployee(page, employee.employeeId);

  });

  test('Scenario 1: Verify correct row by unique values', async ({ page }) => {

    // Login
    await page.goto('/Prod/Account/Login');
    await login(page);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    const employeeData = createEmployeeData({});

    // Add Employee
    await addEmployee(page, employeeData);

    await expect(page.getByRole('columnheader', { name: 'Id' })).toBeVisible();

    const row = await waitForEmployeeRow(
      page,
      employeeData.firstName,
      employeeData.lastName
    );

    await expect(row).toBeVisible();

    // Get data from UI
    const employee = await getEmployeeRowData(page, employeeData.firstName, employeeData.lastName);

    console.log(employee);

    // Detected swap bug
    if (
      employee.firstName === employeeData.lastName &&
      employee.lastName === employeeData.firstName
    ) {
      throw new Error('BUG DETECTED: First Name and Last Name are swapped!');
    }

    // Validation
    expect(employee.firstName).toBe(firstName);
    expect(employee.lastName).toBe(lastName);

    // CLEANUP
    await deleteEmployee(page, employee.employeeId);
  });


});