import { BaseObject } from "./baseObject";

export class Link extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
}