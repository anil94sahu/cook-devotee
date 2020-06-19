import { LoaderService } from './../shared/services/loader.service';
import { UtilityService } from './../shared/services/utility.service';
import { HomeService } from './../shared/services/home.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInLeft, bounceInRight, bounceOut} from 'ng-animate';
@Component({
  selector: 'app-latest-from-blog',
  templateUrl: './latest-from-blog.component.html',
  styleUrls: ['./latest-from-blog.component.css', './../rank/rank.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceInLeft, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 5, delay: 0 }
    }))]),
    trigger('bounceInRight', [transition('* => *', useAnimation(bounceInRight, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 5, delay: 0 }
    }))])
  ],
})
export class LatestFromBlogComponent implements OnInit {

  recipes = [];
  bounce: any;
  bounceInRight: any;
  animate = false;
  constructor(private homeService: HomeService, private loaderService: LoaderService, private utilityService: UtilityService, ) {
   }

  ngOnInit() {
    this.getReceipe();
  }

  animation(event) {
    this.animate = event.visible;
  }

  getReceipe() {
    this.loaderService.show();
    this.homeService.getAllReceipe().subscribe(cooks => {this.loaderService.hide();
                                                         const arr = this.utilityService.responsive(cooks);
                                                         this.recipes = [...arr]; },
                                                err => {
                                                  this.loaderService.hide();
                                                });
  }

}
