import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { UsernameValidators } from './username.validators';
import { AuthService } from './auth.service';
import { StateService } from '../shared/state.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [ './sign-in.component.css' ],
  providers: [AuthService, ]
})
export class SignInComponent {
    form = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            UsernameValidators.cannotContainSpace
        ]),
        password: new FormControl('', Validators.required)
    });


    constructor(
        public stateService: StateService,
        private authService: AuthService,
        private _router: Router
    ) { }

    signIn() {
        this.authService.signIn(
            this.username.value,
            this.password.value
        ).then(response => {
            if (response['success']) {
                this.stateService.isAuthenticated = true;
                if (response['is_staff']) {
                    this.stateService.isStaff = true;
                }
                this._router.navigate(['questions']);
            } else {
                this.form.setErrors({invalidLogin: true});
            }
        });
    }

    get username() {
        return this.form.get('username');
    }

    get password() {
        return this.form.get('password');
    }

}
