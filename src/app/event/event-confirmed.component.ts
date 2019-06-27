import { Component, OnInit } from "@angular/core";
import { AuthenticationService, TicketService, EventService } from "@/_services";
import { User, Ticket, Event } from "@/_models";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

//bad name, too similar to eventconfirmationcomponent
@Component({templateUrl: 'event-confirmed.component.html'})
export class EventConfirmedComponent implements OnInit {
    email: string;
    eventName: string;
    //oTicket: Observable<Ticket>;
    ticket: Ticket;
    tickets: Ticket[] = [];
    events: Event[] = [];
    currentUser: User;

    constructor(      
        private ticketService: TicketService,
        private eventService: EventService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
        ){
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        this.route.queryParams.subscribe(params => {
            this.email = params.email;
            this.eventName = params.event;
        });

        this.ticketService.getAll().pipe(first()).subscribe(tickets => {
           // this.tickets = tickets;
            this.tickets = tickets.filter(ticket => ticket.eventName == this.eventName && ticket.userEmail == this.email);
            this.ticket = tickets[0];
            console.log(this.ticket.userEmail + "glkkdfnvlkn");
            console.log(this.tickets);
        });

        this.eventService.getAll().pipe(first()).subscribe(events => {
            this.events = events.filter(event => event.name == this.eventName);
        })

        


       /*this.oTicket = this.ticketService.getByEmailAndEvent(this.email, this.eventName);
        
        console.log(this.oTicket);

        this.oTicket
        this.ticketService.getByEmailAndEvent(this.email, this.eventName).pipe(first()).subscribe(data => {
            console.log('data'+ data);
            this.ticket = data;
            console.log('ticket ' + this.ticket);
        });*/
    }

}