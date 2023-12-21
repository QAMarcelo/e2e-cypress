
import { Button, ComboboxWriteAndSearch, Dropdown, TextBox } from "../../basic-objects";
import { BaseObject } from "../../basic-objects/baseObject";
import { ComboboxWithToolbar } from "../../basic-objects/comboboxWithToolbar";
import { NumberBox } from "../../basic-objects/numberBox";
import { BaseDialog } from "../../page-object/dialogs/baseDialog";


export class ReceivingOrdersModal extends BaseDialog{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public SideMenu=()=> new SideMenu(this._Container.find('mat-sidenav'));
    public LineEntries=()=> new LineEntries( this._Container.find('receiving-line-entries'));

     //SUMMARY
    public Status=()=> new Dropdown(this._Container.find('span').contains('Status').next('span').find('kendo-dropdownlist'));
    public Account =()=> new ComboboxWithToolbar(this._Container.find('span').contains('Account').next('span.searchAndSearchButton'));
    public Carrier=()=> new ComboboxWithToolbar(this._Container.find('span').contains('Carrier').next('span.searchAndSearchButton'));
    public Supplier=()=> new ComboboxWithToolbar(this._Container.find('span').contains('Supplier').next('span.searchAndSearchButton'));
    public ReceivedFrom=()=> new ComboboxWithToolbar(this._Container.find('span').contains('Received From').next('span.searchAndSearchButton'));
    public OrderNumber=()=> new TextBox(this._Container.find('span').contains('Order Number').next('input'));
}

export class SideMenu extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    public General =()=> new Button(this._Container.find('ul>div:nth-child(1)'));
    public LineEntries=()=> new Button(this._Container.find('ul>div:nth-child(2)'));
    public Appointment=()=> new Button( this._Container.find('ul>div:nth-child(3)'));
    public CrossDock=()=> new Button(this._Container.find('ul>div:nth-child(4)'));
    public ChargeCodes=()=> new Button( this._Container.find('ul>div:nth-child(5)'));
    public Documents=()=> new Button(this._Container.find('ul>div:nth-child(6)'));
    public Notes=()=> new Button(this._Container.find('ul>div:nth-child(7)'));
    public SourceData=()=> new Button(this._Container.find('ul>div:nth-child(8)'));
    public EventHistory =()=> new Button(this._Container.find('ul>div:nth-child(9)'));
    public EventManagement=()=> new Button(this._Container.find('ul>div:nth-child(10)'));
}

export class LineEntries extends BaseObject {

    constructor(selector: Cypress.Chainable){
        super(selector);
    }

    public Toolbar =()=> new LineEntriesToolBar( this._Container.find('kendo-grid-toolbar'));
    public GeneralPanel=()=> new GeneralPanel(this._Container.find('mat-expansion-panel:nth-child(1)')); 
}

export class LineEntriesToolBar extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    public Insert=()=> new Button( this._Container.find('[data-testid="button.Insert"]'));
    public Delete=()=> new Button(this._Container.find('span:nth-child(2) button'));
    public Wizard=()=> new Button( this._Container.find('span:nth-child(3) button'));
    public Copy=()=> new Button(this._Container.find('span:nth-child(4) button'));
    public BatchReceive=()=> new Button(this._Container.find('span:nth-child(5) button'));
    public ExportCSV=()=> new Button(this._Container.find('span:nth-child(6) button'));
}


export class GeneralPanel extends BaseDialog{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    public ItemCode=()=> new ComboboxWriteAndSearch(this._Container.find('item-code-combobox'));
    //public QtyPlanned=()=> new NumberBox(this._Container.find('span').contains('Qty Planned').next('kendo-numerictextbox'));
    public QtyPlanned=()=> new NumberBox(this._Container.find('span').contains('Qty Planned').next('kendo-numerictextbox'));
    //public QtyReceived=()=> new NumberBox(this._Container.find('span').contains('Qty Received').next('kendo-numerictextbox'));
    public QtyReceived=()=> new NumberBox(this._Container.find('span').contains('Qty Received').next('kendo-numerictextbox'));
    //public Location=()=> new ComboboxWriteAndSearch(this._Container.find('span').contains('Location').next('kendo-combobox'));
    public Location=()=> new ComboboxWriteAndSearch(this._Container.find('span').contains('Location').next('kendo-combobox'));
    public Insert=()=>  new Button(this._Container.within(()=> { 
        return cy.xpath('//div[contains(@class,"save")]/button[text()="Insert"]') 
    }))
    // public async Expand(): Promise<void>{

    //     if(this._container.withAttribute('class', 'mat-expanded'))
    //         this._container.click();
    // }
}

export class CrossDock{

}