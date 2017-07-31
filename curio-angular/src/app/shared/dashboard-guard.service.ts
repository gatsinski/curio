import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StateService } from './state.service';

@Injectable()
export class DashboardGuard implements CanActivate {

    constructor(public stateService: StateService) {}

    canActivate() {
        if (this.stateService.isStaff) {
            return true;
        }

        return false;
    }
}
