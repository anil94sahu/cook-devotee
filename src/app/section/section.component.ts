import { offlineSectionImages } from './../shared/constants/image.constant';
import { Component, OnInit } from '@angular/core';
import { section_images } from '../shared/constants/image.constant';
import { offline } from '../shared/constants/utility.constant';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  offline = offline;
  sectionImages = (this.offline) ? section_images : offlineSectionImages;
  constructor() { }

  ngOnInit() {
  }

}
