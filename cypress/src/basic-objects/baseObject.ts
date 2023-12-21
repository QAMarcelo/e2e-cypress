import { extend } from "cypress/types/lodash";
import { BaseSelector, BaseAlias } from "./baseSelector";


export abstract class BaseObject  extends BaseSelector{

    //_container : Cypress.Chainable;

    public Click() { 
        this._Container.click();
    }

    public getAttribute(attribute: string): string{
        return String(this._Container.invoke('attr', attribute).then((attr) => { return attr }));
    }

}
