 import { Component, ViewChild } from '@angular/core';
 import { ModalController, IonBadge, PopoverController, Events} from '@ionic/angular';
 import { FormPagePage } from '../form-page/form-page.page';
 import { AllTravelsService } from '../all-travels.service';
 import { Router } from '@angular/router';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { NotificationsPage } from '../notifications/notifications.page';
 import { ChatPage } from '../chat/chat.page';
 import { UserInfoService } from '../user-info.service';
 import { Storage } from '@ionic/storage';
 import { MyurlsService } from '../myurls.service';


 @Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notificationsNumber = 0;
  notificationsArray = [];
  chatsNumber = 0;
  chatsArray = [];
  color = 'primary';
  login: any;
  name: string;
  welcomeArray = [{initial: 'B', rest: 'ienvenue'},
                  {initial: 'A', rest: 'yoka'},
                  {initial: 'A' , rest: 'kwaba'}
                 ];
  welcomeColorArray = ['orange', 'orange1', 'orange2'];


  @ViewChild('chat') chat: IonBadge;
  @ViewChild('notif') notif: IonBadge;
   text: string;
   welcomeColor: string;
   color2 = 'primary';
   userData: any;

  constructor(public router: Router,
              public modalCtrl: ModalController,
              public allTS: AllTravelsService,
              private http: HttpClient,
              private popoverCtrl: PopoverController,
              private userInfo: UserInfoService,
              private event: Events,
              private storage: Storage,
              private url: MyurlsService) {
                /*this.storage.clear().then(() => {

                });*/

                /*this.storage.set('travels',  [{LoginConducteur: 'serges.yannick.k@gmail.com', 
                                               Depart: 'yopougon', Destination: 'riviera', Heure: '20:25', Date: '2019-10-27',
                                                NbPlace: 5, Prix: 100, NbPlaceDispo: 5, IdTrajet: 16}]).then( (array: any[]) => {

                                                  this.storage.get('travels').then( (array: any[]) => {
                                                    console.log(array);
                                                  });

                });*/

                this.init();
              }

  toTravelsResearch() {
   // this.init();
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {key: 'trajet', params: {}};

    this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
        this.allTS.allTravelsServiceArray = data;
        this.router.navigateByUrl('/travel-research');
    },
    (error: any) => {
      console.log(error);
    });
  }

  async showNotificationsPopover($event) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsPage,
      translucent: true,
      event: $event,
      componentProps: {value: this.notificationsArray}
    });
    return await popover.present();
  }

  async showChatsPopover($event) {
    const popover = await this.popoverCtrl.create({
      component: ChatPage,
      translucent: true,
      event: $event,
      componentProps: {value: this.chatsArray}
    });
    return await popover.present();
  }

   async toFormPage() {
    //this.init();
    const modal = await this.modalCtrl.create({
      component: FormPagePage,
    });
    return await modal.present();
  }

  async loadNotifications(http: HttpClient) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {key: 'notifications', params: {login: this.login}};

    http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      this.notificationsArray = data;
      this.notificationsNumber = this.notificationsArray.length;
      if (this.notificationsNumber > 0) {
        this.color = 'danger';
      }
    },
    (error: any) => {
      console.log(error);
    });

    setTimeout(() => {
    this.loadNotifications(http);
   }, 300000);
  }

  async loadMessages(http: HttpClient) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {key: 'chat', params: {login: this.login}};

    http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      if(data){
        this.chatsArray = data;
        this.chatsNumber = this.chatsArray.length;
        if (this.chatsNumber > 0) {
        this.color2 = 'danger';
      }
      }
    },
    (error: any) => {
      console.log(error);
    });

    setTimeout(() => {
    this.loadMessages(http);
  }, 300000);
  }

  /*async messages(http: HttpClient) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {key: 'message', params: {login: this.login}};

    http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      this.notificationsArray = data;
      this.notificationsNumber = this.notificationsArray.length;
      if (this.notificationsNumber > 0) {
        this.color = 'danger';
      }
    },
    (error: any) => {
      console.log(error);
    });

    setTimeout(() => {
    this.loadNotifications(http);
  }, 300000);
  }*/

  toSpeech() {
    this.router.navigateByUrl('/speech');
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
  }

  init(){
    this.storage.get('userInfo').then((userData) => {
      this.userData = userData;
      if ((userData === undefined) || (userData === null)) {
          this.router.navigateByUrl('welcome-form');
      } else {
        this.shuffle(this.welcomeArray);
        this.shuffle(this.welcomeColorArray);
        this.welcomeColor = this.welcomeColorArray[0];
        this.name = userData.firstName;
        this.login = userData.login;
        this.event.subscribe('opened', (index) => {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any		= {key: 'opened', login: this.login};

        this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
        .subscribe(() => {
          this.notificationsNumber--;
          this.chatsNumber--;
        },
        (error: any) => {
          console.log(error);
        });
      });
        this.loadNotifications(this.http);
        this.loadMessages(this.http);
      }
    });
  }
}
