import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import {Injectable, Component} from '@angular/core';
import { ILoginModel } from '../models/login.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Role } from '../constants/utility.constant';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root',
  })
export class LoginService {
    tableName: string = API.RegisterTableName;
    DevoteetableName: string = API.DevoteeRegisterTableName;
    constructor(private fbs: FirebaseService, public afs: AngularFirestore,
                private utilityService: UtilityService) {

    }

    login(userData: ILoginModel) {
      const tableName = this.utilityService.chooseTableName( userData.role as number);
      return this.afs.collection(tableName, ref => ref.where(API.EmailId, '==', userData.emailId)
      .where(API.Role, '==', userData.role))
      .snapshotChanges();
    }

    updateUserId(role: number, docId: string, body: any) {
      const tableName = this.utilityService.chooseTableName(role) + '/';
      return this.fbs.update(tableName, body, docId);
    }


}
