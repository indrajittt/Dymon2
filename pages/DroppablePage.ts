import { expect, Locator, Page } from '@playwright/test'


export class DroppablePage {
    readonly page: Page
    private readonly dragMe: Locator
    private readonly droppable: Locator
    private readonly adBanner: Locator
    private readonly subHeader: Locator


    constructor(page: Page) {
        this.page = page
        this.dragMe = page.locator('#draggable')
        this.droppable = page.locator('#droppable').first()
        this.adBanner = page.locator('iframe[name*="google_ads_iframe"]')
        this.subHeader = page.locator('.text-center')
    }

    async dragAndDrop(): Promise<void> {
        await expect(this.subHeader).toHaveText('Droppable');
        await this.page.waitForLoadState('networkidle');
        await this.dragMe.scrollIntoViewIfNeeded();
        await this.dragMe.waitFor({ state: 'visible' });
        await this.droppable.waitFor({ state: 'visible' });
        await this.dragMe.dragTo(this.droppable);

    }

    async verifyDrop(): Promise<void> {
        await expect(this.droppable).toHaveText('Dropped!');
    }
}
