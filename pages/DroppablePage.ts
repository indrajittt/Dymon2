import {expect, Locator, Page} from '@playwright/test'


export class DroppablePage {
    readonly page: Page
    private readonly dragMe: Locator
    private readonly droppable: Locator

   
    constructor(page: Page) {
        this.page = page
        this.dragMe = page.getByRole('tabpanel', { name: 'Simple' }).getByText('Drag Me')
        this.droppable = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable')
    }

    async dragAndDrop(): Promise<void> {
        await this.dragMe.waitFor({ state: 'visible' });
        await this.dragMe.dragTo(this.droppable);
    }

    async verifyDrop(): Promise<void> {
        await expect(this.droppable).toHaveText('Dropped!');
    }
}
