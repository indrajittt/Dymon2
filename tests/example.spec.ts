import { testFixture as test } from '../fixtures/myFixture';
import { user1 } from '../testData/users.json';

test('Create a new user', async ({ homePage, practiceFormPage }) => {
  await homePage.navigateToPracticeForm();
  await practiceFormPage.registerUser(user1);
  await practiceFormPage.verifyUser(user1)
});

test('Drag and drop', async ({ homePage, droppablePage }) => {
  await homePage.navigateToDroppable();
  await droppablePage.dragAndDrop();
  await droppablePage.verifyDrop();
});