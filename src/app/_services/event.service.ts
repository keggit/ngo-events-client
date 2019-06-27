import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '@/_models';

@Injectable({ providedIn: 'root' })
export class EventService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Event[]>(`${config.apiUrl}/events`);
    }

    getById(id: number) {
        return this.http.get<Event>(`${config.apiUrl}/events/${id}`);
    }

    register(event: Event) {
        return this.http.post(`${config.apiUrl}/events/register`, event);
    }

    update(event: Event) {
        return this.http.put(`${config.apiUrl}/events/${event.id}`, event);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/events/${id}`);
    }
}