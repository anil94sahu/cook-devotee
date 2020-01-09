import { Component, OnInit } from '@angular/core';
import { images } from '../shared/constants/image.constant';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  logoImages = images;
  constructor() { }

  ngOnInit() {
  }

}
