import { Component, OnInit } from '@angular/core';
import { StorageFirebaseService } from '../shared/services/storage.firebase.service';
import { ProfilePictureUpload } from '../shared/models/profile.storage.model';

@Component({
  selector: 'app-profile-loader',
  templateUrl: './profile-loader.component.html',
  styleUrls: ['./profile-loader.component.css']
})
export class ProfileLoaderComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: ProfilePictureUpload;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private storageFbs: StorageFirebaseService) { }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new ProfilePictureUpload(file);
    this.storageFbs.pushFileToStorage(this.currentFileUpload, this.progress);
    console.log(this.currentFileUpload);
  }

}
