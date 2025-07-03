import { Page, Locator, expect } from '@playwright/test';

export class SecureAreaPage {
   page: Page;
   logoutButton: Locator;
   flashMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('a.button'); // "Logout" button
    this.flashMessage = page.locator('#flash');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async assertLogoutSuccess() {
    await expect(this.flashMessage).toContainText('You logged out of the secure area!');
    await expect(this.page).toHaveURL(/.*login/); // Confirm redirect to /login
  }

  async assertLogoutFailure() {
    await expect(this.page).toHaveURL(/.*secure/); // Confirm no redirect to /login
  }
}
