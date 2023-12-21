
import { ReceivingOrdersModal, ReceivingOrders_Toolbar } from ".";
import { BaseSelector } from "../../basic-objects/baseSelector";


export class receivingOrders{


    public getContainer() : Cypress.Chainable {
        return cy.get('.k-state-active receiving');
    }
    public Toolbar =()=> new ReceivingOrders_Toolbar(this.getContainer().find('.k-toolbar'));
    public CreateReceivingOrder =()=> new ReceivingOrdersModal(this.getContainer().find('kendo-dialog.largeDialogBox'));
    
    //public getContainer = () => { return cy.get('.k-state-active receiving').as('receiving-dialog'); }
    //this.Toolbar = new ReceivingOrders_Toolbar(this._container.find('.k-toolbar'));
    // public Toolbar = () => new ReceivingOrders_Toolbar('Receive.Toolbar');
    // public CreateReceivingOrder = () => new ReceivingOrdersModal('Receive.dialog');
}