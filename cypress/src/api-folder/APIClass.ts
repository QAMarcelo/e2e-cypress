
import { LoadItemData, LoadStorageLocationsData, LoadVendorAssignedCodes, LoadVendorData, LoadVendorDefaultBilling, LoadWarehouseData } from './APIHelper/APIHelper';
import { BusinessPartnerAPI } from './businessPartners';
import { iSequenceAPI, iBusinessPartnerAPI, iInvAdjustmentDetailAPI, iInventoryAdjustmentAPI, iItemAPI, iStorageLocationAPI, iUser, iWarehouseAPI } from './interfaces/';

import { InventoryAdjustmentsAPI } from './inventory';
import { StorageLocationsAPI } from './storageLocations';
import { WarehouseAPI } from './warehouses';
import { API, DVU, RF, WEB } from '../DVU';


import { scenario } from '../utils';


export enum APIMethods {
    POST = 'POST',
    GET = 'GET',
    PUT= 'put',
    DELETE = 'DELETE'
}

export interface APIParams {
    Url: String, 
    method: APIMethods, 
    data?: {}, 
    params?: {}
}

export class APIClass {

    private baseURL: string;
    private headers: { };

    constructor(){
    //constructor(baseURL: string, headers: {}){
        // this.baseURL = baseURL; 
        // this.headers = headers;
    }

    public setBaseURL = (baseURL: string):APIClass => {
        this.baseURL = baseURL;
        return this;
    }

    public setHeaders = (headers: {}): APIClass => {
        this.headers = headers;
        return this;
    }
    /**
     * 
     * @param ApiParams conections params
     * @returns 
     */
    public Call = async( ApiParams: APIParams ):Promise<{}>=>{
        var axios = require('axios');
        var result:{}={};
        
        if(DVU().Session==undefined ){
            DVU().Session =  await this.getSession();
        }
        // if(t.ctx.Session==undefined){
        //     t.ctx.Session = await this.getSession();
        // }
        var config = {
            method: ApiParams.method,
            url: this.baseURL + "/" + DVU().Session + ApiParams.Url,
            //url: this.baseURL + "/" + t.ctx.Session + ApiParams.Url,
            params: ApiParams.params,
            headers: this.headers,
            data : ApiParams.data
        };

        console.log(config.url);
        try{
            await axios(config)
                .then(function (response) {
                    result = response;
                })
                .catch(function (error) {
                    console.log('error = ' + error);
                });
        }
        catch(e){
            console.log(e);
        }
        return result;
    }

    /**
     * Call the endpoint Session in order to generate a new session value
     * @returns sessionId : string value
     */
    private getSession = async(): Promise<string> =>{
        var axios = require('axios');
        var result = "";
        var config = {
            method: APIMethods.POST,
            url: this.baseURL+"/session",
            headers: this.headers,
            data : `{ "email": "${API.user}", "password": "${API.password}"}`
        };

        await axios(config)
        .then(function (response) {
            result= response.data['sessionId'];
        })
        .catch(function (error) {
            console.log(error);
        });
        return result;
    }

    /**
     * 
     * @param Scenario 
     * @returns 
     */
    public getWarehouse = async(Scenario: scenario): Promise<iWarehouseAPI|undefined> => {

        let whResponse: iWarehouseAPI | undefined = {};
        
        if(Scenario.warehouse){
            let warehouse: WarehouseAPI = Scenario.warehouse;
            
            const existsWarehouse = await this.searchWarehouse(warehouse.description);
            let whLoaded: iWarehouseAPI;
            if(existsWarehouse){
                whLoaded = LoadWarehouseData(warehouse, existsWarehouse);
                whResponse = await this.updateWarehouse(whLoaded);
            }
            else{ //if not exist create a new warehouse
                whLoaded = LoadWarehouseData(warehouse);
                whResponse = await this.createWarehouse(whLoaded);
            }
           
            await this.assignWarehouseToUsers(whResponse?.id!);
        }
        return whResponse;
    }
    
    /**
     * assign the businessparterns to the credential groups WEB, RF and API
     * @param bpId vendor Id number
     */
    public assignVendorsToUsers = async (bpId: number): Promise<void> => {
        const WEBUser : iUser = await this.searchUsers(WEB.user);
        const RFUser : iUser = await this.searchUsers(RF.user);
        const APIUser : iUser = await this.searchUsers(API.user);

        let WEBResponse;
        const webUserWhs = WEBUser.businessPartners?.find(vendor=>{ return vendor.bpId == bpId; });
        if(!webUserWhs){
            WEBUser.businessPartners?.push({ userId: WEBUser.id, bpId });
            WEBResponse = await this.updateUsers(WEBUser);
        }

        //******* the RF user has access to the new Warehouse if it is new */
        let RFResponse;
        const rfUserWhs = RFUser.businessPartners?.find(vendor=>{ return vendor.bpId == bpId; });
        if(!rfUserWhs){
            RFUser.businessPartners?.push({ userId: RFUser.id, bpId });
            RFResponse = await this.updateUsers(RFUser);
        }

        //******* the API user has access to the new Warehouse if it is new */
        let APIResponse;
        const apiUserWhs = APIUser.businessPartners?.find(vendor=> {return vendor.bpId == bpId; });
        if(!apiUserWhs){
            APIUser.businessPartners?.push({ userId: APIUser.id, bpId });
            APIResponse = await this.updateUsers(APIUser);
        }


    }

    /**
     * assign the warehouse to the credential groups WEB, RF and API
     * @param warehouseId warehouse Id number
     */
    public assignWarehouseToUsers = async(warehouseId : number):Promise<void> =>{
        
        const WEBUser : iUser = await this.searchUsers(WEB.user);
        const RFUser : iUser = await this.searchUsers(RF.user);
        const APIUser : iUser = await this.searchUsers(API.user);

        //******* the web user has access to the new  Business Partner if it is new */
       
        
        let WEBResponse;
        const webUserWhs = WEBUser.warehouses?.find(warehouse=>{ return warehouse.warehouseId == warehouseId; });
        if(!webUserWhs){
            WEBUser.warehouses?.push({ userId: WEBUser.id, warehouseId });
            WEBResponse = await this.updateUsers(WEBUser);
        }

        //******* the RF user has access to the new Business Partner if it is new */
        let RFResponse;
        const rfUserWhs = RFUser.warehouses?.find(warehouse=>{ return warehouse.warehouseId == warehouseId; });
        if(!rfUserWhs){
            RFUser.warehouses?.push({ userId: RFUser.id, warehouseId });
            RFResponse = await this.updateUsers(RFUser);
        }

        //******* the API user has access to the new  Business Partner if it is new */
        let APIResponse;
        const apiUserWhs = APIUser.warehouses?.find(warehouse=> {return warehouse.warehouseId == warehouseId; });
        if(!apiUserWhs){
            APIUser.warehouses?.push({ userId: APIUser.id, warehouseId });
            APIResponse = await this.updateUsers(APIUser);
        }
    }

    public searchUsers = async(user: string):Promise<iUser> => {
        let result: iUser = {};
       
        const userResponse = await this.Call({Url:`/users/ui?email=${user}&enabled=1&enable=0`,method: APIMethods.GET});
        const listUsers : iUser[] = userResponse['data'];

        listUsers.forEach(usr => {
            if(usr.email == user || usr.description==user){
                result = usr;
                return;
            }
        });
        
        const data = await this.Call({Url: `/users/${result.id}`, method: APIMethods.GET});
        result = data['data'];
        return result;
    }

    /**
     * Update a given user account using an API endpoint
     * @param User 
     * @returns 
     */
    public updateUsers = async(User: iUser):Promise<iUser> => {
        let userResponse: iUser = {};
        const response = await this.Call({Url:`/users`, method: APIMethods.PUT, data: User});
        if(response['status']==200){
            userResponse = response['data'];
        }else{
            throw new Error();
        }
        return userResponse;
    } 


    public getVendors = async (Scenario: scenario): Promise<iBusinessPartnerAPI[]> => {

        let bpResponseList : iBusinessPartnerAPI[] = [];
        // bpResponseList.pop();

        if(Scenario.businessPartners){

            let businessPartners: BusinessPartnerAPI[] = Scenario.businessPartners;
            for await (const vendor of businessPartners) {
                
                let bpResponse: iBusinessPartnerAPI;
                let bpLoaded: iBusinessPartnerAPI = {};

                const existVendor = await this.searchVendor(vendor.Description ?? vendor.Vendor!);
                
                if(existVendor){
                    bpLoaded = LoadVendorData(vendor, existVendor);
                    bpResponse = await this.updateVendor( bpLoaded ) as iBusinessPartnerAPI;

                }else{
                    bpLoaded= LoadVendorData(vendor);
                    bpResponse= await this.createVendor( bpLoaded ) as iBusinessPartnerAPI;
                    await this.assignVendorsToUsers(bpResponse.id!);
                }

                const loadAssignedCodes = LoadVendorAssignedCodes(vendor, bpResponse);
                if(loadAssignedCodes.length>0){
                    bpResponse.autoChargeCodes = loadAssignedCodes;
                    bpResponse = await this.updateVendor( bpResponse ) as iBusinessPartnerAPI;
                }

                const loadDefaultCodes = LoadVendorDefaultBilling(vendor, bpResponse);
                if(loadDefaultCodes.length>0){
                    bpResponse.defaultBillings = loadDefaultCodes;
                    bpResponse = await this.updateVendor( bpResponse ) as iBusinessPartnerAPI;
                }
                if(bpResponse){
                    bpResponseList.push( bpResponse );
                }
            }
        }
        return bpResponseList;
    }
   
    public getStorageLocations = async(scenario: scenario, warehouseId: number): Promise<iStorageLocationAPI[]> => {

        let sLocationResponse : iStorageLocationAPI[] = [];

        if(scenario.storageLocations){

            let storageLocations: StorageLocationsAPI = scenario.storageLocations!;
            if(storageLocations){

                for await (const sLocation of storageLocations.Locations) {
                    const storageLocation = await this.searchStorageLocation(sLocation.Description, warehouseId);
                    var slLoaded: iStorageLocationAPI;
                    let response: iStorageLocationAPI|undefined = undefined;

                    if(storageLocation){
                        slLoaded = LoadStorageLocationsData(sLocation, storageLocation);
                        slLoaded.warehouseId = slLoaded.warehouseId?? (sLocation.WarehouseId ?? warehouseId);
                        response = await this.updateStorageLocation(slLoaded);
                    }else{
                        slLoaded = LoadStorageLocationsData(sLocation);
                        slLoaded.warehouseId = slLoaded.warehouseId?? (sLocation.WarehouseId ?? warehouseId);
                        if(!slLoaded.storageId) {
                            slLoaded.storageId = slLoaded.description;
                        }
                        response = await this.createStorageLocation(slLoaded);
                    }

                    if(response){
                        sLocationResponse.push(response);
                    }
                }
            }
        }
        return sLocationResponse;
    }

    public getItems = async(scenario: scenario) : Promise<iItemAPI[]> => {

        let itemList: iItemAPI[] = [];

        if(scenario.items){
            for await (const item of scenario.items) {
                
                const existItem = await this.searchItem(item.ItemCode, true) as iItemAPI; 
                //const itemToCompare =  await this.updateItem(existItem) ;
                let itemResponse: iItemAPI | undefined = undefined
                let itemLoaded : iItemAPI;

                if(item.Vendor){
                    const vendor = await this.searchVendor(item.Vendor);
                    item.AccoundId = vendor?.id;
                }

                if(existItem){
                    itemLoaded = LoadItemData(item, existItem) as iItemAPI;
                    //const comparedItems = JSON.stringify(existItem) === JSON.stringify(itemLoaded);
                    //if(!comparedItems){
                        itemResponse = await this.updateItem(itemLoaded);
                        console.log(itemResponse);
                    //}
                    
                }else{
                    let itemLoaded = LoadItemData(item) as iItemAPI;
                    itemResponse = await this.createItem(itemLoaded);
                }
                if(itemResponse){
                    itemList.push(itemResponse);
                }
            }
        }
        return itemList;
    }

    private cleanInventory = async(ItemId: number, warehouseId: number):Promise<void> => {
        //let itemObject = this.searchItem(ItemCode) as iItemAPI;
        //if(itemObject){
            const uri = `/whses/${warehouseId}/inv/detail?itemType=1&exact=lotCode&exact=sublotCode&exact=lpn&lotCode=&sublotCode=&pageSize=10000&pageOffset=1&itemId=${ItemId}`;
            const response = this.Call({Url: uri, method: APIMethods.GET});
            if(response['status']==200){

                const details = response['data'] as iInvAdjustmentDetailAPI[];

                for await (const detail of details){
              
                    let invAdjustmentData: iInventoryAdjustmentAPI = 
                    {
                        itemId: detail?.id!,
                        qty: detail?.allocated! * -1,
                        status: 1,
                        storageId: detail?.storageId!,
                        lot: detail?.lotCode,
                        lpn: detail?.lpn,
                        sublot: detail?.sublotCode,
                    };

                    const invAdjusResponse = this.Call({Url: `/whses/${warehouseId}/inv/adjustment`, method: APIMethods.POST, data: invAdjustmentData})
                    if(invAdjusResponse['status']==200){

                    }else{
                        throw new Error(`was not able to adjust inventor : ${ItemId}`);
                    }

                }; 

            }else{
                throw new Error(`Was not able to list all the item iventory`);
            }
        //}
        
    } 

    public getInventoryAdjustment = async(Scenario: scenario, warehouseId: number) : Promise<iInventoryAdjustmentAPI[]> => {
        
        let inventoryAdjustment: InventoryAdjustmentsAPI | undefined= Scenario.inventoryAdjustment;

        let invAdjustResponse : iInventoryAdjustmentAPI[] = [];
      
        if(inventoryAdjustment){
            for await (const invA of inventoryAdjustment?.itemAdjustment) {
                
                //const itemUri = `/items?itemCode=${invA.itemCode}`;
                const whId = inventoryAdjustment.warehouse?.id ?? (invA.warehouseId ?? warehouseId);
                const item = (await this.searchItem(invA.itemCode!)); 
                const sLocation = (await this.searchStorageLocation(invA.storageIdentifier, whId!)); 
    
                //if(invA.emptyInventory){
                await this.cleanInventory(invA.itemId!, whId);
                //}
                
                const invAdjLoaded : iInventoryAdjustmentAPI = {
                    itemId: item?.id!,
                    lot: invA.lot,
                    lpn: invA.lpn,
                    qty: invA.qty,
                    status: invA.status,
                    storageId: sLocation?.id!,
                    sublot: invA.sublot,
                    unitGwt: invA.gWeigth,
                }
                const whsesUri = `/whses/${whId}/inv/adjustment`;
                const invAdjsCall = await this.Call({Url: whsesUri, method: APIMethods.POST, data: invAdjLoaded});
                if(invAdjsCall['status']){
                    const invAdjResponse: iInventoryAdjustmentAPI = invAdjsCall['data'];
                    invAdjustResponse.push( invAdjResponse );
                }else{
                    throw new Error(`Error: item ${item?.itemCode} not possible to do inventory adjustment in location ${sLocation?.description}`);
                }
            }
        }
        return invAdjustResponse;
    }


    public getSequences = async(Scenario: scenario): Promise<iSequenceAPI[]> => {

        let seqResponse : iSequenceAPI[] = [];

        if(Scenario?.sequences){
            
            const sequenceList: iSequenceAPI[] = await this.listSequences();
            for await (const seq of Scenario?.sequences) {
                const findSeq = sequenceList.find(val => {return val.name==seq.Sequence});
                if(!findSeq){
                    const seqRequest : iSequenceAPI = await this.createSequence({
                        currentValue: seq.Value,
                        name: seq.Sequence,
                        type: seq.Type
                    });
                    seqResponse.push(seqRequest)
                }
            }
        }

        return seqResponse;
    }

    /**
     * Update a given warehouse using API Call
     * @param warehouse: iWarehouseAPI Object
     * @returns iWarehouseAPI object or undefined if there is an error
     */
    private updateWarehouse = async(warehouse: iWarehouseAPI): Promise<iWarehouseAPI|undefined> => {
        let newWarehouse : iWarehouseAPI | undefined = undefined;
        const whsResponse = await this.Call({Url:'/whses', method: APIMethods.PUT, data: warehouse});
        if(whsResponse['status']==200){
            newWarehouse = whsResponse['data'];
        }else{
            throw new Error(`Error: update warehouse: '${warehouse.description}', throw an error = ${whsResponse['status']}`);
        }
        return newWarehouse;
    }

    /**
     * Create a new warehouse using a API call
     * @param warehouse: iWarehouseAPI objec
     * @returns iWarehouseAPI object or undefined if there is an error
     */
    private createWarehouse = async(warehouse:iWarehouseAPI): Promise<iWarehouseAPI|undefined> => {
        let newWarehouse : iWarehouseAPI | undefined = undefined;
        const whsResponse = await this.Call({Url: '/whses', method: APIMethods.POST, data: warehouse});
        if(whsResponse['status']==200){
            newWarehouse = whsResponse['data'];
        }else{
            throw new Error(`Error: create warehouse: '${warehouse.description}', throw an error = ${whsResponse['status']}`);
        }
        return newWarehouse;
    }

    /**
     * search for a given full warehouse data
     * @param warehouseId warehouse Id number
     * @returns  warehosue object
     */
    private searchFullWarehouse = async(warehouseId: number): Promise< iWarehouseAPI | undefined> => {
        let fullWarehouse : iWarehouseAPI | undefined = undefined;

        const warehouseResponse = await this.Call({Url: `/whses/${warehouseId}`, method: APIMethods.GET});
        if(warehouseResponse['status']==200){
            fullWarehouse = warehouseResponse['data'] as iWarehouseAPI;
        }else{
            throw new Error(`Error: search full  warehouse Id: '${warehouseId}', throw an error = ${warehouseResponse['status']}`);
        }
        return fullWarehouse as iWarehouseAPI;
    }

    /**
     * search for a given partial warehouse data
     * @param warehouse: string. Warehouse description or Idenifier 
     * @returns iWarehouseAPI Object or undefined if there is an error
     */
    private searchWarehouse = async(warehouse: string, fullWarehouse: boolean=false) : Promise<iWarehouseAPI|undefined> =>{
        const urlWHParams = `/whses?description=${warehouse}&enabled=1&enabled=0`;
        const result = await this.Call({Url: urlWHParams, method: APIMethods.GET});
        let existWarehouse : iWarehouseAPI | undefined = undefined;
        
        if(result['status']==200){
            const warehouseList : iWarehouseAPI[] = result['data'];
            warehouseList.forEach(value => {
                if(value.description == warehouse){
                    existWarehouse = value;
                }
            });
            if(existWarehouse && fullWarehouse){
                existWarehouse = this.searchFullWarehouse((existWarehouse as iWarehouseAPI).id!) as iWarehouseAPI;
            }
           
         }else{
            throw new Error(`Error: search warehouse: '${warehouse}', throw an error = ${result['status']}`);
        }
        return existWarehouse;
    }

    /**
     * Update a given Account using a API endpoint
     * @param businessPartner object 
     * @returns businessPartnerAPI object or undefined if there is an error
     */
    private updateVendor = async (businessPartner: iBusinessPartnerAPI): Promise<iBusinessPartnerAPI|undefined> =>{
        let account : iBusinessPartnerAPI|undefined = undefined;
        
        const bpResponse = await this.Call({Url:'/bps', method: APIMethods.PUT, data: businessPartner});

        if(bpResponse['status']==200){
            account = bpResponse['data'];
        }else{
            throw new Error(`Error: update vendor:'${businessPartner.description}' , throw an error = ${bpResponse['status']}`);
        }
        return account;
    }
    /**
     * Create a Vendor using a API endpoint
     * @param businessPartner: iBusinessPartnerAPI object with the expected fields
     * @returns iBusinessPartnerAPI object or undefined if there is an error
     */
    private createVendor = async (businessPartner: iBusinessPartnerAPI): Promise<iBusinessPartnerAPI|undefined> =>{
        let account : iBusinessPartnerAPI|undefined = undefined;

        const bpResponse = await this.Call({Url:'/bps', method: APIMethods.POST, data: businessPartner});

        if(bpResponse['status']==200){
            account = bpResponse['data'];
        }else{
            throw new Error(`Error: update vendor:'${businessPartner.description}' , throw an error = ${bpResponse['status']}`);
        }
        return account;
    }
    /**
     * Get full vendor data
     * @param accountId : Vendor ID
     * @returns : iBusinessPartnerAPI object
     */
    private searchFullVendor = async(accountId: number) : Promise<iBusinessPartnerAPI|undefined> =>{
        let fullVendor : iBusinessPartnerAPI | undefined = undefined;

        let fullVendorResponse = await this.Call({Url: `/bps/${accountId}`, method: APIMethods.GET});
        if(fullVendorResponse['status']==200){
            fullVendor = fullVendorResponse['data'] as iBusinessPartnerAPI;
        }else{
            throw new Error(`Error: search full vendor data with ID:'${accountId}' , throw an error = ${fullVendorResponse['status']}`);
        }
        return fullVendor;
    }
    /**
     * Search a given partial vendor data
     * @param account: string. Account Description or accountId
     * @returns iBusinessPartnerAPI object or undefined if there is an error
     */
    private searchVendor = async(account: string, fullData: boolean = true) : Promise<iBusinessPartnerAPI|undefined> => {
        const urlWParams = `/bps?type=1&pageOffset=10&description=${account}&enabled=1&enabled=0&sortColumn:description`;
        const result = await this.Call({Url: urlWParams, method: APIMethods.GET});
        let vendor: iBusinessPartnerAPI | undefined = undefined;
        let fullVendor: iBusinessPartnerAPI | undefined = undefined;
        if(result['status']==200){
            const vendorsList: iBusinessPartnerAPI[] = result['data'];
            vendorsList.forEach(value => {
                if(value.description == account){
                    vendor = value;
                }
            });
            if(vendor && fullData){
               fullVendor = await this.searchFullVendor((vendor as iBusinessPartnerAPI).id!);
            }
        }else{
            throw new Error(`Error: search vendor:'${account}' , throw an error = ${result['status']}`);
        }
        return fullVendor;
    }
    
     /**
     * Search a given Item using an API endpoint
     * @param ItemCode:(string)=> ItemCode
     * @returns ItemAPI object or undefined if there is an error
     */
    private searchItem = async(itemCode: string, fullItem?: boolean) : Promise<iItemAPI | undefined> => {
        
        const itemUri = `/items?enabled=1&enabled=0&type=1&pageSize=10000&pageOffset=1&itemCode=${itemCode}&sortColumn=itemCode`;
        const result = await this.Call({Url: itemUri, method: APIMethods.GET});

        let existItem : iItemAPI | undefined = undefined;
        
        if(result['status']==200){
            const itemList : iItemAPI[] = result['data'];
            itemList.forEach(value => {
                if(value.itemCode == itemCode){
                    existItem = value as iItemAPI;
                }
            });
            
            if(itemList.length>0 && fullItem){
                existItem = existItem! as iItemAPI;
                existItem = await this.searchFullItem(existItem.id!);
            }
        
         }else{
            throw new Error(`Error: search item: '${itemCode}', throw an error = ${result['status']}`);
        }
        return existItem as iItemAPI;
    }

    private searchFullItem = async(itemID: number) : Promise<iItemAPI|undefined> => {
        let fullItem : iItemAPI | undefined = undefined;

        let fullItemResponse = await this.Call({Url: `/items/${itemID}`, method: APIMethods.GET});
        if(fullItemResponse['status']==200){
            fullItem = fullItemResponse['data'] as iItemAPI;
        }else{
            throw new Error(`Error: search full item data with ID:'${itemID}' , throw an error = ${fullItemResponse['status']}`);
        }
        return fullItem;
    }

     /**
     * update a Item using an API endpoint
     * @param item:(iItem) object
     * @returns iItemAPI object or undefined if there is an error
     */
    private updateItem = async(item: iItemAPI): Promise<iItemAPI|undefined> => {
        let iItem : iItemAPI|undefined = undefined;

        const iResponse = await this.Call({Url:'/items', method: APIMethods.PUT, data: item});
        
        if(iResponse['status']==200){
            iItem = iResponse['data'];
        }else{
            throw new Error(`Error: API update-Item:'${item.description}' , throw an error = ${iResponse['status']}`);
        }
        return iItem as iItemAPI; 
    }

    /**
     * update a Item using an API endpoint
     * @param item:(iItem) object
     * @returns iItemAPI object or undefined if there is an error
     */
    private createItem = async(item: iItemAPI): Promise<iItemAPI|undefined> => {
        let itemval : iItemAPI|undefined = undefined;
        const iResponse = await this.Call({Url:'/items', method: APIMethods.POST, data: item});
        if(iResponse['status']==200){
            itemval = iResponse['data'];
        }else{
            throw new Error(`Error: API create - Item:'${item.description}' , throw an error = ${iResponse['status']}`);
        }
        return itemval; 
    }

    /**
     * Search a Storage Location using an API endpoint
     * @param storageIdentifier:(string). Storage Location Identifier
     * @returns iStorageLocationAPI object or undefined if there is an error
     */
    private searchStorageLocation = async(storageIdentifier: string, warehouseId: number): Promise <iStorageLocationAPI | undefined> => {
        const storageUri = `/storage?pageSize=10&enabled=1&enabled=0&storageId=${storageIdentifier}&sortColumn=storageId&warehouseId=${warehouseId}`;
        const result = await this.Call({Url: storageUri, method : APIMethods.GET});
        let slocation : iStorageLocationAPI|undefined = undefined;
        let sLocationFull : iStorageLocationAPI|undefined = undefined;
        if(result['status']==200){
            const storageList: iStorageLocationAPI[] = result['data'];
            storageList.forEach(value => {
                if(value.description == storageIdentifier){
                    slocation = value;
                }
            });
            if(slocation){
                slocation = slocation as iStorageLocationAPI;
                const slocationResponse = await this.Call({Url: `/storage/${slocation.id}`, method: APIMethods.GET});
                if(slocationResponse['status']==200){
                    sLocationFull = slocationResponse['data'] as iStorageLocationAPI;
                }

            }
        }else{
            throw new Error(`Error: search storage location: '${storageIdentifier}', throw an error= ${result['status']}` )
        }
        return sLocationFull;
    }

    /**
     * update a Storage Location using an API endpoint
     * @param storageLocation:(iStorageLocationAPI) object
     * @returns iStorageLocationAPI object or undefined if there is an error
     */
    private updateStorageLocation = async(storageLocation: iStorageLocationAPI): Promise<iStorageLocationAPI|undefined> => {
        let account : iStorageLocationAPI|undefined = undefined;
        const slResponse = await this.Call({Url:'/storage', method: APIMethods.PUT, data: storageLocation});
        if(slResponse['status']==200){
            account = slResponse['data'];
        }else{
            throw new Error(`Error: update-Storage Location:'${storageLocation.description}' , throw an error = ${slResponse['status']}`);
        }
        return account; 
    }

    /**
     * Create a Storage Location using an API endpoint
     * @param storageLocation:iStorageLocationAPI object
     * @returns iStorageLocationAPI object or undefined if there is an error
     */
    private createStorageLocation = async(storageLocation: iStorageLocationAPI): Promise<iStorageLocationAPI|undefined> => {
        let storateResponse : iStorageLocationAPI|undefined = undefined;

        const slResponse = await this.Call({Url:'/storage', method: APIMethods.POST, data: storageLocation});

        if(slResponse['status']==200){
            storateResponse = slResponse['data'];
        }else{
            throw new Error(`Error: Create-Storage Location:'${storageLocation.description}' , throw an error = ${slResponse['status']}`);
        }
        return storateResponse; 
    }

    /**
     * Get the list of sequences
     * @returns sequences array
     */
    private listSequences = async(): Promise<iSequenceAPI[]> => {
        let sequences : iSequenceAPI[] = [];

        const seqResponse = await this.Call({Url: '/sequence', method: APIMethods.GET});
        if(seqResponse['status']==200){
            sequences = seqResponse['data'] as iSequenceAPI[];
        }else{
            throw new Error(`Error: not able to get the list of sequences, error : ${seqResponse['status']}`);
        }
        return sequences;
    }

    /**
     * Create a sequences using API endpoint
     * @returns sequence object
     */
    private createSequence = async(seq: iSequenceAPI): Promise<iSequenceAPI> =>{
        let sequence : iSequenceAPI = {};

        const seqResponse = await this.Call({Url: '/sequence', method: APIMethods.GET});
        if(seqResponse['status']==200){
            sequence = seqResponse['data'] as iSequenceAPI;
        }else{
            throw new Error(`Error: not able to create a sequence, error : ${seqResponse['status']}`);
        }
        return sequence;
    }
}
