import { AngularFirestore } from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from 'firebase/app';
import { ProfilePictureUpload } from '../models/profile.storage.model';
declare var require: any;
const firebase = require('firebase/app');
@Injectable()
export class StorageFirebaseService {

    private basePath = '/profilepicture';
    constructor(private db: AngularFireDatabase) {}

    pushFileToStorage(fileUpload: ProfilePictureUpload, progress: { percentage: number }) {
      const storage = firebase.storage();
      const uploadTask = storage.ref().child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              const snap = snapshot as firebase.storage.UploadTaskSnapshot;
              progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            },
            (error) => {
              console.log(error);
            },
            () => {
              // success
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                fileUpload.url = downloadURL;
                fileUpload.name = fileUpload.file.name;
                this.db.list(`${this.basePath}/`).push(fileUpload);
              });
            }
          );
      }
}
