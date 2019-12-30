import { Injectable } from '@angular/core';
import { FirebaseService } from './crud.firebase.service';
import { API } from '../constants/apis.constant';
import { Role } from '../constants/utility.constant';

@Injectable({providedIn: 'root'})
export class UtilityService {
    constructor(private fbs: FirebaseService) { }

    chooseTableName(role: number) {
        const temp = role;
        let tableName = API.RegisterTableName;
        switch (temp) {
          case Role.cook:
              tableName = API.RegisterTableName;
              break;
          case Role.devotee:
              tableName = API.DevoteeRegisterTableName;
              break;
          default:
            break;
        }
        return tableName;
      }

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }
}
