
import { BaseObject } from "./baseObject";
import { Label } from "./label";

export class Checkbox extends BaseObject{

    // public text : Label;

    public Text =()=> new Label(this._Container.find('label'));
    // public Init(selector: Cypress.Chainable): this {
    //     super.Init(selector);
    //     this.text = new Label().Init(this._alias.find('label'));
    //     return this;
    // }

    public check(checked: boolean): void{
        this._Container.find('input').click();
    }

    public isChecked(): boolean {
        return Boolean(this._Container.find('input').invoke('attr', 'ng-reflect-model').then(attr => { return attr=='1'}));
    }
}