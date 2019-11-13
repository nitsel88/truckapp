import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Order} from '@/_models';
import { UserService, AuthenticationService, OrderService } from '@/_services';

@Component({ templateUrl: 'home.component.html',
selector: 'app-home' })
export class HomeComponent implements OnInit {
    currentUser: User;
    orders: Order[]; 


    constructor(
        private authenticationService: AuthenticationService,
        private orderService: OrderService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadOrdersForUser()
    }

    private loadOrdersForUser() {
        this.orderService.getOrderForUser(this.currentUser.username).subscribe((data)=> {
            this.orders = data
        })

    }
}