import { Component } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { StateService } from './shared/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, ]
})
export class AppComponent {
    title = 'Curio';

    constructor (public stateService: StateService) { }

    get isAuthenticated() {
        return this.stateService.isAuthenticated;
    }

    get isStaff() {
        return this.stateService.isStaff;
    }
}
