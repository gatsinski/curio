import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StateService {
    public isAuthenticated = false;
    public isStaff = false;
    public apiBaseUrl = 'http://curio.local:8080/api/'
}
