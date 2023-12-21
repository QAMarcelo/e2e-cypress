import { Button } from '../../basic-objects';
import { BaseDialog } from './baseDialog';



export class errorDialog extends BaseDialog {

    constructor() {
        super(cy.xpath("//div[@role='dialog'][ .//text()='Error']")); 
    }
    
    public OK =():Button=> new Button(cy.xpath("//kendo-dialog-actions //button[text()= 'OK']"));

}