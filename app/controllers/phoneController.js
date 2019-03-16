import Controller from './index';
import Phone from '../models/phoneModel';


export default class PhoneController extends Controller {
    async generateNumbers({body}, res){
        this.validate(body, {
          NumberstoGenerate: 'required|number'
        })

    

    
    }
}