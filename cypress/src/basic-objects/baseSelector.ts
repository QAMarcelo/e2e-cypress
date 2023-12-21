
import "@cypress/xpath";


export class BaseSelector{

    _Container : Cypress.Chainable;

    constructor(selector: Cypress.Chainable){
        this._Container = selector;
    }

    public IsVisible(): boolean{
        return false;
    }

    public IsEnable(): boolean {
        return false;
    }

    public getContainer(): Cypress.Chainable {
        return this._Container;
    }
} 

export class BaseAlias {

    _alias: string;
    constructor(alias: string){
        this._alias = alias;
    }

    public get(){
        return cy.get(this._alias);
    }

}