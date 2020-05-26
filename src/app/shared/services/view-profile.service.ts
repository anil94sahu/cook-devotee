import { IStateModel, defaultState } from './../models/state.model';
import { Injectable } from '@angular/core';
import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import { UtilityService } from './utility.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
            this.utilityService.setState(behave);
            this.behave.next(behave);
        }

    getState(): Observable<IStateModel> {
    if (this.utilityService.getState()) {
       return of(this.utilityService.getState());
    } else {
       return this.behave.asObservable();
    }
    //     return this.behave.asObservable();
    }

    getListOfRegisteredCook(param) {
        const tableName = 'register';
        return  this.fbs.getByTableParam(tableName, 'emailId', param );
    }

}
