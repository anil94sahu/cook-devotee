import { Routing } from './../constants/routing.constant';
import { role } from './../constants/local-storage.constant';
import { IAddress } from './../models/cook.model';
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

    reFrameAddress(address: IAddress) {
      let fullAddress = '';
      if (address.houseNo) {fullAddress += address.houseNo + ` `; }
      if (address.address1) {fullAddress += address.address1 + ` `; }
      if (address.landmark) {fullAddress += address.landmark + ` `; }
      if (address.city) {fullAddress += address.city + ` `; }
      if (address.state) {fullAddress += address.state + ` `; }
      if (address.country) {fullAddress += address.country + ` `; }
      if (address.pincode !== 0) {fullAddress += address.pincode + ` `; }
      return fullAddress;
    }

    getToken() {
      return localStorage.getItem('token');
    }

    getRole() {
      const userRole = parseInt(localStorage.getItem(role), 10);
      const routePage = (userRole === 1) ? Routing.Cook : Routing.Devotee;
      return routePage;
    }

    getLocalStorage(){
      const token = localStorage.getItem('token');
      const userRole = parseInt(localStorage.getItem(role), 10);
      const routePage = (userRole === 1) ? Routing.Cook : Routing.Devotee;
      return {token, userRole, routePage};
    }
}
