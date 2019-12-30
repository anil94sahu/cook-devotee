import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import { UtilityService } from './utility.service';

@Injectable({providedIn: 'root'})
export class ViewProfileService {
    tableName: string = API.RegisterTableName;
    constructor(private fbs: FirebaseService,
                private utilityService: UtilityService) {

    }

    public getProfileById(role: number, id: string) {
        const tableName = this.utilityService.chooseTableName(role as number);
        return this.fbs.getByParam(tableName, API.Id, id );
    }
}
