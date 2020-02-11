import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/black4-common/guards/auth.guard';
import { LoginComponent } from './users/login/login.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { UserListComponent } from './users/user-list/user-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent
  // , canActivate: [AuthGuard] 
},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'users', component: UserListComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
