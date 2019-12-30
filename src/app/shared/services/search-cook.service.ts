import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';

@Injectable({providedIn: 'root'})
export class SearchCookService {
    tableName: string = API.RegisterTableName;
    constructor(private fbs: FirebaseService) {

    }

    public getCooks() {
        return this.fbs.get(this.tableName);
    }
}
