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
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ["ROLE_ADMIN"],
      canActivateChild: [AuthGuard],
      children: [
        // {
        //   path: '',
        //   pathMatch: 'full',
        //   component: AdminComponent
        // },
        // {
        //   path: 'categories',
        //   component: CategoriesComponent
        // },
      ]
    },
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'authors',
    children: [
      {
        path: '',
        component: AuthorListComponent,
      },
      {
        path: ':id/show',
        component: AuthorShowComponent
      },
      {
        path: ':id/edit',
        component: AuthorEditComponent
      },
      {
        path: 'new/edit',
        component: AuthorEditComponent
      }
    ],
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: ':id/account',
        component: UserProfileComponent,
      },
      // {
      //   path: ':id/edit',
      //   component: AuthorEditComponent
      // },
      // {
      //   path: 'new/edit',
      //   component: AuthorEditComponent
      // }
    ],
  },

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
