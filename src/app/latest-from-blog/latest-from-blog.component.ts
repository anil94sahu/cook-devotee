import { LoaderService } from './../shared/services/loader.service';
import { UtilityService } from './../shared/services/utility.service';
import { HomeService } from './../shared/services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-from-blog',
  templateUrl: './latest-from-blog.component.html',
  styleUrls: ['./latest-from-blog.component.css', './../rank/rank.component.scss']
})
export class LatestFromBlogComponent implements OnInit {

  recipes = [];
  constructor(private homeService: HomeService, private loaderService: LoaderService, private utilityService: UtilityService, ) {
   }

  ngOnInit() {
    this.getReceipe();
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
