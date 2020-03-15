import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { NextFormPage} from '../next-form/next-form.page';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AddTravelService } from '../add-travel.service';
import { UserInfoService } from '../user-info.service';


@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.page.html',
  styleUrls: ['./form-page.page.scss'],
})
export class FormPagePage implements OnInit {

  dayShortNames = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
  monthShortNames = 'jan, fev, mar, avr, mai, juin, jul, aou, sep, oct, nov, dec';
  customPickerOptions: any;


  Depart: string;
  Destination: string;
  Date: string;
  Depot: string;
  Rencontre: string;
  alertController: any;
  public form: FormGroup;
  error: boolean;



  constructor(public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public fb: FormBuilder,
              public ats: AddTravelService,
              public userInfo: UserInfoService) {

  }

  ngOnInit() {
    this.form = new FormGroup ({
      Depart: new FormControl(),
      Destination: new FormControl(),
      Date: new FormControl(),
      Depot: new FormControl(),
      Rencontre: new FormControl()
     });

  }

  hideForm() {
    this.modalCtrl.dismiss();
  }


  submit() {

    if (!( (this.form.get('Date').value === null) ||
       (this.form.get('Destination').value  === null) ||
       (this.form.get('Depot').value   === null) ||
       (this.form.get('Rencontre').value   === null) ||
       (this.form.get('Depart').value   === null))) {
        const rawtime =  (this.form.get('Date').value).split('T');
        const rawHour = rawtime[1].split(':', 2);

        const hour    = rawHour.join(':');
        const date    = rawtime[0];

        this.ats.data.Depart = this.form.get('Depart').value;
        this.ats.data.Destination = this.form.get('Destination').value;
        this.ats.data.Date = date;
        this.ats.data.Heure = hour;
        this.ats.data.Depot = this.form.get('Depot').value;
        this.ats.data.Rencontre = this.form.get('Rencontre').value;
        this.hideForm();
        this.toNextForm();
       } else {
         this.error = true;
       }
  }

  cancel() {
    this.hideForm();
  }

  async toNextForm() {
    const modal = await this.modalCtrl.create({
      component: NextFormPage,
    });
    return await modal.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
