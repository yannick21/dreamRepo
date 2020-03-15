import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from '@ionic/angular';
import { UserInfoService } from '../user-info.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyurlsService } from '../myurls.service';

@Component({
  selector: 'app-info-travel',
  templateUrl: './info-travel.page.html',
  styleUrls: ['./info-travel.page.scss'],
})
export class InfoTravelPage implements OnInit {


  zoom = 13.5;
  destination: string;
  idTrajet: any;
  reservationsArray: unknown;
  departure: string;
  travel: any;

  constructor(public navCtrl: NavController,
              public userInfo: UserInfoService,
              private navparams: NavParams,
              private modalCtrl: ModalController,
              private http: HttpClient,
              private alertCtrl: AlertController,
              private storage: Storage,
              private url: MyurlsService) {
                this.destination = this.navparams.data.travel.Destination;
                this.departure = this.navparams.data.travel.Depart;
                this.idTrajet = this.navparams.data.travel.IdTrajet;
                this.travel = this.navparams.data.travel;
                this.loadPartners();
              }

  ngOnInit() {
  }

  loadPartners() {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {
                        key: 'partners',
                        params: {
                                  idTrajet: this.idTrajet
                                }
                      };

    this.http.post(this.url.manageUrl, JSON.stringify(options), headers)
    .subscribe((data) => {
      this.reservationsArray = data;
    },
    (error: any) => {
      console.log(error);
    });
    this.modalCtrl.dismiss();
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  getCoords() {
    if (this.destination.toLowerCase() === 'abobo') {
      return {lat: 5.433289, lng: -4.032049};
    } else if (this.destination.toLowerCase() === 'riviera') {
      return {lat: 5.3336165, lng: -3.9858852};
    } else if (this.destination.toLowerCase() === 'kumasi') {
      return {lat: 6.6900657, lng: -1.7561959};
    } else if (this.destination.toLowerCase() === 'angre') {
      return {lat: 5.3880547, lng: -3.9981746};
    } else if (this.destination.toLowerCase() === 'ii-plateau') {
      return {lat: 5.3705433, lng: -3.9898528};
    } else if (this.destination.toLowerCase() === 'marcory') {
      return {lat: 5.3020031, lng: -3.9939839};
    } else if (this.destination.toLowerCase() === 'koumassi') {
      return {lat: 5.2990141, lng: -3.9719854};
    } else if (this.destination.toLowerCase() === 'adjame') {
      return {lat: 5.3687289, lng: -4.0548107};
    } else if (this.destination.toLowerCase() === 'abobo') {
      return {lat: 5.3687289, lng: -4.0548107};
    }
  }


  bookIn() {
    this.confirmation();
  }

  async confirmation() {
    const alert = await this.alertCtrl.create({
          header: 'Reservation',
          message: 'confirmez vous vouloir reserver ce trajet',
          buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                          options: any		= {
                                              key: 'reservation',
                                              params: {
                                                        loginUser: this.userInfo.info.login,
                                                        idTrajet: this.idTrajet,
                                                        nbpd: this.travel.NbPlaceDispo - 1
                                                      }
                                            };

                          this.http.post(this.url.manageUrl, JSON.stringify(options), headers)
                          .subscribe(() => {
                            this.storage.get('travels').then( (array: any[]) => {
                              if (!(array === null)) {
                                array.push(this.travel);
                              } else {
                                array = [this.travel];
                              }
                              this.storage.set('travels', array).then( () => {
                                this.modalCtrl.dismiss();
                                this.ok();
                              });
                            });
                          },
                          (error: any) => {
                            console.log(error);
                          });
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
      header: 'requête effectuée: nous vous alertons à la date du trajet',
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
}
