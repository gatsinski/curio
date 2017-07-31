import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QuestionDetailComponent } from './questions/question-detail.component';
import { QuestionsComponent } from './questions/questions.component';
import { SignInComponent } from './authentication/sign-in.component';
import { SignOutComponent } from './authentication/sign-out.component';
import { SignUpComponent } from './authentication/sign-up.component';
import { AuthGuard } from './shared/auth-guard.service';
import { DashboardGuard } from './shared/dashboard-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard, DashboardGuard]  // TODO: Restrict access to non-admin users
  },
  {
    path: 'question/:id',
    component: QuestionDetailComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [ AuthGuard ]
  },
  { path: 'sign-in',  component: SignInComponent },
  { path: 'sign-out',  component: SignOutComponent },
  { path: 'sign-up',  component: SignUpComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
