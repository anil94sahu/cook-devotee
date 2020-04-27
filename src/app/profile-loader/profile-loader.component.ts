import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageFirebaseService } from '../shared/services/storage.firebase.service';
import { Observable, of } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import {  finalize } from 'rxjs/operators';
@Component({
  selector: 'app-profile-loader',
  templateUrl: './profile-loader.component.html',
  styleUrls: ['./profile-loader.component.css']
})
export class ProfileLoaderComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload = false;
  progress: { percentage: number } = { percentage: 0 };
  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number> = of(0);
  uploadState: Observable<string>;
  url: string;
  @Output() valueChange = new EventEmitter();
  private basePath = '/profilepicture';
  file: any;
  constructor(private afStorage: AngularFireStorage, private toastr: ToastrService) { }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    this.file = file;
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      this.toastr.warning('invalid format!', 'Alert');
    }


  }

  upload() {
    this.currentFileUpload = true;
    this.task = this.afStorage.upload(this.basePath + '/' +  this.file.name, this.file);
    const ref = this.afStorage.ref(this.basePath + '/' + this.file.name);
    this.uploadProgress = this.task.percentageChanges();
    this.task.percentageChanges().subscribe(
      (progress: number) => {
        this.progress.percentage = progress;
      }
    );
    console.log('Image uploaded!');
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => {this.url = url; this.valueChange.emit(url); });
      })
    )
      .subscribe();
  }

}
