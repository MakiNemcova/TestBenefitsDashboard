// Login 
async function login(page) {
  const username = process.env.UI_USER;
  const password = process.env.UI_PASSWORD;

  if (!username || !password) {
    throw new Error('Missing UI_USER or UI_PASSWORD in .env');
  }

  const usernameInput = page.getByLabel('Username');
  const passwordInput = page.getByLabel('Password');

  await page.context().clearCookies();

  await usernameInput.click();
  await usernameInput.clear();
  await usernameInput.fill(username);

  await passwordInput.click();
  await passwordInput.clear();
  await passwordInput.fill(password);

  await page.getByRole('button', { name: 'Log In' }).click();
}

module.exports = {
  login,
};