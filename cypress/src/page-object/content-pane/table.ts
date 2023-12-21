import { BaseSelector } from "../../basic-objects/baseSelector";


interface TableQuery {
    rowTitle : string,
    rowValue: string,
}

export class Table extends BaseSelector{

    private Headers: string[];

    constructor(selector: Cypress.Chainable){
        super(selector);
    }
    
    public async clickRowByQuery(tableQuery : TableQuery[]){
        var query = "";
        for await (const e of tableQuery) {
            var ariacolindex : string= ''; 
            // cy.xpath(`//*[@role='columnheader'][.//span[text()='${e.rowTitle}']]`).invoke('attr','aria-colindex').then( ($attr)=> { ariacolindex = $attr});
            // query += `.//td[@aria-colindex='${ariacolindex}'][text()='${e.rowValue}'] and `;
        }

        if(query.length>0){
            query = query.substring(0, query.length -4 );
            query = "//div[contains(@class, 'k-state-active')] //tr[ " + query + "]";
            // cy.xpath(query).click();
        }
    }
    
    public async clickRow(index: number): Promise<void>{
        this._Container.find(`tbody tr[kendogridlogicalrow]:nth-child(${index})`).click();
    }

    public async getValue(column: number, row: number): Promise<string> {
        let findSelector = "";
        
        switch(typeof column)
        {
            case Number.toString() :
                findSelector = `tbody tr[kendogridlogicalrow]:nth-child(${row}) td:nth-child(${column})`;
                break;
        }
       
        return  String(this._Container.find(findSelector).invoke('text').then((val)=> { return val }));
    }

    

}