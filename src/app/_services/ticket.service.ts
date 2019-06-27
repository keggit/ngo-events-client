import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ticket } from '@/_models';

@Injectable({ providedIn: 'root' })
export class TicketService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Ticket[]>(`${config.apiUrl}/tickets`);
    }

    getById(id: number) {
        return this.http.get<Ticket>(`${config.apiUrl}/tickets/${id}`);
    }

    getByEmailAndEvent(email: string, event: string) {
        return this.http.get<Ticket>(`${config.apiUrl}/tickets/emailevent/${email}`);
    }

    register(ticket: Ticket) {
        return this.http.post(`${config.apiUrl}/tickets/register`, ticket);
    }

    update(ticket: Ticket) {
        return this.http.put(`${config.apiUrl}/tickets/${ticket.id}`, ticket);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/tickets/${id}`);
    }
}