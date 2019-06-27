export class Ticket {
    id: number;
    userEmail: string;
    eventName: string;
    firstName: string;  //including first and last name is bad design, because it is inherited from User
    lastName: string;
    phone: string;
    address: string;
    adultQuantity: number;
    childQuantity: number;
    token: string;
}