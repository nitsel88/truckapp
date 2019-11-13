import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,  } from '@angular/forms';
import {  AuthenticationService, OrderService } from '@/_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html'
})
export class CreateOrderComponent implements OnInit {
  order: any = {}
  currentUser: any = {}
  myForm : FormGroup

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private orderService: OrderService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

  ngOnInit() {
    this.myForm = new FormGroup({
      'order': new FormGroup({
          'pickupcity': new FormControl('', Validators.required),
          'pickuparea': new FormControl('', Validators.required),
          'dropcity': new FormControl('', Validators.required),
          'droparea': new FormControl('', Validators.required),
          'packageweight': new FormControl('', Validators.required),
          'packageheight': new FormControl('', Validators.required),
          'packagewidth': new FormControl('', Validators.required),
          'packagelength': new FormControl('', Validators.required),
          'orderdesc': new FormControl('', Validators.required),
          'ordercomments': new FormControl('')
      })
  })
  }

  onSubmit() {
    // Process checkout data here
    this.order.userId = this.currentUser.username
    this.order.status = 'open'
    this.order.orderDesc = this.myForm.value.order.orderdesc
    this.order.pickUpDest = {city: this.myForm.value.order.pickupcity, area: this.myForm.value.order.pickuparea}
    this.order.dropDest = {city: this.myForm.value.order.dropcity, area: this.myForm.value.order.droparea}
    this.order.comments = [{id:1, desc: this.myForm.value.order.ordercomments}]

    this.orderService.createOrder(this.order).subscribe((resp)=> {
      if (resp["respCode"] == 0) {
         this.myForm.reset();
         console.log("Order created")
         this.router.navigateByUrl('/');
      }
    })
  }
}
