export interface IStateModel {
    name: true | false | 'disable';
    address: true | false | 'disable';
    mobileNo: true | false | 'disable';
    altMobileNO: true | false | 'disable';
    password: true | false | 'disable';
    photo: true | false | 'disable';
    married: true | false | 'disable';
    specialist: true | false | 'disable';
    description: true | false | 'disable';
    salary: true | false | 'disable';
    age: true | false | 'disable';
    study: true | false | 'disable';
    emailId: true | false | 'disable';
    availibility: true | false | 'disable';
    role: true | false | 'disable';
    workExperience: true | false | 'disable';
    userId: true | false | 'disable';
    centerName?: true | false | 'disable';
    PMName?: true | false | 'disable';
    data?: any;
    url?: string;
}


export const defaultState: IStateModel = {name: true , address: true , mobileNo: true , altMobileNO: true ,
    password: true , photo: true , married: true , specialist: true , description: true , salary: true , age: true ,
    study: true , emailId: true , availibility: true , role: true , workExperience: true , userId: true, url: 'cook',
centerName: false , PMName: false };
