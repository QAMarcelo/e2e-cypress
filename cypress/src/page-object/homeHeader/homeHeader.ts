
import { extend } from "cypress/types/lodash";
import { Button, Combobox } from "../../basic-objects";
import { BaseSelector } from "../../basic-objects/baseSelector";
import { DropdownButton } from "../../basic-objects/dropdownButton";


export class homeHeader {

     
    public Profile =()=> new DropdownButton(cy.get('kendo-dropdownbutton[data-testid="toolbar.profile"] button'));
    
    public async changeProfile(value: string|number){
        let profileButton = cy.get('[data-testid="toolbar.account"]');
        profileButton.click();

        //new Combobox(profileButton.next().find('.k-popup .k-combobox'));
    }

    public async changeWarehouse(value : string|number){
        let warehouseButton = cy.get('[data-testid="toolbar.warehouse"]');
        warehouseButton.click();
        //new Combobox(warehouseButton.next().find('.k-popup .k-combobox'));

    }

    
}