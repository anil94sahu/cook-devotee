import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageFirebaseService } from '../shared/services/storage.firebase.service';
import { ProfilePictureUpload } from '../shared/models/profile.storage.model';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import {  finalize } from 'rxjs/operators';
@Component({
  selector: 'app-profile-loader',
  templateUrl: './profile-loader.component.html',
  styleUrls: ['./profile-loader.component.css']
})
export class ProfileLoaderComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: ProfilePictureUpload;
  progress: { percentage: number } = { percentage: 0 };
  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadState: Observable<string>;
  url: string;
  @Output() valueChange = new EventEmitter();
  private basePath = '/profilepicture';
  file: any;
  constructor(private storageFbs: StorageFirebaseService, private afStorage: AngularFireStorage) { }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    this.file = file;
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }


  }

  upload() {
    const task = this.afStorage.upload(this.basePath, this.file);
    const ref = this.afStorage.ref(this.basePath);
    this.uploadProgress = task.percentageChanges();
    console.log('Image uploaded!');
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => (this.url = url));
        this.valueChange.emit(this.url);
      })
    )
      .subscribe();
  }

}
