import { test } from './fixtures/Fixtures';

test.describe('Testing Alerts', () => {
 test.beforeEach(async({ alertsCheck }) => {
  await alertsCheck.goToPage(); 
 });

  test('verify that alert is shown and handled', async ({ alertsCheck }) => {
    await alertsCheck.tryAlert();
    await alertsCheck.seeResult('You successfully clicked an alert');
  });

  test('verify that confirm box is accepted', async ({ alertsCheck }) => {
    await alertsCheck.tryConfirm(true);
    await alertsCheck.seeResult('You clicked: Ok');
  });

  test('verify that confirm box is canceled', async ({ alertsCheck }) => {
    await alertsCheck.tryConfirm(false);
    await alertsCheck.seeResult('You clicked: Cancel');
  });

  test('verify that prompt is accepted with text', async ({ alertsCheck }) => {
    const inputMessage = 'Test run ' + Date.now(); // unique message for testing
    console.log('Typing into prompt:', inputMessage);

    await alertsCheck.tryPrompt(inputMessage);
    await alertsCheck.seeResult(`You entered: ${inputMessage}`);
  });

  test('verify that prompt is canceled', async ({ alertsCheck }) => {
    await alertsCheck.tryPrompt("");
    await alertsCheck.seeResult('You entered: null');
  });
});

