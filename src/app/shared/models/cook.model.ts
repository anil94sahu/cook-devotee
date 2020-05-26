import { FormControl, FormArray, FormGroup } from '@angular/forms';

export interface ICookModel {
    name: string | FormControl;
    address: IAddress  | FormGroup;
    mobileNo: number | FormControl;
    altMobileNO: number | FormControl;
    password: string | FormControl;
    photo: string | FormControl;
    married: string | FormControl;
    specialist: string | FormControl;
    description: string | FormControl;
    salary: number | FormControl;
    age: number | FormControl;
    study: string | FormControl;
    emailId: string | FormControl;
    availibility: Date | FormControl;
    availibilityDate?: Date | FormControl;
    role: string | FormControl;
    workExperience: IWorkExperience[] | FormArray;
    userId: string | FormControl;
    centerName?: string | FormControl;
    PMName?: string | FormControl;
}

export interface IAddress {
    houseNo: string | FormControl;
    address1: string | FormControl;
    landmark: string | FormControl;
    city: string | FormControl;
    state: string | FormControl;
    country: string | FormControl;
    pincode: number | FormControl;
}

export interface IWorkExperience {
    centerName: string | FormControl;
    address: string | FormControl;
    periodOfWork: Date | FormControl;
    comment: string | FormControl;
    PMName: string | FormControl;
    PMMobile: number | FormControl;
    PMEmailId: string | FormControl;
    KIName: string | FormControl;
    KIMobile: number | FormControl;
    KIEmailId: string | FormControl;
    salary: number | FormControl;
    status: number | FormControl;
}

export const initialAddress: IAddress = {
        houseNo: '100, bada gaon',
        address1: 'gate bahar narayan bagh road',
        landmark: 'natraj marriage garden',
        city: 'kolkata',
        state: 'WB',
        country: 'India',
        pincode: 1
};

export const initialCook: ICookModel = {
    name: 'Vidhan pr',
    userId: '',
    password: 'cook',
    address: initialAddress,
    mobileNo: 8382049026,
    altMobileNO: 9621100823,
    photo: 'assets/images/about/govinda.jpg',
    married: 'single',
    specialist: 'noodles, manchurain',
    description: 'work in isckon gita life around 2 hours',
    salary: 10000,
    age: 29,
    study: 'B.sc',
    emailId: 'vidhan94@gmail.com',
    availibility: new Date(),
    role: 'cook',
    workExperience: [{
    centerName: 'Voice pune',
    address: '',
    periodOfWork: new Date(),
    comment: '',
    PMName: '',
    PMEmailId: '',
    KIEmailId: '',
    PMMobile: 8382049026,
    KIName: '',
    KIMobile: 8382049026,
    salary: 10000,
    status: 1,
    }],
};
