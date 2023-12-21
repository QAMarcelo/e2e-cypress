


export class MenuItem {
    //private _container: Cypress.Chainable;
    private alias : string;
    private Parent: MenuItem | null = null;

    constructor(menuTitle: string, parent: MenuItem | null = null) {
        this.alias = menuTitle;
        //cy.contains(menuTitle).as(this.alias);
        this.Parent = parent;

    }
    
    public GoTo(): void{
        if(this.Parent == null){
            cy.get('[data-testid="toolbar.menu"]').click(); //click on the toolbar menu icon
        }else{
            this.Parent.GoTo();
        }
        cy.get('button').contains(this.alias).click();
    
    }

    public click(): void {
        // if(  this._container.hasAttribute('aria-expanded') )
        //      this._container.click();
        // else
        cy.get('button').contains(this.alias).click();
    }

    // public async getText(): Promise<string> {
    //     let innertText : string | undefined = undefined
    //     cy.get('button').contains(`${this.alias}`).then().find("i").invoke('text').then(($text)=> { innertText = $text});
    //     return innertText;
    // }
}