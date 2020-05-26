import { Component, OnInit } from '@angular/core';
import { images } from '../shared/constants/image.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  logoImages = images;

  constructor() { }

  ngOnInit() {
  }

}
