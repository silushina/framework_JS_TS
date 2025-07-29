import { APIRequestContext, expect } from '@playwright/test';

export class UserApi {
  constructor(private request: APIRequestContext) {}

  async getAllUsers() {
    const res = await this.request.get('/users');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    for (const user of body) {
      expect(user).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        gender: expect.stringMatching(/male|female/),
        status: expect.stringMatching(/active|inactive/),
      });
    }
    return body;
  }

  async createUser(user: { name: string; email: string; gender: 'male' | 'female'; status: 'active' | 'inactive' }) {
    const res = await this.request.post('/users', { data: user });
    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body).toMatchObject(user);
    return body;
  }

  async getUser(id: number) {
    const res = await this.request.get(`/users/${id}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(id);
    return body;
  }

  async updateUser(id: number, data: Partial<{ name: string; email: string; gender: string; status: string }>) {
    const res = await this.request.put(`/users/${id}`, { data });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject(data);
    return body;
  }

  async patchUser(id: number, data: Partial<{ name: string; email: string; gender: string; status: string }>) {
    const res = await this.request.patch(`/users/${id}`, { data });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject(data);
    return body;
  }

  async deleteUser(id: number) {
    const res = await this.request.delete(`/users/${id}`);
    expect(res.status()).toBe(204);
  }
}

 