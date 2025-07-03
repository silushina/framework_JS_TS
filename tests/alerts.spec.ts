import { test } from '@playwright/test';
import { AlertsCheck } from './pageObjects/Alerts';

test.describe('Testing Alerts', () => {
  test('verify that alert is shown and handled', async ({ page }) => {
    const alertsPage = new AlertsCheck(page);
    await alertsPage.goToPage();

    console.log('Triggering JS Alert...');
    await alertsPage.tryAlert();
    await alertsPage.seeResult('You successfully clicked an alert');
  });

  test('verify that confirm box is accepted', async ({ page }) => {
    const alertsPage = new AlertsCheck(page);
    await alertsPage.goToPage();
    await alertsPage.tryConfirm(true);
    await alertsPage.seeResult('You clicked: Ok');
  });

  test('verify that confirm box is canceled', async ({ page }) => {
    const alertsPage = new AlertsCheck(page);
    await alertsPage.goToPage();
    await alertsPage.tryConfirm(false);
    await alertsPage.seeResult('You clicked: Cancel');
  });

  test('verify that prompt is accepted with text', async ({ page }) => {
    const alertsPage = new AlertsCheck(page);
    await alertsPage.goToPage();

    const inputMessage = 'Test run ' + Date.now(); // unique message for testing
    console.log('Typing into prompt:', inputMessage);

    await alertsPage.tryPrompt(inputMessage);
    await alertsPage.seeResult(`You entered: ${inputMessage}`);
  });

  test('verify that prompt is canceled', async ({ page }) => {
    const alertsPage = new AlertsCheck(page);
    await alertsPage.goToPage();
    await alertsPage.tryPrompt("");
    await alertsPage.seeResult('You entered: null');
  });
});

