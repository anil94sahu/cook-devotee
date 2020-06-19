import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInRight, bounceInUp } from 'ng-animate';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceInRight, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 2, delay: 0 }
    }))]),
    trigger('bounceRight', [transition('* => *', useAnimation(bounceInUp, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 4, delay: 0 }
    }))])
  ],
})
export class AboutComponent implements OnInit {

  extend = false;
  animate = false;
  bounce: any;
  bounceRight: any;
  constructor() { }

  ngOnInit() {
  }

  readMore(value){
    this.extend = value;
  }

  animation(event) {
    this.animate = event.visible;
  }

}
