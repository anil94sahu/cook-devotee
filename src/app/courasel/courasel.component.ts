import { offlineCouraselImages } from './../shared/constants/image.constant';
import { Component, OnInit } from '@angular/core';
import { baseHref } from '../shared/constants/config.constant';
import { images } from '../shared/constants/image.constant';
import { offline } from '../shared/constants/utility.constant';

@Component({
  selector: 'app-courasel',
  templateUrl: './courasel.component.html',
  styleUrls: ['./courasel.component.css']
})
export class CouraselComponent implements OnInit {

  public baseHref = baseHref;
  offline = offline;
  couraselImages = (this.offline) ? images : offlineCouraselImages;
  constructor() { }

  ngOnInit() {
  }

}
