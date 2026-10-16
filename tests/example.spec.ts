import { testFixture as test, expect } from '../fixtures/myFixture';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { user1 } from '../testData/users.json';

test('Create a new user', async ({ page, practiceFormPage }) => {
  await page.goto('https://demoqa.com/');
  await expect(page).toHaveTitle('demosite');
  await page.getByText('Forms').click();
  await page.getByRole('link', { name: 'Practice Form' }).click();

  await practiceFormPage.registerUser(user1);
  await practiceFormPage.verifyUser(user1)
});

test('Drag and drop', async ({ page, droppablePage }) => {
  await page.goto('https://demoqa.com/');
  await expect(page).toHaveTitle('demosite');
  await page.getByText('Interactions').click();
  await page.getByRole('link', { name: 'Droppable' }).click();
  await droppablePage.dragAndDrop();
  await droppablePage.verifyDrop();
});