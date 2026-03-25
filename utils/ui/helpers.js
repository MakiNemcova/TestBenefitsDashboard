import { expect } from '@playwright/test';

export async function addEmployee(page, employeeData) {
    await expect(page.locator('table tbody tr').first()).toBeVisible();
    await page.getByRole('button', { name: 'Add Employee' }).click();

    await page.getByRole('textbox', { name: 'First Name:' })
        .fill(employeeData.firstName);

    await page.getByRole('textbox', { name: 'Last Name:' })
        .fill(employeeData.lastName);

    await page.getByRole('textbox', { name: 'Dependents:' })
        .fill(employeeData.dependents);

    await page.getByRole('button', { name: 'Add', exact: true }).click();
}

export async function getEmployeeRowData(page, firstName, lastName) {
    // Sort by ID
    await page.getByRole('columnheader', { name: 'Id' }).click();

    const newRow = page.locator('table tbody tr')
        .filter({ hasText: firstName })
        .filter({ hasText: lastName });

    await expect(newRow).toBeVisible({ timeout: 10000 });

    // Get column indexes
    const headers = await page.locator('table thead th').allTextContents();
    const idIndex = headers.findIndex(h => h.includes('Id'));
    const firstNameIndex = headers.findIndex(h => h.includes('First Name'));
    const lastNameIndex = headers.findIndex(h => h.includes('Last Name'));
    const dependentsIndex = headers.findIndex(h => h.includes('Dependents'));

    const cells = newRow.locator('td');

    const employeeId = await cells.nth(idIndex).innerText();
    const firstNameText = await cells.nth(firstNameIndex).innerText();
    const lastNameText = await cells.nth(lastNameIndex).innerText();
    const dependentsText = await cells.nth(dependentsIndex).innerText();

    return {
        employeeId,
        firstName: firstNameText,
        lastName: lastNameText,
        dependents: dependentsText,
    };
}

export async function deleteEmployee(page, employeeId) {
    const rowById = page.locator('table tbody tr')
        .filter({ has: page.getByRole('cell', { name: employeeId }) });

    await expect(rowById).toBeVisible();

    // Click delete icon (last column)
    await rowById.locator('td').last().locator('.fas.fa-times').click();

    // Confirm delete
    await page.getByRole('button', { name: 'Delete' }).click();

    await page.waitForLoadState('networkidle');

    // Verify deletion
    await expect(rowById).toHaveCount(0);
}

export function getEmployeeRowLocator(page, firstName, lastName) {
    return page.locator('table tbody tr')
        .filter({
            has: page.getByRole('cell', { name: firstName, exact: true }),
        })
        .filter({
            has: page.getByRole('cell', { name: lastName, exact: true }),
        });
}

export async function waitForEmployeeRow(page, firstName, lastName) {
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('table tbody tr').first()).toBeVisible();

    await expect
        .poll(
            async () => {
                const rows = await page.locator('table tbody tr').allTextContents();
                return rows.some(
                    (row) => row.includes(firstName) && row.includes(lastName)
                );
            },
            {
                timeout: 15000,
                message: `Employee row not found for ${firstName} ${lastName}`,
            }
        )
        .toBe(true);

    return getEmployeeRowLocator(page, firstName, lastName);
}

export async function getEmployeeIdFromRow(page, firstName, lastName) {
    const row = await waitForEmployeeRow(page, firstName, lastName);

    const headers = await page.locator('table thead th').allTextContents();
    const idIndex = headers.findIndex(h => h.includes('Id'));

    const employeeId = await row.locator('td').nth(idIndex).innerText();

    return employeeId.trim();
}

export function getEmployeeRowById(page, employeeId) {
    return page.locator('table tbody tr')
        .filter({
            has: page.getByRole('cell', { name: employeeId, exact: true }),
        });
}