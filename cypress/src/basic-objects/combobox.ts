
import { StringOptions } from '../utils';
import { BaseObject } from './baseObject';
import { Button } from './button';

export class Combobox extends BaseObject{

    
    private button=()=>new Button(this._Container.find('button'));

    constructor(selector: Cypress.Chainable) {
        super(selector);

        // cy.get(`@${this._alias}`).find('button').as(`@${this._alias}.button`);
        // this.button = new Button(`@${this._alias}.button`)  {Selector: 'button'}
        //this.button = new Button(selector);
    }

    public SelectByText(text: string): void{
        this.button().Click();
        cy.get('.k-popup .k-list-ul li').contains(text).click();
    }

    public SelectByIndex(index: number): void{
        this.button().Click();
        cy.get(`kendo-list li:nth-child(${index})`).click();
    }

}