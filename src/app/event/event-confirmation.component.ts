import { Component, OnInit } from "@angular/core";
import { Event, User } from '@/_models';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService, AuthenticationService, AlertService } from "@/_services";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { TicketService } from "@/_services/ticket.service";


@Component({templateUrl: 'event-confirmation.component.html'})
export class EventConfirmationComponent implements OnInit {
    id: number;
    event: Event;
    oEvent: Observable<Event>;
    currentUser: User;

    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(       
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private eventService: EventService,
        private authenticationService: AuthenticationService,
        private ticketService: TicketService,
        private alertService: AlertService
        ) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        this.route.queryParams.subscribe(params => {
            this.id = params.id;
            console.log(this.id);
        });

        this.oEvent = this.eventService.getById(this.id);
        
        this.oEvent.pipe(first()).subscribe(data => {
            console.log("hi " + data.id)
            this.event = data;
            console.log("bye " + this.event.name);
        });

        this.registerForm = this.formBuilder.group({
            //eventName: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userEmail: ['', [Validators.required, Validators.email] ],  
            phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')] ],   
            address: ['', Validators.required ],
            adultQuantity: ['', [Validators.required, Validators.min(0), Validators.max(10)]],    
            childQuantity: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
        });

       // this.registerForm.addControl('eventName', new FormControl('yobruh'));


    }

     // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        //this.registerForm.get['firstName'].markAsDirty();
        //this.registerForm.get['firstName'].markAsTouched();
        this.submitted = true;
        this.registerForm.addControl('eventName', this.formBuilder.control(this.event.name));
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
  
        this.loading = true;
        this.ticketService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/event confirmed'], {queryParams: {email: this.registerForm.controls['userEmail'].value, event: this.event.name}});
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

}


 
   
    
