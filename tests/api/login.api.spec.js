require('dotenv').config();
const { test, expect, request } = require('@playwright/test');
const { extractVerificationToken } = require('../../utils/api/auth.utils.js');

test('login via form POST and GET /api/Employees returns success', async () => {
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

  const employeesResponse = await apiContext.get('/Prod/api/Employees', {
    headers: {
      Accept: 'application/json',
    },
  });

  expect(employeesResponse.ok()).toBeTruthy();

  const contentType = employeesResponse.headers()['content-type'] || '';
  expect(contentType).toContain('application/json');

  const body = await employeesResponse.json();
  expect(body).toBeDefined();

  console.log('Employees response:', body);

  await apiContext.dispose();
});