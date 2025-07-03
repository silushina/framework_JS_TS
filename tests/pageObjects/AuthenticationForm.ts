import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {
   page: Page;
   usernameInput: Locator;
   passwordInput: Locator;
   loginButton: Locator;
   flashMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertSuccess() {
    const actualText = await this.flashMessage.textContent();
    console.log('FLASH MESSAGE:', actualText);
    await expect(this.flashMessage).toContainText('You logged into a secure area!');
  }

  async assertFailure() {
    const actualText = await this.flashMessage.textContent();
    console.log('FLASH MESSAGE:', actualText);
    await expect(this.flashMessage).toContainText('Your username is invalid!');
  }

  async assertPasswordFailure() {
    const actualText = await this.flashMessage.textContent();
    console.log('FLASH MESSAGE:', actualText);
    await expect(this.flashMessage).toContainText('Your password is invalid!');
  }

}