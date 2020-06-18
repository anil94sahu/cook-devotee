import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInUp } from 'ng-animate';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['../../assets/css/style.css', './article.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceInUp, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 15, delay: 0 }
    }))])
  ],
})
export class ArticleComponent implements OnInit {

  bounce: any;

  constructor() { }

  ngOnInit() {
  }

}
