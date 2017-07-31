import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { StateService } from '../shared/state.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private stateService: StateService
    ) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    signIn(username: string, password: string): Promise<JSON> {
        let apiUrl = this.stateService.apiBaseUrl + 'authentication/sign-in/';
        let options = new RequestOptions({ headers: this.headers, withCredentials: true });
        return this.http
            .post(
                apiUrl,
                JSON.stringify({username: username, password: password}),
                options
            ).toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    signUp(username: string, email: string, password: string): Promise<JSON> {
        let apiUrl = this.stateService.apiBaseUrl + 'authentication/sign-up/';
        return this.http
            .post(
                apiUrl,
                JSON.stringify({
                    username: username,
                    email: email,
                    password: password}),
                {headers: this.headers}
            ).toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    signOut(): Promise<String> {
        let apiUrl = this.stateService.apiBaseUrl + 'authentication/sign-out/';
        return this.http
            .post(
                apiUrl,
                JSON.stringify({}),
                {headers: this.headers}
            ).toPromise()
            .then(result => result.json() as String)
            .catch(this.handleError);
    }

}
