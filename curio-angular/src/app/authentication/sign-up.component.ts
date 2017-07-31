import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { UsernameValidators } from './username.validators';
import { AuthService } from './auth.service';
import { StateService } from '../shared/state.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.css' ],
  providers: [AuthService]
})
export class SignUpComponent {
    form = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            UsernameValidators.cannotContainSpace
        ]),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        repeatedPassword: new FormControl('', Validators.required),
    });


    constructor(
        private authService: AuthService,
        public stateService: StateService,
        private _router: Router
    ) { }

    signUp() {
        this.authService.signUp(
            this.username.value,
            this.email.value,
            this.password.value).then(response => {
                if (response['success']) {
                    this.stateService.isAuthenticated = true;
                    this._router.navigate(['questions']);
                } else {
                    if (response['errors']['username']) {
                        this.username.setErrors({
                            invalidUsername: response['errors']['username']
                        });
                    }

                    if (response['errors']['password']) {
                        this.password.setErrors({
                            invalidPassword: response['errors']['password']
                        });
                    }

                    if (response['errors']['email']) {
                        this.email.setErrors({
                            invalidEmail: response['errors']['email']
                        });
                    }
                }
            });


    }

    get username() {
        return this.form.get('username');
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    get repeatedPassword() {
        return this.form.get('repeatedPassword');
    }

}
