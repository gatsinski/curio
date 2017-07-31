import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { StateService } from './state.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public stateService: StateService,
        private _router: Router
    ) {}

    canActivate() {
        if (this.stateService.isAuthenticated) {
            return true;
        }

        this._router.navigate(['sign-in']);

        return false;
    }
}
