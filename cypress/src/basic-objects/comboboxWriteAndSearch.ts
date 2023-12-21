
import { BaseObject } from './baseObject';
import { Button } from './button';

export class ComboboxWriteAndSearch extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public Expand =() => new Button(this._Container.find('button'));
    public Clear=()=> new Button(this._Container.find('span[title=clear]'));;

    public Search(text: string): void{
        this._Container.find( 'kendo-searchbar input').type( text);
        cy.get('.k-popup .k-list-ul li').contains(text).first().click();
        //cy.xpath(`//li[.//span[contains(text(),'${text}')]][1]`);
                  //li[.//span[contains(text(), 'R-Item')]]
    }

    override Click(): void { 
        this.Expand().Click();
    }
}