import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cook-devotee';
  public onlineOffline: boolean = navigator.onLine;

  constructor() {
    // alert(this.onlineOffline? 'you are online': 'you are offline');
  }
}
