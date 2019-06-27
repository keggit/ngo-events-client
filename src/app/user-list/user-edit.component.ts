import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AlertService, UserService, AuthenticationService } from '@/_services';
import { BehaviorSubject, Observable } from 'rxjs';
import { setFlagsFromString } from 'v8';
import { detectChanges } from '@angular/core/src/render3';

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html'})
export class UserEditComponent implements OnInit {
    id: number;
    dataLoaded: boolean;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    users: User[] = [];
    user: User;

    userto: Observable<User>;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
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
        })

        this.userto = this.userService.getById(this.id);

        this.userto.pipe(first()).subscribe(data => {
            console.log(data);
            this.user = data;
            console.log(this.user);
         });

        console.log(this.user);
        

        this.registerForm = this.formBuilder.group({
            id: [this.id + ''],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['', Validators.required ]
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
        this.userService.update(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Changes successful', true);
                    this.router.navigate(['/user list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
