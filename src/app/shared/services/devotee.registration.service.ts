import { Injectable } from '@angular/core';
import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import { IDevoteeModel } from '../models/devotee.model';

@Injectable()
export class DevoteeRegistrationService {
    tableName: string = API.DevoteeRegisterTableName;
    constructor(private fbs: FirebaseService) {

    }

    public getDevotees() {
        return this.fbs.get(this.tableName);
    }

    public createDevotee( devotee: any) {
        return this.fbs.create(this.tableName, devotee);
    }

    public updateDevotee(Id: string, devotee: IDevoteeModel) {
        return this.fbs.update(this.tableName, devotee, Id);
    }

    public delete( Id: number) {
        return this.fbs.delete(this.tableName, Id);
    }
}
