import { test } from './fixtures/Fixtures';

test('verify that file can be uploaded successfully', async ({ uploader }) => {
  await uploader.goToPage();

  await uploader.uploadFileChooseButton('notes.txt');

  await uploader.verifyUpload('notes.txt');
});
