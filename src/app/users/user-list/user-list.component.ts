import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/black4-common/services/user.service';
import { User } from 'src/black4-common/models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .pipe(
        first())
      .subscribe(users => {
        this.users = users;
      })
  }

}
