
import { MenuItem } from "./menuItem";

export class menu { 

    // First Level
    // public Orders : MenuItem;
    //     public BillofLading: MenuItem;
    //         public ConsolidatedBillOfLading: MenuItem;
    //         public MasterBillOfLading: MenuItem;
    //     public ShippingOrders: MenuItem;
    //     public PurchaseOrders: MenuItem;
    //     public ReceivingOrders: MenuItem;
    //     public WorkOrders: MenuItem;

    // public Warehouse : MenuItem;
    //     public BarcodeScanningTasks: MenuItem;
    //         public PickingTasks: MenuItem;
    //         public ReceivingTasks: MenuItem;
    //         public PutAwayTasks: MenuItem;
    //         public WorkOrderTasks: MenuItem;
    //     public CartonStock: MenuItem;
    //     public Cartonization:MenuItem;
    //     public InventoryByLPN: MenuItem;
    //     public InventoryByLocation: MenuItem;
    //     public ItemIventory: MenuItem;
    //     public Items_SKUs: MenuItem;
    //     public KitInventory: MenuItem;
    //     public Kits_BOM: MenuItem;
    //     public PrintQueue: MenuItem;
    //     public Printers: MenuItem;
    //     public ScanPack: MenuItem;
    //     public StorageLocationGroups: MenuItem;
    //     public StorageLocationsByAccount: MenuItem;
    //     public UPCCodes: MenuItem;
    //     public WavePickTickets: MenuItem

    // public Transportation : MenuItem;
    //     public Dispatch: MenuItem;
    //     public Loads: MenuItem;
    //     public Shipments: MenuItem;
    //     public RateTariffs: MenuItem;
    //     public CarrierQuoteHistory: MenuItem;
    //     public PendingQuotes: MenuItem;
    //     public ServiceLanes: MenuItem;

    // public Yard : MenuItem;
    //     public Equipment: MenuItem;
    //     public YardAppointments: MenuItem;
    //     public YardLocations: MenuItem;

    // public BusinessPartners : MenuItem;
    //     public Accounts: MenuItem;
    //     public Carriers: MenuItem;
    //     public Customers: MenuItem;
    //     public Shippers: MenuItem;
    //     public Suppliers: MenuItem;

    // public Channels : MenuItem;
    //     public IntegrationStore: MenuItem;
    //     public OutboundChannel: MenuItem;
    //     public ReceivingChannel: MenuItem;
    //     public ShippingChannel: MenuItem;

    // public AccountingIntegration: MenuItem;
    //     public Invoicing: MenuItem;

    // public Settings: MenuItem;
    //     public setting_Cartonization: MenuItem;
    //         public CartonizationRules: MenuItem;
    //         public CartonizationItemGroups: MenuItem;
    //     public Setting_Exceptions: MenuItem;
    //     public Setting_Hazmat: MenuItem;
    //     public Setting_ReportAdmin: MenuItem;
    //     public Setting_ReportFiles: MenuItem;
    //     public Setting_Security: MenuItem;
    //         public Security_Users: MenuItem;
    //         public Security_Drivers: MenuItem;
    //         public Security_UserGroups: MenuItem;
    //     public Setting_Sequences: MenuItem;
    //     public Setting_ServiceClasses: MenuItem;
    //     public Setting_SessionManagement: MenuItem;
    //     public Setting_SystemDocuments: MenuItem;
    //     public Setting_SystemParemeters: MenuItem;
    //     public Setting_WarehouseTerminal: MenuItem;

    // public Reports: MenuItem;
    //     public ReportDesigner: MenuItem;
    //     public ReportsList : MenuItem;
        
    // public Import: MenuItem;

    // public Dahsboard: MenuItem;
    //     public SmallParcelErrors: MenuItem;
    //     public UserMessages: MenuItem;

    // public NeedHelp: MenuItem;

    constructor() { 
    }
        public Orders = new MenuItem('Orders', null);
            public BillofLading = new MenuItem('Bill of Lading', this.Orders);
                public ConsolidatedBillOfLading = new MenuItem('Consolidated Bill Of Lading', this.BillofLading);
                public MasterBillOfLading = new MenuItem('Master Bill Of Lading', this.BillofLading);
            public ShippingOrders = new MenuItem('Shipping Orders', this.Orders);
            public PurchaseOrders = new MenuItem('Purchase Orders', this.Orders);
            public ReceivingOrders = new MenuItem('Receiving Orders', this.Orders);
            public WorkOrders = new MenuItem('Work Orders', this.Orders);

        public Warehouse = new MenuItem('Warehouse');
            public BarcodeScanningTasks = new MenuItem('Barcode Scanning Tasks', this.Warehouse);
                public PickingTasks = new MenuItem('Picking Tasks', this.BarcodeScanningTasks);
                public ReceivingTasks = new MenuItem('Receiving Tasks', this.BarcodeScanningTasks);
                public PutAwayTasks = new MenuItem('Put Away Tasks', this.BarcodeScanningTasks);
                public WorkOrderTasks = new MenuItem('Work Order Tasks', this.BarcodeScanningTasks);
            public CartonStock = new MenuItem('Carton Stock', this.Warehouse);
            public Cartonization = new MenuItem('Cartonization', this.Warehouse);
            public InventoryByLPN = new MenuItem('Inventory By LPN', this.Warehouse);
            public InventoryByLocation = new MenuItem('Inventory By Location', this.Warehouse);
            public ItemIventory = new MenuItem('Item Inventory', this.Warehouse);
            public Items_SKUs = new MenuItem('Items / SKUs', this.Warehouse);
            public KitInventory = new MenuItem('Kit Inventory',  this.Warehouse);
            public Kits_BOM = new MenuItem('Kits / BOM', this.Warehouse);
            public PrintQueue = new MenuItem('Print Queue', this.Warehouse);

        public Transportation = new MenuItem('Transportation');
            public Dispatch= new MenuItem('Dispatch', this.Transportation);
            public Loads= new MenuItem('Loads', this.Transportation);
            public Shipments= new MenuItem('Shipments', this.Transportation);
            public RateTariffs= new MenuItem('Rate Tariffs', this.Transportation);
            public CarrierQuoteHistory= new MenuItem('Carrier Quote History', this.Transportation);
            public PendingQuotes= new MenuItem('Pending Quotes', this.Transportation);
            public ServiceLanes= new MenuItem('Service Lanes', this.Transportation);

        public Yard = new MenuItem('Yard');
            public Equipment = new MenuItem('Equipment', this.Yard);
            public YardAppointments = new MenuItem('Yard Appointments', this.Yard);
            public YardLocations = new MenuItem('Yard Locations', this.Yard);

        public BusinessPartners = new MenuItem('Business Partners');
            public Accounts = new MenuItem('Accounts', this.BusinessPartners);
            public Carriers = new MenuItem('Carriers', this.BusinessPartners);
            public Customers = new MenuItem('Customers', this.BusinessPartners);
            public Shippers = new MenuItem('Shippers', this.BusinessPartners);
            public Suppliers = new MenuItem('Suppliers', this.BusinessPartners);

        public Channels = new MenuItem('Channels');
            public IntegrationStore =new MenuItem('Integration Store', this.Channels);
            public OutboundChannel =new MenuItem('Outbound Channel', this.Channels);
            public ReceivingChannel =new MenuItem('Receiving Channel', this.Channels);
            public ShippingChannel =new MenuItem('Shipping Channel', this.Channels);

        public AccountingIntegration = new MenuItem('Accounting Integration');
            public Invoicing = new MenuItem('Invoicing', this.AccountingIntegration);

        public Settings = new MenuItem('Settings');
            public setting_Cartonization =new MenuItem('Cartonization', this.Settings);
                public CartonizationRules =new MenuItem('Cartonization Rules', this.setting_Cartonization);
                public CartonizationItemGroups =new MenuItem('Cartonization Item Groups', this.setting_Cartonization);
            public Setting_Exceptions =new MenuItem('Exceptions', this.Settings);
            public Setting_Hazmat =new MenuItem('Hazmat', this.Settings);
            public Setting_ReportAdmin =new MenuItem('Report Admin', this.Settings);
            public Setting_ReportFiles =new MenuItem('Report Files', this.Settings);
            public Setting_Security =new MenuItem('Security', this.Settings);
                public Security_Users =new MenuItem('Users', this.Setting_Security);
                public Security_Drivers =new MenuItem('Drivers', this.Setting_Security);
                public Security_UserGroups =new MenuItem('User Groups', this.Setting_Security);
            public Setting_Sequences =new MenuItem('Sequences', this.Settings);
            public Setting_ServiceClasses =new MenuItem('Service Classes', this.Settings);
            public Setting_SessionManagement =new MenuItem('Session Management', this.Settings);
            public Setting_SystemDocuments =new MenuItem('System Documents', this.Settings);
            public Setting_SystemParemeters = new MenuItem('System Parameters', this.Settings);
            public Setting_WarehouseTerminal =new MenuItem('Warehouse-Terminal', this.Settings);

        public Reports = new MenuItem('Reports');
            public ReportDesigner = new MenuItem('Report Designer', this.Reports);
            public ReportList = new MenuItem('Reports list', this.Reports);

        public Import = new MenuItem('Import');

        public Dahsboard = new MenuItem('Dahsboard');
            public SmallParcelErrors = new MenuItem('Small Parcel Errors', this.Dahsboard);
            public UserMessages = new MenuItem('User Messages', this.Dahsboard);
            
        public NeedHelp = new MenuItem('Need Help?');
       
}