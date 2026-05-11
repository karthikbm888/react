const { test, expect, request } = require('@playwright/test');
const { getAuthToken } = require('./auth.setup');

let token;
let api;
let taskId;

test.describe('Task CRUD API Flow (QA Standard)', () => {

  // 🔐 AUTH SETUP
  test.beforeAll(async () => {

    token = await getAuthToken();

    api = await request.newContext({
      baseURL: 'http://localhost:3000',
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

  });

  // 🧪 1. CREATE TASK (REAL TEST)
  test('create task', async () => {

    const res = await api.post('/tasks', {
      data: {
        title: 'QA Task'
      }
    });

    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.title).toBe('QA Task');

    taskId = body._id;
  });

  // 📥 2. GET TASK
  test('get task by id', async () => {

    const res = await api.get(`/tasks/${taskId}`);

    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body._id).toBe(taskId);
  });

  // ✏️ 3. UPDATE TASK
  test('update task', async () => {

    const res = await api.put(`/tasks/${taskId}`, {
      data: {
        completed: true
      }
    });

    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.completed).toBe(true);
  });

  // ❌ 4. INVALID ID TEST
  test('invalid id should fail', async () => {

    const res = await api.get('/tasks/invalid-id');

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body.message).toBe('Invalid ID format');
  });

  // 🧹 5. DELETE TASK
  test('delete task', async () => {

    const res = await api.delete(`/tasks/${taskId}`);

    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.message).toBe('Task deleted');
  });

});