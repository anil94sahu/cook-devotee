import { FormControl } from '@angular/forms';

export interface ILoginModel {
    emailId: string | FormControl;
    password: string | FormControl;
    mobileNo: number | FormControl;
    role?: number | FormControl;
}
