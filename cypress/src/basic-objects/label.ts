
import { BaseObject } from './baseObject';


export class Label  extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    
    public Text(): string {
        return String(this._Container.then( elem=> { return elem.text(); } ));
    }

    // public async Exists(): Promise<boolean> {
    //     return this._container.exists;
    // }
}