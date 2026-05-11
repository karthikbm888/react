const { request } = require('@playwright/test');

async function login(username, password) {
  const api = await request.newContext();

  const res = await api.post('http://localhost:3000/auth/login', {
    data: { username, password }
  });

  const body = await res.json();
  return body.token;
}

async function register(username, password) {
  const api = await request.newContext();

  const res = await api.post('http://localhost:3000/auth/register', {
    data: { username, password }
  });

  const body = await res.json();
  return body.token; // your API already returns token here
}

module.exports = { login, register };