import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormPagePage } from './form-page/form-page.page';
import { NextFormPage } from './next-form/next-form.page';
import { FormPagePageModule } from './form-page/form-page.module';
import { AddTravelService } from './add-travel.service';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgmCoreModule} from '@agm/core';
import { UserInfoService } from './user-info.service';
import { GeolocateUsersPage } from './geolocate-users/geolocate-users.page';
import { GeolocateUsersPageModule } from './geolocate-users/geolocate-users.module';
import { NotificationsPage } from './notifications/notifications.page';
import { SeeNotificationsPage } from './see-notifications/see-notifications.page';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ChatroomPage } from './chatroom/chatroom.page';
import { SpeechKit } from '@ionic-native/speechkit/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { InfoTravelPage } from './info-travel/info-travel.page';
import { ProfileAreaPage } from './profile-area/profile-area.page';
import { MyurlsService } from './myurls.service';
import { ChatPage } from './chat/chat.page';




@NgModule({
  declarations: [AppComponent, NextFormPage, ProfileAreaPage, ChatPage,
                 NotificationsPage, SeeNotificationsPage, ChatroomPage, InfoTravelPage],
  entryComponents: [FormPagePage, NextFormPage, ProfileAreaPage,
                    GeolocateUsersPage, NotificationsPage, SeeNotificationsPage, ChatroomPage, InfoTravelPage, ChatPage],
  imports: [
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormPagePageModule,
    GeolocateUsersPageModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAy4dLnxOGDcmtEZ8qq5luqyysgiHkzQTI'})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AddTravelService,
    Geolocation,
    UserInfoService,
    TextToSpeech,
    SpeechRecognition,
    SpeechKit,
    MyurlsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
