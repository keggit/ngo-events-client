import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { UserListComponent, UserAddComponent } from './user-list';
import { EventRegistrationComponent } from './event/event-register.component';
import { EventListComponent, EventEditComponent, EventDetailComponent, EventConfirmationComponent, EventConfirmedComponent } from './event';
import { UserEditComponent } from './user-list/user-edit.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserListComponent,
        EventRegistrationComponent,
        EventListComponent,
        EventEditComponent,
        UserAddComponent,
        UserEditComponent,
        EventDetailComponent,
        EventConfirmationComponent,
        EventConfirmedComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }