import { Button, Combobox, TextBox } from "../../../basic-objects";
import { ComboboxSearch } from "../../../basic-objects/combobox-Search";
import { BaseDialog } from "../../../page-object/dialogs/baseDialog";

export class ItemSkus_CreateDialog extends BaseDialog{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public Account=()=> new ComboboxSearch(this._Container.find('span').contains('Account').next());
    public SKU=()=> new TextBox(this._Container.find('span').contains('SKU').next('input'));
    public ItemCode=()=> new TextBox(this._Container.find('span').contains('Item Code').next('input'));
    public Description=()=> new TextBox(this._Container.find('span').contains('Description').next('input'));
    public Clear =()=> new Button(this._Container.find('button').contains('Search'));
    public Search=()=> new Button( this._Container.find('button').contains('Clear'));
}