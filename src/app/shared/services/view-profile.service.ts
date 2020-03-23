import { IStateModel, defaultState } from './../models/state.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import { UtilityService } from './utility.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ViewProfileService {

    private behave = new BehaviorSubject<IStateModel>(defaultState);
    tableName: string = API.RegisterTableName;

    constructor(private fbs: FirebaseService,
                private utilityService: UtilityService) {

    }

    public getProfileById(role: number, id: string) {
        const tableName = this.utilityService.chooseTableName(role as number);
        return this.fbs.getByParam(tableName, API.Id, id );
    }

    setState(behave: IStateModel) {
            this.behave.next(behave);
        }

    getState(): Observable<IStateModel> {
        return this.behave.asObservable();
    }

}
