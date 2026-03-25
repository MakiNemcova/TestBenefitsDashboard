function extractVerificationToken(html) {
  const match = html.match(
    /name="__RequestVerificationToken".*?value="([^"]+)"/i
  );

  if (!match) {
    throw new Error('Failed to find __RequestVerificationToken in the login page.');
  }

  return match[1];
}

module.exports = {
  extractVerificationToken,
};


export async function login(request, credentials = {}) {
  const defaultCredentials = {
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD,
  };

  if (!defaultCredentials.username || !defaultCredentials.password) {
    throw new Error('Missing APP_USERNAME or APP_PASSWORD in .env');
  }

  const payload = {
    ...defaultCredentials,
    ...credentials,
  };

  const response = await request.post('/Prod/Account/Login', {
    data: payload,
  });

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  const body = await response.json();

  return {
    response,
    body,
    token: body?.token,
  };
}