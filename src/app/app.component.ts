import { Component, OnInit } from '@angular/core';
import { User } from 'src/black4-common/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/black4-common/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Black 4';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
