
import { BaseObject } from "./baseObject";

export class Dropdown extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public SelectByText(text: string): void {
        this.Click();
        cy.xpath(`//kendo-list //*[text()="${text}"]`).click();
    }

    public SelectByIndex(index: number): void {
        this.Click();
        cy.get(`kendo-list li:nth-child(${index})`).click();
    }

    // public async Click(): Promise<void> { 
    //     this._container.click();
    // }
}
