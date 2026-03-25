require('dotenv').config();
const { test, expect, request } = require('@playwright/test');
const { extractVerificationToken } = require('../../utils/api/auth.utils.js');

test('create get delete employee', async () => {

    const baseURL = process.env.BASE_URL;
    const username = process.env.API_USER;
    const password = process.env.API_PASSWORD;

    if (!baseURL || !username || !password) {
        throw new Error('Missing BASE_URL, API_USER, or API_PASSWORD in .env');
    }

    const apiContext = await request.newContext({
        baseURL,
        ignoreHTTPSErrors: true,
    });

    const loginPageResponse = await apiContext.get('/Prod/Account/Login');
    expect(loginPageResponse.ok()).toBeTruthy();

    const loginPageHtml = await loginPageResponse.text();
    const verificationToken = extractVerificationToken(loginPageHtml);

    const loginResponse = await apiContext.post('/Prod/Account/Login', {
        form: {
            Username: username,
            Password: password,
            __RequestVerificationToken: verificationToken,
        },
    });

    expect(loginResponse.ok() || loginResponse.status() === 302).toBeTruthy();

    const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const newEmployee = {
        firstName: `Lenka_${uniqueSuffix}`,
        lastName: 'Havrankova',
        dependants: 2,
    };

    const createResponse = await apiContext.post('/Prod/api/Employees', {
        data: newEmployee,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const createStatus = createResponse.status();
    const createBodyText = await createResponse.text();

    console.log('CREATE status:', createStatus);
    console.log('CREATE body:', createBodyText);

    expect([200, 201]).toContain(createStatus);

    let createdEmployee;
    try {
        createdEmployee = JSON.parse(createBodyText);
    } catch (e) {
        throw new Error(`Create response is not valid JSON: ${createBodyText}`);
    }

    console.log('created employee parsed:', createdEmployee);

    const employeeId =
        createdEmployee.id ??
        createdEmployee.employeeId ??
        createdEmployee.data?.id;

    expect(employeeId, `Employee ID not found in response: ${createBodyText}`).toBeTruthy();

    const getBeforeDelete = await apiContext.get(`/Prod/api/Employees/${employeeId}`, {
        headers: {
            Accept: 'application/json',
        },
    });

    const getBeforeDeleteStatus = getBeforeDelete.status();
    const getBeforeDeleteBody = await getBeforeDelete.text();

    console.log('GET before delete status:', getBeforeDeleteStatus);
    console.log('GET before delete body:', getBeforeDeleteBody);

    expect(getBeforeDeleteStatus).toBe(200);

    const deleteResponse = await apiContext.delete(`/Prod/api/Employees/${employeeId}`, {
        headers: {
            Accept: 'application/json',
        },
    });

    const deleteStatus = deleteResponse.status();
    const deleteBody = await deleteResponse.text();

    console.log('DELETE status:', deleteStatus);
    console.log('DELETE body:', deleteBody);

    expect([200, 204]).toContain(deleteStatus);

    const getAfterDelete = await apiContext.get(`/Prod/api/Employees/${employeeId}`, {
        headers: {
            Accept: 'application/json',
        },
    });

    const getAfterDeleteStatus = getAfterDelete.status();
    const getAfterDeleteBody = await getAfterDelete.text();

    console.log('GET after delete status:', getAfterDeleteStatus);
    console.log('GET after delete body:', getAfterDeleteBody);

    expect(getAfterDeleteStatus).toBe(200);
    expect(getAfterDeleteBody.trim()).toBe('');

    await apiContext.dispose();
});