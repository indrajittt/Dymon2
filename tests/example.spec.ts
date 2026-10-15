import { testFixture as test, expect } from '../fixtures/myFixture';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { user1 } from '../testData/users.json';

test('Create a new user', async ({ page, practiceFormPage }) => {
  await page.goto('https://demoqa.com/');
  await expect(page).toHaveTitle('demosite');
  await page.getByText('Forms').click();
  await page.getByRole('link', { name: 'Practice Form' }).click();

  await practiceFormPage.enterFirstName(user1.firstName)
  await practiceFormPage.enterLastName(user1.lastName)
  await practiceFormPage.enterEmail(user1.email)
  await practiceFormPage.selectGender(user1.gender)
  await practiceFormPage.enterMobileNumber(user1.mobileNumber)
  await practiceFormPage.enterDateOfBirth(user1.dateOfBirth)
  await practiceFormPage.enterSubjects(user1.subjects)
  await practiceFormPage.selectHobbies(user1.hobbies)
  // await practiceFormPage.choosePicture(user1.picture)
  await practiceFormPage.enterCurrentAddress(user1.currentAddress)
  await practiceFormPage.selectState(user1.state)
  await practiceFormPage.selectCity(user1.city)
  await practiceFormPage.clickOnSubmit()
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