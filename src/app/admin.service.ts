import { API } from './shared/constants/apis.constant';
import { FirebaseService } from './shared/services/crud.firebase.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private fbs: FirebaseService) { }

  getCooks() {
    const tableName = API.RegisterTableName;
    return this.fbs.get(tableName);
  }

  getDevotees() {
    const tableName = API.DevoteeRegisterTableName;
    return this.fbs.get(tableName);
  }

  removeCook(id) {
    const tableName = `${API.RegisterTableName}/`;
    return this.fbs.delete(tableName, id);
  }

  removeDevote(id) {
    const tableName = API.DevoteeRegisterTableName;
    return this.fbs.delete(tableName, id);
  }

  editCook(id, body) {
    const tableName = API.RegisterTableName;
    return this.fbs.update(tableName, body, id);
  }

  editDevotee(id, body) {}
}
