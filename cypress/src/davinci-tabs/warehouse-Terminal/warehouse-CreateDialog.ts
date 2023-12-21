import { Dropdown, TextBox } from "../../basic-objects";
import { BaseDialog } from "../../page-object/dialogs/baseDialog";


export class Warehouse_CreateDialog extends BaseDialog{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    public Description=() => new TextBox(this._Container.find('span').contains('Description').next('input'));
    public Mode =() => new Dropdown(this._Container.find('span').contains('Mode').next('kendo-dropdownlist'));
}
