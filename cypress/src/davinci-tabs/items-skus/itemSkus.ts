
import { BaseSelector } from "../../basic-objects/baseSelector";
import { Tab, Table } from "../../page-object";
import { ItemSkus_CreateDialog } from "./dialog/itemSkus-Search";
import { ItemSkus_toolbar } from "./itemSkus-toolbar";

export class ItemSKUS extends BaseSelector{

    constructor() {
        super(cy.get('div.k-state-active items-skus'))
    }
    
    public Toolbar=()=> new ItemSkus_toolbar( this._Container.find('.k-toolbar'));
    public CreateItem=()=> new ItemSkus_CreateDialog(this._Container.find('kendo-dialog'));

    public Table=()=> new Table(this._Container.find('table'));
}