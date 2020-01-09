import { Component, OnInit } from '@angular/core';
import { baseHref } from '../shared/constants/config.constant';
import { images } from '../shared/constants/image.constant';

@Component({
  selector: 'app-courasel',
  templateUrl: './courasel.component.html',
  styleUrls: ['./courasel.component.css']
})
export class CouraselComponent implements OnInit {

  public baseHref = baseHref;
  couraselImages = images;
  constructor() { }

  ngOnInit() {
  }

}
