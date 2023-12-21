import { BaseSelector } from "../../basic-objects/baseSelector";

export class Tab extends BaseSelector{

    baseSelector : Cypress.Chainable;
    _container : Cypress.Chainable;

    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public SearchTab(value : string | number): Tab {
        switch(typeof value)
        {
            case String.toString():
                // this._container = this.baseSelector.within(()=> { return cy.xpath(`//li[.//span[text() = '${value}']] `)});
                break;
            case Number.toString():
                this._container = this.baseSelector.find(`k-tabstrip-tab-${Number(value)-1}`);
                break;
        }
        return this;
    }

    public Click(): void {
        this._container.click();
    }
    
    public Close(): void {
        this._container.find('.ng-star-inserted').click();
    } 

    
}
