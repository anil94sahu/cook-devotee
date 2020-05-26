import { API } from './../constants/apis.constant';
import { FirebaseService } from './crud.firebase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private fbs: FirebaseService) { }

  public saveReceipe( body: any) {
    const tableName = API.Receipe + '/';
    return this.fbs.create(tableName, body);
  }

  public getAllReceipe() {
    const tableName = API.Receipe + '/';
    return this.fbs.get(tableName);
  }

}
