export class Event {
    id: number;
    name: string;
    description: string;
    category: string;
    startDate: Date;
    endDate: Date;
    location: string;
    registrationAllowed: boolean;
    eventImage: string;
    adultTicketPrice: number;
    childTicketPrice: number;
    token: string;
}