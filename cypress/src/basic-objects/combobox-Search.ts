

import { Button } from './button';
import { Combobox } from './combobox';

export class ComboboxSearch extends Combobox{

    constructor(selectors: Cypress.Chainable) {
        super(selectors);
        
        // this._Container.find('span.fa-search').parent('button')
        // this.Search 
    }


    public Search =() => new Button(this._Container.find('span.fa-search').parent('button'));
  
}