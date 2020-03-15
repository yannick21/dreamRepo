import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController} from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { AddTravelService } from '../add-travel.service';

import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyurlsService } from '../myurls.service';




@Component({
  selector: 'app-next-form',
  templateUrl: './next-form.page.html',
  styleUrls: ['./next-form.page.scss'],
})

export class NextFormPage implements OnInit {
  public NbPlace: number;
  public Prix: number;
  public form: FormGroup;
  public travelObj: any;
  private participation: number;
  error: boolean;

  constructor(public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public ats: AddTravelService,
              private http: HttpClient,
              private storage: Storage,
              private url: MyurlsService) {


  }

  ngOnInit() {
      this.form = new FormGroup({
      NbPlace: new FormControl(),
      Prix: new FormControl()
    });
  }


  goBack() {
    this.navCtrl.back();
    this.hideModal();
  }


  cancel() {
    this.hideModal();
  }


  submit() {

    if (!( (this.form.get('NbPlace').value === null) ||
         (this.form.get('Prix').value  === null))) {

      this.ats.data.NbPlace = this.form.get('NbPlace').value;
      this.ats.data.Prix = this.form.get('Prix').value;
      this.travelObj = {
      Depart : this.ats.data.Depart,
      Destination : this.ats.data.Destination,
      Rencontre: this.ats.data.Rencontre,
      Depot: this.ats.data.Depot,
      Date: this.ats.data.Date,
      NbPlace: this.ats.data.NbPlace,
      Prix: this.ats.data.Prix,
      LoginConducteur: this.ats.data.LoginConducteur,
      Heure: this.ats.data.Heure,
      NbPlaceDispo: this.ats.data.NbPlace
    };

      this.confirmation();
      this.hideModal();
    } else {
      this.error = true;
    }

  }

  hideModal() {
    this.modalCtrl.dismiss();
  }

  price() {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                          options: any		= {
                                             key: 'price',
                                             travelCouple: {
                                                            depart: this.ats.data.Depart,
                                                            destination: this.ats.data.Destination
                                                           }
                                            };

    this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
                            .subscribe((data: any) => {
                              this.participation =  Math.round((data[0].prix / this.form.get('NbPlace').value) / 50) * 50;
                            },
                          (error: any) => {
                            console.log(error);
                          });
  }


  async confirmation() {
    const alert = await this.alertCtrl.create({
          header: 'Confirmez-vous vouloir publier ce trajet ?',
          message: 'RECAPITULATIF' + '<br>'
                   + 'Depart : ' + this.ats.data.Depart + '<br>'
                   + 'Destination : ' + this.ats.data.Destination + '<br>'
                   + 'Date et Heure: ' + this.ats.data.Date + ' à ' + this.ats.data.Heure + '<br>'
                   + 'places Disponibles: ' + this.ats.data.NbPlace + '<br>'
                   + 'Participation : ' +  this.ats.data.Prix + '<br>',
          buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                          options: any		= {key: 'publish', travelObj: this.travelObj};

                          this.http.post(this.url.manageUrl, JSON.stringify(options), headers)
                            .subscribe(() => {
                              this.storage.get('travels').then( (array: any[]) => {
                                if (!(array === null)) {
                                  array.push(this.travelObj);
                                } else {
                                  array = [this.travelObj];
                                }
                                this.storage.set('travels', array).then( () => {
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
          header: 'OPERATION REUSSIE',
          message: 'votre trajet à bel et bien été publié',
          buttons: [
                      {
                        text: 'Ok',
                        handler: () => {}
                      },
                   ]
    });

    await alert.present();
  }

}
