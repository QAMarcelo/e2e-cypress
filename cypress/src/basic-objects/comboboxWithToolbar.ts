

import { BaseObject } from "./baseObject";
import { Button } from "./button";
import { ComboboxWriteAndSearch } from "./comboboxWriteAndSearch";


export class ComboboxWithToolbar extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public Find=()=> new ComboboxWriteAndSearch( this._Container.find('partner-combobox'));
    public Insert=()=> new Button(this._Container.find('.insertIcon'));
    public Edit=()=> new Button(this._Container.find('partner-combobox'));
    public Search=()=> new Button(this._Container.find('partner-combobox'));

    public WriteAndSelect ( text: string ) {
        this.Find().Search(text);
    }

}