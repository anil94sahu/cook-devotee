import { UtilityService } from 'src/app/shared/services/utility.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  arr = [];
  
  constructor(private adminService: AdminService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.getCooks();
  }

  getCooks() {
    this.adminService.getCooks().subscribe(cooks => this.arr = this.utilityService.responsive(cooks));
  }

  delete(id){
    confirm('Are you sure you want to delete');
    this.adminService.removeCook(id);
  }

  getDevotees() {
    this.adminService.getDevotees().subscribe(cooks => this.arr = this.utilityService.responsive(cooks));
  }

}
