const { test, expect, request } = require('@playwright/test');
const { login } = require('./auth.setup');

let apiA, apiB;
let taskId;

test.describe('Multi-user Security Tests', () => {

  test.beforeAll(async () => {

    const userA = await login('kone', '123456');
    const userB = await login('kone2', '123456');

    apiA = await request.newContext({
      baseURL: 'http://localhost:3000',
      extraHTTPHeaders: {
        Authorization: `Bearer ${userA}`
      }
    });

    apiB = await request.newContext({
      baseURL: 'http://localhost:3000',
      extraHTTPHeaders: {
        Authorization: `Bearer ${userB}`
      }
    });

  });

  test('User A creates task', async () => {

    const res = await apiA.post('/tasks', {
      data: { title: 'Private Task A' }
    });

    const body = await res.json();
    taskId = body._id;

    expect(res.ok()).toBeTruthy();
  });

  test('User B cannot access User A task', async () => {

    const res = await apiB.get(`/tasks/${taskId}`);

    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  test('User B cannot delete User A task', async () => {

    const res = await apiB.delete(`/tasks/${taskId}`);

    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

});