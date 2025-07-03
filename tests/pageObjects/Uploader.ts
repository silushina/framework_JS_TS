import { Page, expect } from '@playwright/test';
import path from 'path';

export class Uploader{
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToPage() {
    await this.page.goto('https://the-internet.herokuapp.com/upload');
  }

  async uploadFileChooseButton(fileName: string) {
    const filePath = path.join(__dirname, '..', 'test_data', fileName);
    const fileInput = await this.page.$('input[type="file"]');

    if (!fileInput) {
      throw new Error('File input not found');
    }

    await fileInput.setInputFiles(filePath);
    await this.page.click('#file-submit');
  }

  async verifyUpload(expectedFileName: string) {
    const header = await this.page.locator('h3');
    const uploadedFile = await this.page.locator('#uploaded-files');

    await expect(header).toHaveText(/uploaded/i);
    const fileText = await uploadedFile.textContent();

    if (!fileText || fileText.trim() !== expectedFileName) {
      throw new Error(`Expected file name '${expectedFileName}', got '${fileText}'`);
    }
  }
}
