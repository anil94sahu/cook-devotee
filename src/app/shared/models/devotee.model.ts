import { FormControl, FormGroup } from '@angular/forms';
import { ICookModel, initialCook, IAddress, initialAddress } from './cook.model';

export interface IDevoteeModel {
    name: string | FormControl;
    password: string | FormControl;
    mobileNo: string | FormControl;
    centerName: string | FormControl;
    PMName: string | FormControl;
    role: string | FormControl;
    emailId: string | FormControl;
    description: string | FormControl;
    address: IAddress  | FormGroup;
    cook?: ICookModel | FormGroup;
    photo: string | FormControl;
}


export const initialDevotee: IDevoteeModel = {
    name: 'Ansuman pr',
    password: 'Admin@12345',
    mobileNo: '8790564234',
    centerName: 'Gitalife',
    PMName: 'HG Smarth krishna pr',
    role: 'devotee',
    emailId: 'hk94@gmail.com',
    description: 'Wonderful prasadam with salary 10000',
    address: initialAddress,
    cook: initialCook,
    photo: ''
};
