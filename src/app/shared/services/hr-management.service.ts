import { Injectable } from '@angular/core';
import { API } from '../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import { initialHRData, IHRModel } from '../models/hr.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class HRManagementService {
    tableName: string = API.HRManagementTableName;
    constructor(private fbs: FirebaseService,
                private firestore: AngularFirestore
      ) {

    }

  public  createHireRequst(hireData: IHRModel) {
        // hireData = HRData;
        return this.fbs.create(this.tableName, hireData);
      }

  public getRequestCook(id: string, param: string) {
        return this.fbs.getByTableParam(this.tableName, param, id );
      }

  public getHireRequest(cookId: string, devoteeId: string, cookParam: string, devoteeParam: string) {
    return this.firestore.collection(this.tableName, ref => ref.where(cookParam, '==', cookId)
        .where(devoteeParam, '==', devoteeId))
        .snapshotChanges();
      }

  public updateStatus(serviceId: string, body: any) {
      this.firestore.doc(this.tableName + '/' + serviceId).update(body);
      }

  public deleteHireRequest(Id) {
      this.fbs.delete(this.tableName + '/' , Id);
  }
}
