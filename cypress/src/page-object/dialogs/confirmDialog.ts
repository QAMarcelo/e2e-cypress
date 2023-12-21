import { Button } from "../../basic-objects";
import { BaseDialog } from "./baseDialog";


export class ConfirmDialog extends BaseDialog{

    public Cancel =()=> new Button(this._Container.find('.k-actions button').contains('Cancel'));
    public Close =()=> new Button(this._Container.find('.k-actions button').contains('Close'));
    public SaveAndClose =()=> new Button(this._Container.find('.k-actions button').contains('Save & Close'));

}