import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/black4-common/guards/auth.guard';
import { LoginComponent } from './users/login/login.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthorShowComponent } from './authors/author-show/author-show.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';


const routes: Routes = [
  // { path: 'home', component: HomeComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'authors', component: AuthorListComponent,
    // children: [
    //   {
    //     path: ':id/edit',
    //     component: AuthorEditComponent
    //   }
    // ],
  },
  { path: 'authors/:id/show', component:  AuthorShowComponent },
  { path: 'authors/:id/edit', component:  AuthorEditComponent },
  { path: 'users', component: UserListComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
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
