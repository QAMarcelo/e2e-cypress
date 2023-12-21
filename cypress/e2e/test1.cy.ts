import { DVU, Dialogs, Login, Menu, RF, ReceivingOrders, WEB } from "../src"
import { Initializer, Keys, UniqueValue } from "../src/utils";
import { NJTelnet } from "../src/utils/telnet";


describe('template spec', () => {

  beforeEach( () => {
    cy.intercept({resourceType: /xhr|fetch/}, { log: false});
    new Initializer().Load({
      CredentialGroup: 'TRIAL'
    });
    //Init.Load({});
  })

  it.only('passes', async () => {    
 
    Login().Email().SetText(WEB.user);
    Login().Next().Click();
    Login().Password().SetText(WEB.password);
    
    Login().Database().SelectByText(WEB.database);
    Login().Login().Click();

    // if the Select warehouse dialog is displayed then close it
    if( Dialogs().WareHouse().Exists() )
    {
        Dialogs().WareHouse().selectWarehouse().SelectByText("<5> Renewal");
        Dialogs().WareHouse().OK().Click();
    }

    //within the menu go to Consolidated Bill of Lading
    Menu().ReceivingOrders.GoTo();
    ReceivingOrders().Toolbar().Insert().SelectValue(1); 
    ReceivingOrders().CreateReceivingOrder().Account().Find().Search('Renewal');
    ReceivingOrders().CreateReceivingOrder().OrderNumber().SetText(UniqueValue({text: 'ON01'}));
    ReceivingOrders().CreateReceivingOrder().Save().Click();

    ReceivingOrders().CreateReceivingOrder().SideMenu().LineEntries().Click();
    ReceivingOrders().CreateReceivingOrder().LineEntries().Toolbar().Insert().Click();
    ReceivingOrders().CreateReceivingOrder().LineEntries().GeneralPanel().ItemCode().Search('R-Item');
    ReceivingOrders().CreateReceivingOrder().LineEntries().GeneralPanel().QtyPlanned().SetNumber(10);
    ReceivingOrders().CreateReceivingOrder().LineEntries().GeneralPanel().Insert().Click();

    ReceivingOrders().CreateReceivingOrder().SideMenu().General().Click();
    ReceivingOrders().CreateReceivingOrder().Status().SelectByText('In Process');
    ReceivingOrders().CreateReceivingOrder().Save().Click();
    ReceivingOrders().CreateReceivingOrder().CloseDialog().Click();
    //Login().Login().Click();


    let RFTelnet = new NJTelnet();
    await RFTelnet.Connect();

    await  RFTelnet.Send("1");
    await  RFTelnet.Send(RF.user);
    await RFTelnet.Send(RF.password); //password
    await RFTelnet.Send("11"); //database
    await RFTelnet.Send("14"); //warehouse
    await RFTelnet.Send("3"); //Receiving
    await RFTelnet.Send("1"); //Existing Receipt
    await RFTelnet.Send("1"); //By Order Number
    await RFTelnet.Send("1"); // Order 1
    //RF.Send("1"); // Continue
    await RFTelnet.Send("R-Receiving"); // Staging Location
    await RFTelnet.Send("3"); // Select the Item
    await RFTelnet.Send("10"); // Enter Qty on LPN
    await RFTelnet.Send(Keys.ESC);// pres ESC to return to the order
    await RFTelnet.Send(Keys.ESC);// pres ESC to exit the order
    await RFTelnet.Send("2");// Complete he order
    await RFTelnet.Send("m");// Complete he order
    await RFTelnet.Send("6");// Complete he order
    await RFTelnet.End();
  })
}) //cy.get(.k-state-active receiving).find(.k-toolbar)