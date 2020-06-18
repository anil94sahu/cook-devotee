import { Router } from '@angular/router';
import { UtilityService } from './../shared/services/utility.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInLeft } from 'ng-animate';


@Component({
  selector: 'app-category-boxes',
  templateUrl: './category-boxes.component.html',
  styleUrls: ['./category-boxes.component.css', '../rank/rank.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceInLeft, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 10, delay: 0 }
    }))])
  ],
})
export class CategoryBoxesComponent implements OnInit {

  bounce: any;
  cooks = [];
  
  constructor(private adminService: AdminService, private utilityService: UtilityService, private router: Router) { }

  ngOnInit() {
    this.getCooks();
  }

  getCooks() {
    this.adminService.getCooks().subscribe(cooks => {
      const temp = this.utilityService.responsive(cooks);
      const availableCook = temp.filter(e => e.availibility === 'true');
      const sortedCook = availableCook.sort((a, b) => {if (a.photo === '') {return 1; } else { return -1; }});
      this.cooks = sortedCook;
    });
  }

  viewDetails(item, i) {
    this.router.navigate(['/search-cook/cook']);
  }

}
