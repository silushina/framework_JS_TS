import { test as base, request } from '@playwright/test';
import { UserApi } from '../pageObjects/UsersAPI';
import * as dotenv from 'dotenv';

dotenv.config();

type Fixtures = {
  userApi: UserApi;
};

export const test = base.extend<Fixtures>({
  userApi: async ({}, use) => {
    const context = await request.newContext({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    await use(new UserApi(context));
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
