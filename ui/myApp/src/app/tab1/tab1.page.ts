import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';
import {OrderService} from '../services/order/order.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  orders:Order[];
  constructor(private orderService:OrderService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrders();
  }

  getOrders() {
     // this.orderService.getOrders().pipe(map(res => this.orders = res))

     this.orderService.getOrders().subscribe((data)=> {
      this.orders = data;
     })
    }

}
