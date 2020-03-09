import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/black4-common/models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/black4-common/services/authentication.service';
import { UserService } from 'src/black4-common/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    // this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  // deleteUser(id: number) {
  //     this.userService.delete(id).pipe(first()).subscribe(() => {
  //         this.loadAllUsers()
  //     });
  // }

  // private loadAllUsers() {
  //   this.userService.getAllUsers().pipe(first()).subscribe(users => {
  //     this.users = users;
  //   });
  // }
}
