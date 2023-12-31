
//API
import { BusinessPartnerAPI } from '../api-folder/businessPartners';
import { StorageLocationsAPI } from "../api-folder/storageLocations";
import { InventoryAdjustmentsAPI } from '../api-folder/inventory';
import { ItemAPI } from "../api-folder/itemSKUS";
import { API, SetAPICredentials, SetRFCredentials, SetUICredentials, WEB } from "../DVU";
import { APIClass  } from "../api-folder/APIClass";
import { WarehouseAPI } from "../api-folder/warehouses/warehousesAPI";
import { iUserCredentials } from "./helpers";
import { SequenceAPI } from "../api-folder/Sequences/SequenceAPI";
import { UserAPI } from "../api-folder/users/userAPI";
import { UserGroupAPI } from "../api-folder/userGroup";


export interface iCredentials{
    user: string, 
    password: string,
    database: string,
    warehouse: string,//WarehouseAPI,
    url: string,
    version: string,
    license: string,
    port: string,
    authorization: string,
    language: string,
    type: string,
}

export interface initArgs{
    CredentialGroup? : string,
    Credentials?: {
        UI?: iUserCredentials,
        RF?: iUserCredentials,
        API?: iUserCredentials,
    }
    Scenario?: scenario,
    Headless?: boolean
}

/**
 * scenario create a complete scenario using a full list of parameters
 * 
 * @example  warehouse: {description: 'warehouseX', mode: WarehouseMode.barcodeScanning},
 * @param warehouse Edit/Create a warehouse
 * @param businessPartners Find/Create a lists of accounts
 * @param storageLocations Find/Create a lists of StorageLocations
 * @param Items Find/Create a lists of Items
 * @param IventoryAdjustment Adjust the inventory 
 */
export interface scenario {
    /**
     * @abstract This credential group has priority over the credential group in the testing object scenario
     */
    CredentialGroup? : string,
    /**
     * @example warehouse: {description: 'warehouseX', mode: WarehouseMode.barcodeScanning},
     */
    warehouse: WarehouseAPI,
    /**
     * @example businessPartners: [ { Description: 'Business Partner1', vendor: 'Business Partner1'} ] ,
     */
    businessPartners : BusinessPartnerAPI[],
     /**
     * @example storageLocations: [ warehouse: {description: 'WHSE1', enabled: true},  ] ,
     */
    storageLocations? : StorageLocationsAPI,
    items?: ItemAPI[],
    inventoryAdjustment?: InventoryAdjustmentsAPI,
    
    sequences?: SequenceAPI[],
    users?: UserAPI[],
    userGroups?: UserGroupAPI[],

    
}

export class Initializer {

    public async Load(args: initArgs): Promise<void>{
        debugger;
        
        this.LoadScenario(args);
        await this.loadURL(args);
        await this.Login(args);
    }

    //load the url from args or the pipeline variable
    private async loadURL(args: initArgs): Promise<void>{
       
       
        //if(args.Headless!=undefined && args.Headless==true ){
            //cy.log("URL =>>>>>" +WEB.url);
            cy.visit(WEB.url);
        //}

        if(!args.Headless || !args.Headless ){ // authenticate without going throught the login page by injecting cookies
            //TODO
        }else{ //authenticate going throught the login page
            
            //Localhost is displaying an error, adding if statement to handle it
            //one that the local environment works like qa then this statement should be removed
            // if (await DVU.Dialogs.Error.IsVisible()){
            //     await DVU.Dialogs.Error.OK.Click();
            // }
        }
    }

    private async Login(args: initArgs): Promise<void>{

    }
    
    public async LoadScenario(args: initArgs): Promise<void> {
        
        const credentialGroup : string | undefined =  args.CredentialGroup ?? args?.Scenario?.CredentialGroup ?? 'QA'; 
        SetUICredentials(credentialGroup, args?.Credentials?.UI);
        SetRFCredentials(credentialGroup, args?.Credentials?.RF);
        SetAPICredentials(credentialGroup, args?.Credentials?.API);

        if(args?.Scenario){
            
            const APICall = this.InitAPI();

            const whResp = await APICall.getWarehouse(args.Scenario);
            if(!whResp) throw new Error(`Error: the warehouse ${args.Scenario.warehouse.description} was not correcly udpated/saved`);

            const bpResp = await APICall.getVendors(args.Scenario);
            if(bpResp.length != args.Scenario.businessPartners.length) throw new Error(`Error: not all the accounts were created/updated`);

            const sLocationResponse = await APICall.getStorageLocations(args.Scenario, whResp.id!);
            if(sLocationResponse.length != args.Scenario.storageLocations?.Locations.length) throw new Error(`Error: not all the Storage Locations were created/updated`);

            const itemsResponse =  await APICall.getItems(args.Scenario); 
            if(itemsResponse.length != args.Scenario.items?.length) throw new Error(`Error: not all the items were created/updated`);

            const invAdjResponse = await APICall.getInventoryAdjustment(args.Scenario, whResp?.id!);
            if(invAdjResponse.length != args.Scenario.inventoryAdjustment?.itemAdjustment?.length) throw new Error(`Error: not all the inventory adjustment were created/updated`);

            const seqResponse = await APICall.getSequences(args.Scenario);
            if(seqResponse.length != args.Scenario.sequences?.length) throw new Error(`Error: not all the sequences were saved`);
        }
    }

    private InitAPI = (): APIClass => {

        const call = new APIClass( );
        call.setBaseURL(`${API.url}:${API.port}/${API.version}/${API.license}/${API.database}`);
        call.setHeaders({
            'Authorization': API.authorization,
            'Content-Type': 'application/json'
        })
            // `${API.url}:${API.port}/${API.version}/${API.license}/${API.database}`,
            // {
            //     'Authorization': API.authorization,
            //     'Content-Type': 'application/json'
            // }
        //);
        return call;
    }
}

// export let Init = new Initializer();
