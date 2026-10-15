import {expect, Locator, Page} from '@playwright/test'

export interface PracticeFormUser {
    firstName: string
    lastName: string
    email: string
    gender: string
    mobileNumber: string
    dateOfBirth: string
    subjects: string[]
    hobbies: string[]
    picture: string
    currentAddress: string
    state: string
    city: string
}

export class PracticeFormPage {
    readonly page: Page
    private readonly firstNameInput: Locator
    private readonly lastNameInput: Locator
    private readonly emailInput: Locator
    private readonly mobileNumberInput: Locator
    private readonly subjectsInput: Locator
    private readonly currentAddressInput: Locator
    private readonly dateOfBirthInput: Locator
    private readonly pictureInput: Locator
    private readonly cityInput: Locator
    private readonly stateInput: Locator
    private readonly submitButton: Locator
    private readonly confirmationTitle: Locator
    private readonly submissionRows: Locator

    private readonly monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    private readonly fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    constructor(page: Page) {
        this.page = page
        this.firstNameInput = page.locator('#firstName')
        this.lastNameInput = page.locator('#lastName')
        this.emailInput = page.locator('#userEmail')
        this.mobileNumberInput = page.locator('#userNumber')
        this.subjectsInput = page.locator('#subjectsInput')
        this.currentAddressInput = page.locator('#currentAddress')
        this.dateOfBirthInput = page.locator('#dateOfBirthInput')
        this.pictureInput = page.locator('#uploadPicture')
        this.cityInput = page.locator('#react-select-4-input')
        this.stateInput = page.locator('#react-select-3-input')
        this.submitButton = page.locator('#submit')
        this.confirmationTitle = page.locator('#example-modal-sizes-title-lg')
        this.submissionRows = page.locator('.table-responsive tbody tr')
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName)
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName)
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }

    async enterMobileNumber(mobileNumber: string): Promise<void> {
        await this.mobileNumberInput.fill(mobileNumber)
    }

    async enterSubjects(subjects: string[]): Promise<void> {
        for (const subject of subjects) {
            await this.subjectsInput.fill(subject)
            await this.subjectsInput.press('Enter')
        }
    }

    async enterCurrentAddress(address: string): Promise<void> {
        await this.currentAddressInput.fill(address)
    }

    async selectGender(gender: string): Promise<void> {
        await this.page.getByLabel(gender, { exact: true }).check()
    }

    async enterDateOfBirth(dateOfBirth: string): Promise<void> {
        const match = /^(\d{2})(\d{2})(\d{4})$/.exec(dateOfBirth)
        if (!match) {
            throw new Error('Date of birth must use DDMMYYYY format')
        }

        const [, day, month, year] = match
        const dayNumber = Number(day)
        const monthNumber = Number(month)
        const yearNumber = Number(year)
        const parsedDate = new Date(yearNumber, monthNumber - 1, dayNumber)

        if (
            monthNumber < 1 ||
            monthNumber > 12 ||
            parsedDate.getFullYear() !== yearNumber ||
            parsedDate.getMonth() !== monthNumber - 1 ||
            parsedDate.getDate() !== dayNumber
        ) {
            throw new Error('Date of birth must be a valid calendar date')
        }

        const formattedDate = `${day} ${this.monthNames[monthNumber - 1]} ${year}`
        await this.dateOfBirthInput.fill(formattedDate)
    }

    async selectHobbies(hobbies: string[]): Promise<void> {
        for (const hobby of hobbies) {
            await this.page.getByLabel(hobby, { exact: true }).check()
        }
    }

    async choosePicture(filePath: string): Promise<void> {
        await this.pictureInput.setInputFiles(filePath)
    }

    async selectCity(city: string): Promise<void> {
        await this.cityInput.fill(city)
        await this.cityInput.press('Enter')
    }
    
    async selectState(state: string): Promise<void> {
        await this.stateInput.fill(state)
        await this.stateInput.press('Enter')
    }

    async clickOnSubmit(): Promise<void> {
        await this.submitButton.evaluate(button => (button as HTMLButtonElement).click())
    }

    async verifyUser(user: PracticeFormUser): Promise<void> {
        const dateMatch = /^(\d{2})(\d{2})(\d{4})$/.exec(user.dateOfBirth)
        if (!dateMatch) {
            throw new Error('Date of birth must use DDMMYYYY format')
        }

        const [, day, month, year] = dateMatch
        const monthName = this.fullMonthNames[Number(month) - 1]
        if (!monthName) {
            throw new Error('Date of birth must contain a valid month')
        }

        // const pictureName = user.picture.split(/[\\/]/).pop() ?? user.picture
        const expectedValues: Record<string, string> = {
            'Student Name': `${user.firstName} ${user.lastName}`,
            'Student Email': user.email,
            'Gender': user.gender,
            'Mobile': user.mobileNumber,
            'Date of Birth': `${Number(day)} ${monthName},${year}`,
            'Subjects': user.subjects.join(', '),
            'Hobbies': user.hobbies.join(', '),
            // 'Picture': user.picture,
            'Address': user.currentAddress,
            'State and City': `${user.state} ${user.city}`
        }

        await expect(this.confirmationTitle).toHaveText('Thanks for submitting the form')
        for (const [label, value] of Object.entries(expectedValues)) {
            const row = this.submissionRows.filter({hasText: label})
            await expect(row.locator('td').nth(1)).toHaveText(value)
        }
    }
}
