import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Event } from '@/_models';
import { AlertService, EventService, AuthenticationService } from '@/_services';
import { BehaviorSubject, Observable } from 'rxjs';
import { setFlagsFromString } from 'v8';
import { detectChanges } from '@angular/core/src/render3';

@Component({
    selector: 'event-edit',
    templateUrl: 'event-edit.component.html'})
export class EventEditComponent implements OnInit {
    id: number;
    dataLoaded: boolean;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    events: Event[] = [];
    event: Event = {
        id: 1,
        name: "placeholder",
        description: "g",
        category: "?",
        startDate: new Date(),
        endDate: new Date(),
        location: "g",
        registrationAllowed: true,
        eventImage: "g",
        adultTicketPrice: 4,
        childTicketPrice: 2,
        token: "dfv"
    };

    evento: Observable<Event>;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private eventService: EventService,
        private alertService: AlertService,
    ) { 
        this.dataLoaded = false;
        // redirect to home if already logged in
       // if (this.authenticationService.currentUserValue) { 
         //   this.router.navigate(['/']);
       // }
    }

    ngOnInit() { 
        //this.id = parseInt(sessionStorage.getItem("id"), 10);
        //console.log(this.id);


        this.route.queryParams.subscribe(params => {
            this.id = params.id;
            console.log(this.id);
        });

        this.evento = this.eventService.getById(this.id);

        this.evento.pipe(first()).subscribe(data => {
            console.log(data);
            //this.event = new Event
            this.event = data;
            console.log(this.event);
         });

        console.log(this.event);
        

        this.registerForm = this.formBuilder.group({
            id: [this.id + ''],
            name: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
            startDate: ['', Validators.required ],  //date
            endDate: ['', Validators.required ],    //date
            location: ['', Validators.required ],
            registrationAllowed: [false],    //bool
            eventImage: ['', Validators.required ],
            adultTicketPrice: ['', Validators.required ],   //num
            childTicketPrice: ['', Validators.required ],   //num
        });  
    }



    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        //this.eventService.update(this.event).pipe(first()).subscribe();
        this.eventService.update(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Changes successful', true);
                    this.router.navigate(['/event list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
