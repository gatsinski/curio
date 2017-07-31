import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { UsernameValidators } from './username.validators';
import { AuthService } from './auth.service';
import { StateService } from '../shared/state.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'sign-out',
  template: '',
  providers: [ AuthService, ]
})
export class SignOutComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private stateService: StateService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.authService.signOut().then(result => {
            this.stateService.isAuthenticated = false;
            this.stateService.isStaff = false;
            this._router.navigate(['sign-in']);
        });
    }
}
