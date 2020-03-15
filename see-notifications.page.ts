import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddTravelService } from '../add-travel.service';

@Component({
  selector: 'app-see-notifications',
  templateUrl: './see-notifications.page.html',
  styleUrls: ['./see-notifications.page.scss'],
})
export class SeeNotificationsPage implements OnInit {

  msg: string;
  id: any;
  title: any;
  isGeoNotif: boolean;

  constructor(private navparams: NavParams,
              private modalCtrl: ModalController,
              private router: Router,
              private ats: AddTravelService) {
    this.msg = this.navparams.data.value.notification.message;
    this.title = this.navparams.data.value.notification.title;
    this.id = this.navparams.data.value.id;
    if (!(this.id === undefined)) {
      this.isGeoNotif = true;
    }
  }


  ngOnInit() {}

  goBack() {
    this.modalCtrl.dismiss();
  }

  toGeolocationArea() {
    this.ats.data.Data = {id: this.id};
    this.goBack();
    this.router.navigateByUrl('geolocate-users');
  }

}
