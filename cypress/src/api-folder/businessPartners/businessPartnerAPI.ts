import { attributeAPI } from "./bpsAttributeAPI";
import { ChargeCodeAPI } from "./bpsChargeCodeAPI";
import { StorageChargeAPI } from "./bpsStorageChargeAPI";

export interface BusinessPartnerAPI {
    Id?: number,
    Vendor? : string,
    Description?: string,
    Enable?: boolean,
    RateMultiplier?: number,
    Type?: number,
     /** 
     * @example Attributes: { General_Properties: {allocation_mode: true}, Receiving: { Barcode_Scanning_style: Receiving_BarcodeScanningStyles.Line, Barcode_Scanning: true }, Billing: {...} }
    */
    Attributes?: attributeAPI,
    /** 
     * @example StorageCharges: [ {Type: StorageCharge_Types.Inner_Pack_or_Equivalent, Description: 'XXX'}, {...} ]
    */
    StorageCharges?: StorageChargeAPI[],
    /** 
     * @example ChargeCodes: [ {Code: 'XXX', Description: 'XXX'}, {...} ]
    */
    ChargeCodes?: ChargeCodeAPI[],
    /** 
     * @example Mailing_address: {Address1: 'dir 1', Address2: 'dir 2', City:'somewhere'}
    */
    Mailing_address?: {
        Address1?: string,
        Address2?: string,
        City?: string,
        Postal_Code?:string,
        Country?: string,
        state?: string,
    }
     /** 
     * @example Shipping_Address: {Use_Mailing_Address: true, Address1: 'dir 1', City:'somewhere'}
    */
    Shipping_Address?: {
        Use_Mailing_Address?: boolean,
        Address1?: string,
        Address2?: string,
        City?: string,
        Postal_Code?:string,
        Country?: string,
        state?: string,
    }
}
