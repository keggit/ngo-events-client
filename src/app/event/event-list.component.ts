import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Event } from '../_models';
import { EventService } from '../_services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({templateUrl: 'event-list.component.html'})
export class EventListComponent implements OnInit {
    events: Event[] = [];
    event: Event;
    constructor(private eventService: EventService, private router: Router) {}

    ngOnInit() {
        this.loadAllEvents();
    }

    loadAllEvents(){
        this.eventService.getAll().pipe(first()).subscribe(events => { 
            this.events = events; 
        });
    }

    addEvent() {
        this.router.navigate(['/event']);
    }

    editEvent(id: number) {
        
        //console.log(id + " " + this.eventService.getById(id));
        //sessionStorage.setItem("id", id + "");
        this.router.navigate(['/event edit'], {queryParams: {id: id}});
    }

    /*editEvent(event: Event){
        this.eventEditService.setEvent(event);
        this.router.navigate(['/event edit']);
    }*/

    deleteEvent(id: number) {
        this.eventService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllEvents()
        });
    }
}