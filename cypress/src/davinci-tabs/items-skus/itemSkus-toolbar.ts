
import { Button, MenuButton } from "../../basic-objects";
import { Toolbar } from "../../page-object";

export class ItemSkus_toolbar extends Toolbar {


    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public Insert =()=> new Button(this._Container.find("span:nth-child(1) button"));
    public Edit=()=> new Button(this._Container.find("span:nth-child(2) button"));
    public Disable=()=> new Button(this._Container.find("span:nth-child(3) button"));
    public InventoryAdjust=()=> new Button( this._Container.find("span:nth-child(4) button"));
    public Print=()=> new Button(this._Container.find("span:nth-child(5) button"));
    public Refresh=()=> new Button(this._Container.find("span:nth-child(6) button"));
    public Search=()=> new Button(this._Container.find("span:nth-child(7) button"));
    public Filter=()=> new Button(this._Container.find("span:nth-child(8) button"));
    public ExportCSV=()=> new Button(this._Container.find("span:nth-child(9) button"));
    public ExportPDF=()=> new Button(this._Container.find("span:nth-child(10) button"));
    public Email=()=> new Button(this._Container.find("span:nth-child(11) button"));
    public More=()=> new MenuButton(this._Container.find("kendo-menu ul[role='menubar'] button"));

}