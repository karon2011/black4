import { Component, OnInit } from '@angular/core';
import { User } from 'src/black4-common/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/black4-common/services/authentication.service';
import { Role } from 'src/black4-common/models/role';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Black 4';
  currentUser: User;
  isAdmin = false;

  // public admin = new BehaviorSubject<boolean>(true); // {1}

  // get isAdmin() {
  //   return this.admin.asObservable(); // {2}
  // }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.authenticationService.currentUser
      .subscribe(x => {
        console.log("x", x);
        this.currentUser = x;
        if (this.currentUser) {
          if (this.currentUser.roles.includes('ROLE_ADMIN')) {
            console.log("yes Admin !");
            
            this.isAdmin = true;
            // this.admin.next(false);
          }
          else console.log("not Admin !!!");
          // this.isAdmin = false;
        }
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  // get isAdmin() {
  //   // isAdmin() {
  //   this.authenticationService.currentUser
  //     .subscribe(x => {
  //       // console.log("x.token", x.token);
  //       this.currentUser = x;
  //       if (this.currentUser.token) {
  //         let jwtData = this.currentUser.token.split('.')[1];
  //         let decodedJwtJsonData = window.atob(jwtData)
  //         let decodedJwtData = JSON.parse(decodedJwtJsonData)
  //         console.log("decodedJwtData.roles.includes('ROLE_ADMIN') ?", decodedJwtData.roles.includes('ROLE_ADMIN'));

  //         if (!decodedJwtData.roles.includes('ROLE_ADMIN')) {
  //           return false;
  //         }
  //       }

  //       // let isAdmin = decodedJwtData['ROLE_ADMIN'];
  //       // console.log("isAdmin", isAdmin);
  //       // else
  //       //   return true;
  //     });
  //   return true;
  // }


}
