import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(private utilityService: UtilityService, private toastr: ToastrService) {}

  canActivate() {
        const token = this.utilityService.getToken();
        if (token) {
            return true;
        } else {
            this.toastr.info('please login first', 'info');
            return false;
        }
  }
}
