import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { QuestionDetailComponent } from './questions/question-detail.component';
import { QuestionSearchComponent } from './questions/question-search.component';
import { DashboardComponent } from './dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { SignInComponent } from './authentication/sign-in.component';
import { SignOutComponent } from './authentication/sign-out.component';
import { SignUpComponent } from './authentication/sign-up.component';


import { QuestionService } from './questions/question.service';
import { AuthService } from './authentication/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { DashboardGuard } from './shared/dashboard-guard.service';
import { StateService } from './shared/state.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    QuestionDetailComponent,
    QuestionSearchComponent,
    QuestionsComponent,
    SignInComponent,
    SignOutComponent,
    SignUpComponent
  ],
  providers: [ QuestionService,
               AuthService,
               AuthGuard,
               DashboardGuard,
               StateService,
               {provide: XSRFStrategy,
                useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')}
              ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
