import { AngularFirestore } from '@angular/fire/firestore';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class FirebaseService {
    constructor(private firestore: AngularFirestore) { }

    public get(tableName: string) {
        return this.firestore.collection(tableName).snapshotChanges();
    }

    public getByParam(tableName: string, param: string, Id: string) {
        return this.firestore.collection(tableName).doc(Id).get();
        /* return this.firestore.collection(tableName, ref => ref.where(param, '==', Id))
        .snapshotChanges(); */
    }

    public getByTableParam(tableName: string, param: string, Id: any) {
       return this.firestore.collection(tableName, ref => ref.where(param, '==', Id))
        .snapshotChanges();
    }

    create(tableName: string, body: any) {
        return this.firestore.collection(tableName).add(body);
    }

    update(tableName: string, body: any, docId?: string) {
       return this.firestore.collection(tableName).doc(`${docId}`).set(body, {merge: true});
    }

    delete(tableName: string, Id: number) {
        this.firestore.doc(tableName + Id).delete();
    }

  }
