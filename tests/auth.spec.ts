import { test } from '@playwright/test';
import { LoginPage } from './pageObjects/AuthenticationForm';
import { SecureAreaPage } from './pageObjects/Logout';

test.describe('Login and Logout', () => {
  test('verify successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.assertSuccess();
  });

  test('verify failed login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.assertFailure();
  });
  
  
  test('verify failed login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith', 'invalidPass');
    await loginPage.assertPasswordFailure();
  });
 
 
  test('verify failed login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalidUser', 'SuperSecretPassword!');
    await loginPage.assertFailure();
  });


  test('verify logout after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const securePage = new SecureAreaPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.assertSuccess();

    await securePage.logout();
    await securePage.assertLogoutSuccess();
  });
});

