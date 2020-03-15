import { Component, ViewChild, OnInit} from '@angular/core';
import { NavController, ModalController, Events, AlertController } from '@ionic/angular';
import { AddTravelService } from '../add-travel.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { ChatroomPage } from '../chatroom/chatroom.page';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MyurlsService } from '../myurls.service';




@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.page.html',
  styleUrls: ['./popover-component.page.scss'],
})

export class PopoverComponentPage implements OnInit {

  @ViewChild('ionItemSliding') ionItemSliding;
  @ViewChild('ionList') list;


  geolocatedPartnerIndex: number;
  partnersArray: any[];
  geolocateMe: boolean;
  sent: boolean;
  contact: string;
  showContact: boolean;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public ats: AddTravelService,
              public router: Router,
              public event: Events,
              public alertCtrl: AlertController,
              public userInfo: UserInfoService,
              private http: HttpClient,
              private url: MyurlsService) {


                 this.partnersArray = this.ats.data.Data.partners;
                 console.log(this.partnersArray);
   }

  ionViewDidEnter() {
    this.ionItemSliding.open();
  }

  goBack() {
    this.navCtrl.back();
  }

  hideModal() {
    this.modalCtrl.dismiss();
  }

  geolocate() {
    this.confirmationToGeolocate();

  }

  receive() {
  }


  ngOnInit() {}

  async confirmationToGeolocate() {
    const alert = await this.alertCtrl.create({
          header: 'Geolocaliser vos partnaires',
          message: 'chacun devra accepter de vous donner sa position' + '<br>' +
          'auquel cas seul vos partenaires qui l \'accepterons seront geolocalisés ',
          buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          this.presentMap();
                          this.hideModal();
                        }
                      },

                      {
                        text: 'Annuler',
                        handler: () => {}
                      }
                   ]
    });
    await alert.present();
  }

  async confirmationToBeGeolocated(response: any) {
    const alert = await this.alertCtrl.create({
          header: 'Votre Position Requise par ' +  response.name,
          message: ' voulez-donner votre position à ' +  response.name,
          buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          this.ats.data.Data = response;
                          this.presentMap();
                        }
                      },

                      {
                        text: 'Annuler',
                        handler: () => {}
                      }
                   ]
    });

    await alert.present();
  }

  async chat(index: number, nam: string) {
    const modal = await this.modalCtrl.create({
      component: ChatroomPage,
      componentProps: {login: this.partnersArray[index].Login, name: nam}
    });
    return await modal.present();
  }

  presentMap() {
    let loginsArray = [];
    this.ats.data.Data.partners.forEach(elm => {
      loginsArray.push(elm.Login);
    });
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {
                        key: 'notificationGeo', params: {
                                                          logins: loginsArray,
                                                          title: 'PERMISSION DE GEOLOCALISATION',
                                                          message: 'votre partenaire de voyage ' +
                                                          this.userInfo.info.lastName +
                                                          ' voudrait avoir accès à votre position|' +  this.ats.data.Data.id
                                                        }
                      };

    this.http.post(this.url.manageUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
        this.router.navigateByUrl('/geolocate-users');
    },
    (error: any) => {
      console.log(error);
    });
  }

  show() {
    this.showContact = !this.showContact;
  }
}
