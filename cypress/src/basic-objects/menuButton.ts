import { BaseObject } from "./baseObject";


export class MenuButton extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    

    public Hover(): void {
        this._Container.trigger('mouseover');
    }

    public SelectValue(value: string | number): void{
        this.Click();
        //let menupopup: Cypress.Chainable;
        switch (typeof(value)) {

            case "string":
                //await t.click(this._alias.find(`.k-popup.k-menu-popup li [ng-reflect-display-text="${value}"] button`));
                // menupopup = Selector(`.k-popup.k-menu-popup li button`);
                // await t.click(menupopup.withText(value));
                //cy.xpath(`//div[contains(@class,'k-menu-popup')] //li //button[text()='${value}']`)
                cy.get(`.k-popup.k-menu-popup li button`).contains(value).click();
                break;
            case "number":
                // menupopup = Selector(`.k-popup.k-menu-popup li:nth-child(${value}) button`);
                // await t.click(menupopup);
                cy.get(`.k-popup.k-menu-popup li:nth-child(${value}) button`).click();
                break;
        }
    }
}