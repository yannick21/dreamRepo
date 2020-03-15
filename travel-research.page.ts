 import { Component, OnInit } from '@angular/core';
 import { NavController, AlertController, ModalController, Events } from '@ionic/angular';
 import { Router } from '@angular/router';
 import { AllTravelsService } from '../all-travels.service';
 import { UserInfoService } from '../user-info.service';
 import { InfoTravelPage } from '../info-travel/info-travel.page';
 import { HttpHeaders, HttpClient } from '@angular/common/http';
 import { MyurlsService } from '../myurls.service';

 @Component({
  selector: 'app-travel-research',
  templateUrl: './travel-research.page.html',
  styleUrls: ['./travel-research.page.scss'],
})
export class TravelResearchPage implements OnInit {

  myDate: string = new Date().toISOString();
  public socket: any;
  dayShortNames = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
  monthShortNames = 'jan, fev, mar, avr, mai, juin, jul, aou, sep, oct, nov, dec';
  customPickerOptions: any;
  travelsArray = [];
  displayedTravels = [];

  date: any;
  depart: any;
  destination: any;
   noResult = false;
   error: boolean;

  constructor(public navCtrl: NavController,
              public router: Router,
              public allTS: AllTravelsService,
              public userInfo: UserInfoService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private http: HttpClient,
              private url: MyurlsService
              ) {
              }

  ngOnInit() {
    this.travelsArray = this.allTS.allTravelsServiceArray;
    this.displayedTravels = this.travelsArray;
  }

  async confirmation() {
    const alert = await this.alertCtrl.create({
          header: 'Alerte Voyage',
          message: 'vous attendez un trajet allant de ' + this.depart + ' à ' + this.destination + '<br>' +
          ' le ' + this.date.split('T')[0] + '(nous ne tenons pas vraiment compte de l\'heure)',
          buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                          options: any		= {
                                              key: 'alertebonplan',
                                              params: {
                                                        loginUser: this.userInfo.info.login,
                                                        depart: this.depart,
                                                        destination: this.destination,
                                                        date: this.date.split('T')[0]
                                                      }
                                            };

                          this.http.post(this.url.manageUrl, JSON.stringify(options), headers)
                            .subscribe(() => {
                              this.ok();
                            },
                            (error: any) => {
                              console.log(error);
                            });
                          this.modalCtrl.dismiss();
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

  async ok() {
    const alert = await this.alertCtrl.create({
      header: 'requête effectuée: nous vous alertons aussitôt que ce trajet est disponible',
      buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.modalCtrl.dismiss();
                    }
                  }
               ]
    });
    await alert.present();
  }


  updateTravelsList() {
    this.displayedTravels = [];
    if (this.date === undefined) {
      this.date = '';
    }
    if (this.depart === undefined) {
      this.depart = '';
    }
    if (this.destination === undefined) {
      this.destination = '';
    }
    this.travelsArray.forEach((travel: any) => {
        if (((travel.Date === this.date.split('T')[0]) || this.date.split('T')[0] === '') &&
           ((travel.Depart === this.depart) || ( this.depart === '')) &&
           ((travel.Destination === this.destination) || (this.destination === ''))) {
          this.displayedTravels.push(travel);
        }
      });

    if (this.displayedTravels.length === 0) {
      this.noResult = true;
    } else {
      this.noResult = false;
    }
  }


  goBack() {
    this.navCtrl.back();
  }

  async toInfoTravel(index: number) {
      const modal = await this.modalCtrl.create({
        component: InfoTravelPage,
        componentProps: {travel: this.displayedTravels[index]}
      });
      return await modal.present();
  }

  notification() {

    if (!(this.date === null) && !(this.date === undefined) && !(this.date === '')) {
      if (!(this.depart === null) && !(this.depart === undefined) && !(this.depart === '')) {
        if (!(this.destination === null) && !(this.destination === undefined) && !(this.destination === '')) {
          this.confirmation();
        }
      }
    } else {
      this.error = true;
    }
  }

  clearInput() {
    this.date = '';
    this.depart = '';
    this.destination = '';
    this.displayedTravels = this.travelsArray;
  }

}
