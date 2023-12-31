// Generated by https://quicktype.io

import { iItemStorageChargeAPI } from "./iBusinessPartnerAPI";

export interface iItemAPI {
    id?:                         number;
    enabled?:                    number;
    type?:                       number;
    category?:                   number;
    itemCode?:                   string;
    description?:                string;
    valuePerEach?:               number;
    pickStyle?:                  number;
    pickOffset?:                 number;
    cycleCountEnable?:           number;
    cycleCountStyle?:            number;
    orderFreq?:                  number;
    trackingStyleEnable?:        number;
    trackingStyleSn?:            number;
    si?:                         string;
    tempRangeMax?:               number;
    tempRangeMin?:               number;
    trackAdvFv0ModeShip?:        number;
    trackAdvFv1ModeShip?:        number;
    trackAdvFv2ModeShip?:        number;
    trackAdvFv3ModeShip?:        number;
    trackAdvFv4ModeShip?:        number;
    trackAdvFv5ModeShip?:        number;
    trackAdvFv6ModeShip?:        number;
    trackAdvFv7ModeShip?:        number;
    trackAdvFv8ModeShip?:        number;
    trackAdvFv9ModeShip?:        number;
    trackAdvFv0ModeRecv?:        number;
    trackAdvFv1ModeRecv?:        number;
    trackAdvFv2ModeRecv?:        number;
    trackAdvFv3ModeRecv?:        number;
    trackAdvFv4ModeRecv?:        number;
    trackAdvFv5ModeRecv?:        number;
    trackAdvFv6ModeRecv?:        number;
    trackAdvFv7ModeRecv?:        number;
    trackAdvFv8ModeRecv?:        number;
    trackAdvFv9ModeRecv?:        number;
    trackingStyleContainer?:     number;
    trackingStyleExpdate?:       number;
    trackingStyleLot?:           number;
    trackingStyleQuaranReldate?: number;
    trackingStyleSnReverse?:     number;
    trackingStyleUserdef?:       number;
    trackingStyleWeight?:        number;
    vendorId?:                   number;
    uomId?:                      number;
    uom?:                        iItemUOMAPI;
    kitSubItems?:                any[];
    upcs?:                       iItemUPCAPI[];
    itemWarehouses?:             any[];
    replenishmentPlans?:         any[];
    vendorBrief?:                File;
    userDefined?:                {};
    buildable?:                  number;
    file?:                       File;
    vendor?:                     {};
    aliases?:                    any[];
    events?:                     iItemEventAPI[];
    storageLocations?:           iItemStorageChargeAPI[];
    nmfcCode?:                   iItemFileAPI;
    hazmat?:                     iItemFileAPI;
    storageCharge?:              iItemStorageChargeAPI;
    inboundStorage?:             iItemInboundHandlingAPI;
    inboundHandling?:            iItemInboundHandlingAPI;
    outboundShipping?:           iItemInboundHandlingAPI;
}

export interface iItemEventAPI {
    id?:             number;
    eventType?:      number;
    eventClass?:     number;
    eventClassType?: number;
    userid?:         {};
    dtEnd?:          string;
    sval?:           string;
}

// export enum Userid {
//     Adminapi1TrialWdgcorpCOM = "adminapi1-trial@wdgcorp.com",
//     Adminqa1TrialWdgcorpCOM = "adminqa1-trial@wdgcorp.com",
// }

export interface iItemFileAPI {
}

export interface iItemInboundHandlingAPI {
    ranges?:        any[];
    tieredBilling?: boolean;
}


export interface iItemUOMAPI {
    id?:                   number;
    caseAbbrev?:           string;
    caseDepth?:            number;
    caseDescription?:      string;
    caseHasInnerpack?:     number;
    caseHeight?:           number;
    caseTare?:             number;
    caseWeight?:           number;
    caseWidth?:            number;
    defaultOuom?:          number;
    eaAbbrev?:             string;
    eaCaseQty?:            number;
    eaDepth?:              number;
    eaDescription?:        string;
    eaHeight?:             number;
    eaTare?:               number;
    eaWeight?:             number;
    eaWidth?:              number;
    ipAbbrev?:             string;
    ipCaseQty?:            number;
    ipDepth?:              number;
    ipDescription?:        string;
    ipHeight?:             number;
    ipTare?:               number;
    ipWeight?:             number;
    ipWidth?:              number;
    itemId?:               number;
    palletAbbrev?:         string;
    palletDepth?:          number;
    palletDescription?:    string;
    palletHeight?:         number;
    palletHigh?:           number;
    palletMaxStackWeight?: number;
    palletTare?:           number;
    palletTie?:            number;
    palletWeight?:         number;
    palletWidth?:          number;
    style?:                number;
    vendorId?:             number;
}

export interface iItemUPCAPI {
    id?:              number;
    lotCode?:         string;
    sublotCode?:      string;
    upc?:             string;
    itemDescription?: string;
    itemId?:          number;
    item?:            {};
}

// export interface Item {
//     cartonizationGroup:  File;
//     enabled:             number;
//     trackAdvFv0ModeShip: number;
//     trackAdvFv1ModeShip: number;
//     trackAdvFv2ModeShip: number;
//     trackAdvFv3ModeShip: number;
//     trackAdvFv4ModeShip: number;
//     trackAdvFv5ModeShip: number;
//     trackAdvFv6ModeShip: number;
//     trackAdvFv7ModeShip: number;
//     trackAdvFv8ModeShip: number;
//     trackAdvFv9ModeShip: number;
//     trackAdvFv0ModeRecv: number;
//     trackAdvFv1ModeRecv: number;
//     trackAdvFv2ModeRecv: number;
//     trackAdvFv3ModeRecv: number;
//     trackAdvFv4ModeRecv: number;
//     trackAdvFv5ModeRecv: number;
//     trackAdvFv6ModeRecv: number;
//     trackAdvFv7ModeRecv: number;
//     trackAdvFv8ModeRecv: number;
//     trackAdvFv9ModeRecv: number;
//     uom:                 File;
//     kitSubItems:         any[];
//     upcs:                any[];
//     itemWarehouses:      any[];
//     replenishmentPlans:  any[];
//     vendorBrief:         File;
//     userDefined:         File;
//     file:                File;
//     vendor:              ItemVendor;
//     aliases:             any[];
//     events:              any[];
//     storageLocations:    any[];
//     nmfcCode:            File;
//     hazmat:              File;
//     storageCharge:       StorageCharge;
//     inboundStorage:      InboundHandling;
//     inboundHandling:     InboundHandling;
//     outboundShipping:    InboundHandling;
// }

// export interface iItemVendorAPI {
//     attributes:            any[];
//     chargeCodes:           any[];
//     notes:                 any[];
//     scripts:               any[];
//     itemStorageCharges:    any[];
//     autoChargeCodes:       any[];
//     shippingPreDefTitles:  File;
//     receivingPreDefTitles: File;
//     workOrderPreDefTitles: File;
//     shipmentPreDefTitles:  File;
//     defaultBillings:       any[];
//     events:                any[];
//     nmfcCodes:             any[];
//     scriptMaps:            any[];
//     attributeMaps:         any[];
//     monthlyBillings:       any[];
//     carrierFees:           any[];
//     files:                 any[];
//     rateMultipliers:       any[];
//     serviceLanes:          any[];
//     carrierRoutes:         any[];
//     proSettings:           any[];
// }

// export interface iItemUserDefinedAPI {
//     id:     number;
//     itemId: number;
//     ft0:    string;
//     fv0:    string;
//     ft1:    string;
//     fv1:    string;
//     ft2:    string;
//     fv2:    string;
//     ft3:    string;
//     fv3:    string;
//     ft4:    string;
//     fv4:    string;
//     ft5:    string;
//     fv5:    string;
//     ft6:    string;
//     fv6:    string;
//     ft7:    string;
//     fv7:    string;
//     ft8:    string;
//     fv8:    string;
//     ft9:    string;
//     fv9:    string;
// }

// export interface iItemAPIVendor {
//     id:                    number;
//     accountid:             string;
//     description:           string;
//     enabled:               number;
//     mcountry:              string;
//     mstate:                string;
//     rateMultiplier:        number;
//     scountry:              string;
//     sstate:                string;
//     type:                  number;
//     attributes:            Attribute[];
//     chargeCodes:           any[];
//     notes:                 any[];
//     scripts:               any[];
//     itemStorageCharges:    any[];
//     autoChargeCodes:       any[];
//     shippingPreDefTitles:  PreDefTitles;
//     receivingPreDefTitles: PreDefTitles;
//     workOrderPreDefTitles: PreDefTitles;
//     shipmentPreDefTitles:  ShipmentPreDefTitles;
//     defaultBillings:       any[];
//     events:                Event[];
//     nmfcCodes:             any[];
//     scriptMaps:            any[];
//     attributeMaps:         any[];
//     monthlyBillings:       any[];
//     carrierFees:           any[];
//     files:                 any[];
//     rateMultipliers:       any[];
//     serviceLanes:          any[];
//     carrierRoutes:         any[];
//     proSettings:           any[];
// }

// export interface Attribute {
//     id:                number;
//     businessPartnerId: number;
//     attribute:         number;
//     ival:              number;
//     dval:              number;
//     sval:              string;
//     aval:              any[];
// }

// export interface PreDefTitles {
//     id:       number;
//     vendorId: number;
//     type:     number;
// }

// export interface ShipmentPreDefTitles {
//     id:       number;
//     vendorId: number;
// }
