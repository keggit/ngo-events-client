import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { UserListComponent, UserAddComponent } from './user-list';
import { EventRegistrationComponent } from './event/event-register.component';
import { EventListComponent, EventEditComponent, EventDetailComponent, EventConfirmationComponent, EventConfirmedComponent } from './event';
import { UserEditComponent } from './user-list/user-edit.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user list', component: UserListComponent, data: { roles: ['admin'] } },
    { path: 'user add', component: UserAddComponent},
    { path: 'user edit', component: UserEditComponent},
    { path: 'event list', component: EventListComponent, data: { roles: ['admin'] } },
    { path: 'event', component: EventRegistrationComponent},
    { path: 'event edit', component:EventEditComponent},
    { path: 'event detail', component: EventDetailComponent},
    { path: 'event confirmation', component: EventConfirmationComponent},
    { path: 'event confirmed', component: EventConfirmedComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);