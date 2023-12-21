
import { BaseObject } from "./baseObject";


export class NumberBox extends BaseObject {

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    
    public SetNumber(number: Number): void{
        this._Container.type(number.toString());
        // await t.typeText(this._container, number.toString());
     }
}