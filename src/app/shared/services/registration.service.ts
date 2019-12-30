import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import {Injectable, Component} from '@angular/core';
import { ICookModel } from '../models/cook.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class RegistrationService {
    tableName: string = API.RegisterTableName;
    constructor(private fbs: FirebaseService) {

    }

    public getCooks() {
        return this.fbs.get(this.tableName);
    }

    public createCook( cook: any) {
        return this.fbs.create(this.tableName, cook);
    }

    public updateCook(Id: string, cook: ICookModel) {
        return this.fbs.update(this.tableName, cook, Id);
    }

    public delete( Id: number) {
        return this.fbs.delete(this.tableName, Id);
    }
}
