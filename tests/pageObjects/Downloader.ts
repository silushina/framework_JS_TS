import { Page, Locator } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export class DownloadPage {
  page: Page;
  downloadLinks: Locator;
  downloadFolder: string;

  constructor(page: Page) {
    this.page = page;

    // Find all the links on the page that download files
    this.downloadLinks = page.locator('#content a');

    // Define where to save the downloaded files
    this.downloadFolder = path.resolve(__dirname, '../downloads');
  }

  // Go to the file download page
  async goToPage() {
    console.log('Navigating to the file download page...');
    await this.page.goto('https://the-internet.herokuapp.com/download');
  }

  // Click a download link by its index in the list
  async downloadFileAt(index: number): Promise<string> {
    console.log('Preparing to download file at index:', index);

    const [download] = await Promise.all([
      this.page.waitForEvent('download'), // wait for download event
      this.downloadLinks.nth(index).click(), // click the file link
    ]);

    const fileName = download.suggestedFilename();
    const fullPath = path.join(this.downloadFolder, fileName);

    // Make sure download folder exists
    fs.mkdirSync(this.downloadFolder, { recursive: true });

    // Save the file
    await download.saveAs(fullPath);

    console.log('File downloaded to:', fullPath);
    return fullPath;
  }

  // Check if the file exists on the disk
  fileWasDownloaded(filePath: string): boolean {
    const exists = fs.existsSync(filePath);
    console.log('Checking if file exists:', exists);
    return exists;
  }
}
