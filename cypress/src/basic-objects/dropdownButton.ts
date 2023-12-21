
import { StringOptions } from '../utils';
import { BaseObject } from "./baseObject";

export class DropdownButton extends BaseObject{

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    
    public  SelectByIndex(index: number) : void
    {
        this.Click();
        let areaowns: string = ''; 
        this._Container.invoke('attr', 'aria-owns').then( (attr) => { areaowns = attr } );
        this._Container.find(`li:nth-child(${index})`).click();
    }

    public SelectByText(text: string, selectType: StringOptions = StringOptions.equal ) :void
    {
        this.Click();
        let areaowns: string = ''; 
        this._Container.invoke('attr', 'aria-owns').then( ($attr) => { areaowns = $attr } );
        //let areaowns = await this._container.getAttribute('aria-owns');
        //await t.click(Selector(`#${areaowns}`).find('li').withText(text));
        let partialSelector ="";
        switch (selectType) {
            case StringOptions.equal:
                partialSelector = `//li[.//*[text()='${text}']]`;
                break;
            case StringOptions.contains:
                partialSelector = `//li[.//*[contains(text(),'${text}')]]`;
                break;
        }
        cy.xpath(`//kendo-button-list[@id='${areaowns}'] ${partialSelector}`).click();
    }
   
    // public async Click(): Promise<void> { 
    //     await t.click(this._container)
    // }

} 