import { test, expect } from './fixtures/FixturesAPI';

test.describe('GoRest API tests', () => {
  let userId: number;

  const testUser = {
    name: 'API User',
    email: `api.user.${Date.now()}@mail.com`,
    gender: 'female' as const,
    status: 'active' as const,
  };

  test.only('GET: Get list of all users', async ({ userApi }) => {
    const users = await userApi.getAllUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  test.only('POST: Create a new user', async ({ userApi }) => {
    const created = await userApi.createUser(testUser);
    expect(created.name).toBe(testUser.name);
    userId = created.id;
  });

  test('GET: Get newly created user', async ({ userApi }) => {
    const user = await userApi.getUser(userId);
    expect(user.email).toBe(testUser.email);
  });

  test('PUT: Update the user', async ({ userApi }) => {
    const updated = await userApi.updateUser(userId, {
      name: 'Updated User Name',
    });
    expect(updated.name).toBe('Updated User Name');
  });

  test('GET: Confirm updated user', async ({ userApi }) => {
    const user = await userApi.getUser(userId);
    expect(user.name).toBe('Updated User Name');
  });

  test('PATCH: Patch the user status', async ({ userApi }) => {
    const patched = await userApi.patchUser(userId, {
      status: 'inactive',
    });
    expect(patched.status).toBe('inactive');
  });

  test('GET: Confirm patched user', async ({ userApi }) => {
    const user = await userApi.getUser(userId);
    expect(user.status).toBe('inactive');
  });

  test('DELETE: Delete the user', async ({ userApi }) => {
    await userApi.deleteUser(userId);
  });
});
