import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Event } from '@/_models';
import { UserService, AuthenticationService, EventService } from '@/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    events: Event[] = [];
    

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private eventService: EventService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllEvents();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    private loadAllEvents() {
        this.eventService.getAll().pipe(first()).subscribe(events => {
            this.events = events;
        });
    }

    goToDetail(id: number){
        this.router.navigate(['/event detail'], {queryParams: {id: id}});
    }
}