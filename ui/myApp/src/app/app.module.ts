import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Platform, IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

//ionic native
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import services
import { OrderService } from './services/order/order.service';
import { UserService } from './services/user/user.service';
import { DriverService } from './services/driver/driver.service';

@NgModule({
   declarations: [
      AppComponent,
   ],
   entryComponents: [],
   imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      IonicStorageModule.forRoot()
   ],
   providers: [
      StatusBar,
      SpeechRecognition,
      SplashScreen,
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
