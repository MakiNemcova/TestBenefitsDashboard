export class ApiClient {
  constructor(request) {
    this.request = request;

    const username = process.env.API_USER;
    const password = process.env.API_PASSWORD;

    if (!username || !password) {
      throw new Error('Missing API_USER or API_PASSWORD in .env');
    }

    const base64 = Buffer.from(`${username}:${password}`).toString('base64');

    this.authHeader = {
      Authorization: `Basic ${base64}`,
      Accept: 'application/json',
    };
  }

  get(url, options = {}) {
    return this.request.get(url, {
      ...options,
      headers: {
        ...this.authHeader,
        ...(options.headers || {}),
      },
    });
  }
}