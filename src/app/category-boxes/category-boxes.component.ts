import { Router } from '@angular/router';
import { UtilityService } from './../shared/services/utility.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-boxes',
  templateUrl: './category-boxes.component.html',
  styleUrls: ['./category-boxes.component.css', '../rank/rank.component.scss']
})
export class CategoryBoxesComponent implements OnInit {

  cooks = [];
  constructor(private adminService: AdminService, private utilityService: UtilityService, private router: Router,) { }

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

  viewDetails(item, i){
    this.router.navigate(['/search-cook/cook']);
  }

}
