import { Page, Locator, expect } from '@playwright/test';

export class AlertsCheck {
  page: Page;
  alertButton: Locator;
  confirmButton: Locator;
  promptButton: Locator;
  result: Locator;

  constructor(page: Page) {
    this.page = page;

    this.alertButton = page.locator('button', { hasText: 'Click for JS Alert' });
    this.confirmButton = page.locator('button', { hasText: 'Click for JS Confirm' });
    this.promptButton = page.locator('button', { hasText: 'Click for JS Prompt' });

    // Where the message shows up after clicking
    this.result = page.locator('#result');
  }

   async goToPage() {
    console.log('Navigating to alert page...');
    await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  }

  // For alert popup
  async tryAlert() {
    this.page.once('dialog', async (dialog) => {
      console.log('Alert triggered:', dialog.message());
      await dialog.accept(); 
    });

    await this.alertButton.click();
  }

  // For confirm box (OK or Cancel)
  async tryConfirm(choice: boolean) {
    this.page.once('dialog', async (dialog) => {
      console.log('Confirm type:', dialog.type());
      console.log('Message:', dialog.message());

      if (choice) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });

    await this.confirmButton.click();
  }

  // For prompt box
  async tryPrompt(textInput: string | null) {
    this.page.once('dialog', async (dialog) => {
      console.log('Prompt message:', dialog.message());
      if (textInput !== null && textInput.length > 0) {
        await dialog.accept(textInput); 
      } else {
        await dialog.dismiss(); // click Cancel
      }
    });

    await this.promptButton.click();
  }

  async seeResult(expectedText: string) {
    console.log('Checking result...');
    await expect(this.result).toHaveText(expectedText);
  }
}
