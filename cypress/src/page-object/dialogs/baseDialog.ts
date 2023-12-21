
import { Button } from '../../basic-objects';
import { BaseSelector } from '../../basic-objects/baseSelector';

export abstract class BaseDialog extends BaseSelector{

    constructor(selector: Cypress.Chainable){
        super(selector);
        // this.CloseDialog = new Button(cy.get(this._alias).find('.k-dialog-close'));
        // this.Save = new Button(cy.get(this._alias).find('div.save button:not(.mat-menu-trigger)'));
    }

    public Save=(): Button => new Button( this._Container.find('div.save button:not(.mat-menu-trigger)'));
    public CloseDialog=(): Button => new Button(this._Container.find('.k-dialog-close'));


    public getTitle(): string {
        return String(this._Container.find(".k-dialog-title").find(".title").then((title) => { return title.text()}));

    }
    public Exists(): boolean {
        return Boolean(this._Container.then((ele)=> { return ele.length>0 }));
    }
    

    // public IsVisible(): boolean {
    //     return cy.get(this._alias).visible;
    // }
}