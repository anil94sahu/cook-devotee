import { Component, OnInit } from '@angular/core';
import { section_images } from '../shared/constants/image.constant';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  section_images = section_images;
  constructor() { }

  ngOnInit() {
  }

}
