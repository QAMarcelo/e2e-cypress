
import { BaseObject } from "./baseObject";


export class TextBox extends BaseObject{

   constructor(selector: Cypress.Chainable){
      super(selector);
  }
   public SetText(text: string): void{
      this._Container.type(text);
   }
}
