import {Component, NgZone} from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
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
  order:Order
  actions: { id: number, command: string, reply: string, success?:string, failure?:string }[] = [
    { "id": 0, "command": "accept order", "reply":"okay, accepting order"},
    { "id": 1, "command": "pickup order", "reply":"okay, picking up order" },
    { "id": 2, "command": "complete order", "reply":"sure, Marking the order as delivered" },
    { "id": 3, "command": "reject order", "reply":"Alright, rejecting the order" },
    { "id": 4, "command": "add comment", "reply":"adding comment"},
    { "id": 5, "command": "refresh orders", "reply":"refreshing orders", "success": "you have one new order", "failure":"you have no orders"}
  ];
  
  options = {
    language:"en-US",
    matches:5,
    prompt:"Hello driver, Say Something",      // Android only
    showPopup:false,  // Android only
    showPartial:false 
  }
  
  constructor(private zone:NgZone, private orderService:OrderService, private speechRecognition: SpeechRecognition, private tts: TextToSpeech) {}

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
       //valid speech recognized
        (matches) => {
          this.zone.run(()=>{
            this.recording = false
            this.buttoncolor = "medium"    
            //find the matching action from list of actions
               let action = this.actions.find(action => {
                 return matches.indexOf(action["command"]) !== -1;
               })
                if (action) {
                  //There is a matching action
                   let speakObj = {text: action["reply"], locale: 'en-US', rate: 0.80}
                   this.tts.speak(speakObj).then(() => {

                     switch(action["id"]) { 
                       case 0: {
                           this.acceptOrder(this.order)
                           break
                       }
                       case 1: {
                           this.pickUpOrder(this.order)
                           break
                       }
                       case 2: {   
                          this.completeOrder(this.order)                   
                           break
                       }
                       case 3: {   
                          this.rejectOrder(this.order)                   
                           break
                       }
                       case 4: {                      
                        break
                       }
                       case 5: {  
                         this.getOrders()                                       
                        break
                       }
                       default: {                      
                           break
                       }
                     }
    
                  })
                } else {
                     //There is no matching action
                    this.tts.speak({text: 'I am sorry, i didnt understand that, Can you repeat', locale: 'en-US', rate: 0.75})
                   .then(() => {
                     //trigger this function again to do all over again
                    this.voiceCommand()
                })
             }
   
         }
        )
      },
      //no valid speech recognized
       (onerror) => { 
        this.zone.run(()=>{
          console.log('error:', onerror) 
          this.recording = false
          this.buttoncolor = "medium"
           //There is no matching action
           this.tts.speak({text: 'I am sorry, i didnt understand that, Can you repeat', locale: 'en-US', rate: 0.75})
           .then(() => {
           //trigger this function again to do all over again
            this.voiceCommand()
          })
        })
       },
       () => {
        this.recording = false
        this.buttoncolor = "medium"
       }
      )
    })
  })
}


orderInProgress() {
  if (( this.order.status == undefined || this.order.status == "delivered" || this.order.status == "rejected" || this.order.status == "cancelled" )) {
    return false
  } else {
    return true
  }
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
      let ord = data.find((ord)=> {
         return ord.status == "open"
      })
      if (ord) {
        let speakObj = {text: "You have one new order", locale: 'en-US', rate: 0.80}
        this.tts.speak(speakObj).then(()=> {
        this.order = ord
        this.setButtonColor(this.order)
        })
      } else {
        let speakObj = {text: "You have no orders assigned", locale: 'en-US', rate: 0.80}
        this.tts.speak(speakObj).then(()=> {
          this.clearOrderObj()
        })
      }
     })
    }
/**
    selectOrder(order) {
      if (order.status == "accepted") {
         this.pickUpOrder(order)
      } else if (order.status == "open") {
        order.status = "accepted"
        order.driverId = "mohan"
        this.setButtonColor(order)
      }           
    }
   **/

    clearOrderObj() {
      for (var prop in this.order) {
        if (this.order.hasOwnProperty(prop)) {
            delete this.order[prop];
        }
      }
    }
    acceptOrder(order) {
      order.status = "accepted"
      order.driverId = "mohan"
      this.orderService.updateOrder(order).subscribe((response)=> {
        if (order.orderId == response["orderId"]) {
          this.setButtonColor(order)
        }
      })
    }

    pickUpOrder(order) {
      order.status = "picked"
      order.driverId = "mohan"
      this.orderService.updateOrder(order).subscribe((response)=> {
        if (order.orderId == response["orderId"]) {
          this.setButtonColor(order)
        }
      })
    }

        
    completeOrder(order) {
      order.status = "delivered"
      order.driverId = "mohan"
      this.orderService.updateOrder(order).subscribe((response)=> {
        if (order.orderId == response["orderId"]) {
          this.clearOrderObj()
          this.getOrders()
        }
      })
    }

    rejectOrder(order) {
      order.status = "rejected"
      this.orderService.updateOrder(order).subscribe((response)=> {
        if (order.orderId == response["orderId"]) {
          this.clearOrderObj()
          this.getOrders()
        }
      })
    }
    
}
