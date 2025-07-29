import { test } from './fixtures/Fixtures';

test.describe('Login and Logout', () => {
  test.beforeEach(async({ loginPage }) => {
    await loginPage.goto();
  });


  test('verify successful login', async ({ loginPage }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.assertSuccess();
  });

  test('verify failed login with empty credentials', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.assertFailure();
  });
  
  
  test('verify failed login with invalid password', async ({ loginPage }) => {
    await loginPage.login('tomsmith', 'invalidPass');
    await loginPage.assertPasswordFailure();
  });
 
 
  test('verify failed login with invalid username', async ({ loginPage }) => {
    await loginPage.login('invalidUser', 'SuperSecretPassword!');
    await loginPage.assertFailure();
  });


  test('verify logout after login', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.assertSuccess();

    await secureAreaPage.logout();
    await secureAreaPage.assertLogoutSuccess();
  });
});

