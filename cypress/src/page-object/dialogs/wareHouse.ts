
import { Button } from '../../basic-objects/button';
import { Combobox } from '../../basic-objects/combobox';
import { BaseDialog } from './baseDialog';


export class warehouse extends BaseDialog {

    constructor() {
        super( cy.get('[data-testid="warehouse-dlg"]'));
    }

    public selectWarehouse=()=> new Combobox(this._Container.find('[data-testid="warehouse-select"]'));
    public OK =()=> new Button(cy.xpath("//kendo-dialog-actions //button[text()= 'OK']"));

}