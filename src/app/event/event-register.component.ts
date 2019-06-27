import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, EventService, AuthenticationService } from '@/_services';

@Component({templateUrl: 'event-register.component.html'})
export class EventRegistrationComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private eventService: EventService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
       // if (this.authenticationService.currentUserValue) { 
         //   this.router.navigate(['/']);
       // }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
            startDate: ['', [Validators.required, Validators.pattern('[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]')] ],  //date
            endDate: ['', [Validators.required, Validators.pattern('[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]')] ],    //date
            location: ['', Validators.required ],
            registrationAllowed: [false],    //bool
            eventImage: ['', Validators.required ],
            adultTicketPrice: ['', Validators.required ],   //num
            childTicketPrice: ['', Validators.required ],   //num

        });
    }

    error:any = {isError:false,errorMessage:''};

    compareTwoDates(){
     if(new Date(this.registerForm.controls['endDate'].value) < new Date(this.registerForm.controls['startDate'].value)){
      this.error={isError:true,errorMessage:'End Date before start date'};
     }
    }   

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.compareTwoDates();
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.eventService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/event list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
