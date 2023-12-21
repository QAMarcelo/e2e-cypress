
import { Button } from './basic-objects/button';
import { Dropdown } from './basic-objects/dropdown';
import { TextBox } from './basic-objects/textbox';

export class login{

    public Email = () => new TextBox(cy.get('[data-testid="login.email"]')); 
    public Next  = () => new Button(cy.get('[data-testid="login.next"]'));

    public Database  = () => new Dropdown(cy.get('kendo-dropdownlist.k-dropdownlist:not([aria-label="NO DATA FOUND"])'));
    public Back  = () => new Button(cy.get('.loginButtons button:nth-child(1)'))
    public Login  = () => new Button(cy.get('.loginButtons button:nth-child(2)'));
    public Password  = () => new TextBox(cy.get('[data-testid="login.password"]'));
    
    // public async Displayed() {
    //     return cy.get('.login').;
    // }
   
   
}