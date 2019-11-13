import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Config } from './config'
import { Order } from '../_models/order';



@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
  
  constructor(private http: HttpClient) { }
  
  getOrders() {
    return this.http.get<Order[]>(`${Config.url}/orders`);
   }
     
  getOrderForUser(userId) {
    return this.http.get<Order[]>(`${Config.url}/orders/${userId}`);
   }
  
   updateOrder(order) {
    return this.http.put(`${Config.url}/orders/`, order);
   }


   createOrder(order: any) {
    return this.http.post(`${Config.url}/orders/`, order);
  }
}