import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../services/apis/users-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ UsersApiService ]
})

export class UsersComponent implements OnInit {
  users: any;

  constructor(
    private usersApiService: UsersApiService
  ) { }

  ngOnInit() {
    this.usersApiService.getUsers().subscribe(res => {
      this.users = res['users'];
    });
  }
}