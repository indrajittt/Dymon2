import { expect, Locator, Page } from '@playwright/test'


export class HomePage {
    readonly page: Page
    private readonly forms: Locator
    private readonly practiceForm: Locator
    private readonly interactions: Locator
    private readonly droppable: Locator
    private readonly subHeader: Locator


    constructor(page: Page) {
        this.page = page
        this.forms = page.getByText('Forms')
        this.practiceForm = page.getByRole('link', { name: 'Practice Form' })
        this.interactions = page.getByText('Interactions')
        this.droppable = page.getByRole('link', { name: 'Droppable' })
        this.subHeader = page.locator('.text-center')
    }

    async navigateToPracticeForm(): Promise<void> {
        await this.page.goto('https://demoqa.com/');
        await expect(this.page).toHaveTitle('demosite');
        await this.forms.click();
        await this.practiceForm.click();
        await expect(this.subHeader).toHaveText('Practice Form');
    }


    async navigateToDroppable(): Promise<void> {
        await this.page.goto('https://demoqa.com/');
        await expect(this.page).toHaveTitle('demosite');
        await this.interactions.click();
        await this.droppable.click(); 
        await expect(this.subHeader).toHaveText('Droppable');
    }
}
