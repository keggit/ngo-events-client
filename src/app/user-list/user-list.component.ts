import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
//todo: dont let an admin delete their own account
@Component({ templateUrl: 'user-list.component.html' })
export class UserListComponent implements OnInit{
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private userService: UserService, 
        private router: Router,
        private authenticationService: AuthenticationService,
        ) {
            this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                this.currentUser = user;
                console.log(this.currentUser.token);
            });
        }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    editUser(id: number){
        this.router.navigate(['/user edit'], {queryParams: {id: id}});
        /*this.userService.getById(id).pipe(first()).subscribe((data) => {
            console.log(data);
            this.loadAllUsers()
        });*/
    }

    addUser(){
        this.router.navigate(['/user add']);
    }



    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}