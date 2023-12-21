
import { Combobox, Dropdown, Link, TextBox } from "../../../basic-objects";
import { NumberBox } from "../../../basic-objects/numberBox";
import { BaseDialog } from "../../../page-object/dialogs/baseDialog";

export class ItemSkus_CreateDialog extends BaseDialog{

    constructor() {
        super(cy.get("kendo-dialog:not([hidden]) [role='dialog']"));
    }

    //HORIZONTAL STEPPER
    public CreateItem=()=> new Link(this._Container.find('mat-step-header[aria-posinset="1"]'));
    public CreateUOM=()=> new Link(this._Container.find('mat-step-header[aria-posinset="2"]'));
    public Advanced=()=> new Link(this._Container.find('mat-step-header[aria-posinset="3"]'));
    public Storage=()=> new Link(this._Container.find('mat-step-header[aria-posinset="4"]'));
    public Aliases=()=> new Link(this._Container.find('mat-step-header[aria-posinset="5"]'));
    public International=()=> new Link(this._Container.find('mat-step-header[aria-posinset="6"]'));

    //Selector must be changed, data-testid attribute needs to be added to the fields
    //PROPERTIES
    public Account =()=> new Combobox(this._Container.find('[data-testid="partner-search"]'));
    public ItemCode =()=> new TextBox(this._Container.find("span").contains("Item Code").next("input"));
    public Description=()=> new TextBox(this._Container.find("span").contains("Description").next("input"));
    public SKU=()=> new TextBox(this._Container.find("span").contains("SKU").next("input"));

     //UOM
    public UOM_Type=()=> new Dropdown(this._Container.find('mat-card.uom span').contains('Type').next('kendo-dropdownlist'));
    public UOM_Description=()=> new TextBox(this._Container.find('mat-card.uom span').contains('Description').next('input'));
    public UOM_Abbreviation=()=> new TextBox(this._Container.find('mat-card.uom span').contains('Abbreviation').next('input'));

    //DIMENSIONS
    public Dimensions_length=()=> new NumberBox(this._Container.find('mat-card.dimensions span').contains('Length').next('kendo-numerictextbox'));
    public Dimensions_Width=()=> new NumberBox(this._Container.find('mat-card.dimensions span').contains('Width').next('kendo-numerictextbox'));
    public Dimensions_Height=()=> new NumberBox(this._Container.find('mat-card.dimensions span').contains('Height').next('kendo-numerictextbox'));
    public Dimensions_GrossLBS=()=> new NumberBox(this._Container.find('mat-card.dimensions span').contains('Gross LBS').next('kendo-numerictextbox'));
    public Dimensions_TareLBS=()=> new NumberBox(this._Container.find('mat-card.dimensions span').contains('Tare LBS').next('kendo-numerictextbox'));

    //PALLETIZING
    public Palletizing_Tie=()=> new NumberBox(this._Container.find('mat-card.palletizing span').contains('Tie').next('kendo-numerictextbox'));
    public Palletizing_High=()=> new NumberBox(this._Container.find('mat-card.palletizing span').contains('High').next('kendo-numerictextbox'));
    public Palletizing_MaxStackLBS=()=> new NumberBox(this._Container.find('mat-card.dimensions  span').contains('Max Stack LBS').next('kendo-numerictextbox'));

}