import { Component, OnInit } from "@angular/core";
import { EventService } from "@/_services";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { Event } from '@/_models';
import { first } from "rxjs/operators";

@Component({
    selector: 'event-detail',
    templateUrl: 'event-detail.component.html'})
export class EventDetailComponent implements OnInit {
    id: number;
    event: Event;
    oEvent: Observable<Event>;

    constructor(       
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventService
        ) {

    }
    
    ngOnInit() { 
        this.route.queryParams.subscribe(params => {
            this.id = params.id;
            console.log(this.id);
        });

        this.oEvent = this.eventService.getById(this.id);
        
        this.oEvent.pipe(first()).subscribe(data => {
            this.event = data;
        });

    }

    startRegistration(){
        this.router.navigate(['/event confirmation'], {queryParams: {id: this.event.id}});
    }
}