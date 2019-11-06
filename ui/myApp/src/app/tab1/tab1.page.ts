import {Component, NgZone} from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Order } from '../models/order';
import {OrderService} from '../services/order/order.service';

const MEDIA_FILES_KEY = 'recordings';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  available:boolean = false
  hasPermission:boolean = false
  recording:boolean = false
  buttoncolor:string = "medium"
  orderButtonColor:String = "primary"
  matches:string[] = []
  orders:Order[]
  selectedOrder:Order
  options = {
    language:"en-US",
    matches:5,
    prompt:"Hello driver, Say Something",      // Android only
    showPopup:false,  // Android only
    showPartial:false 
  }
  constructor(private zone:NgZone, private orderService:OrderService, private speechRecognition: SpeechRecognition) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrders()
  }

  ionViewDidLoad() {

  }

  voiceCommand() {
  this.speechRecognition.isRecognitionAvailable()
  .then((available: boolean) => {
    this.available = available

    this.speechRecognition.requestPermission()
    .then(() =>  {
      this.recording = true
      this.buttoncolor = "danger"
      this.speechRecognition.startListening(this.options).subscribe(
        (matches) => {
          this.zone.run(()=>{
            this.recording = false
            this.buttoncolor = "medium"
            this.matches = matches
          })
       },
       (onerror) => { 
        this.zone.run(()=>{
          console.log('error:', onerror) 
          this.recording = false
          this.buttoncolor = "medium"
          this.matches.length = 0
          this.matches.push("Talk Again - not proper") 
        })
       },
       () => {
        this.recording = false
        this.buttoncolor = "medium"
       }
      )
    },
    () => console.log('Permission Denied')
  )
  })
  }
 
  setButtonColor(order) {
    if (order.status == "accepted") {
      this.orderButtonColor = "success"
    } else if (order.status == "picked") {
      this.orderButtonColor = "warning"
    } else {
      this.orderButtonColor = "primary"
    }
  }

  getOrders() {
     this.orderService.getOrders().subscribe((data)=> {
      this.orders = data
     })
    }

    selectOrder(order) {
      if (order.status == "accepted") {
         this.pickUpOrder(order)
      } else if (order.status == "open") {
        order.status = "accepted"
        order.driverId = "1"
        this.setButtonColor(order)
      }           
    }

    
    pickUpOrder(order) {
      order.status = "picked"
      this.setButtonColor(order)
    }

    
}
