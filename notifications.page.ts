import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, Events } from '@ionic/angular';
import { SeeNotificationsPage } from '../see-notifications/see-notifications.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificationsArray =  [];
  readOrNot = 'notRead';
  hiddenId: string;
  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              private event: Events) {

      if (!(this.navParams.data.value === null)) {
        this.navParams.data.value.forEach(notification => {
          if (notification.opened === 0) {
            if (notification.title === 'PERMISSION DE GEOLOCALISATION') {
              this.hiddenId = notification.message.split('|')[1];
              notification.message = notification.message.split('|')[0];
              this.notificationsArray.push(notification);
            } else {
              this.notificationsArray.push(notification);
            }
          }
        });
      }

  }

  ngOnInit() {}

  async dismiss(index: number) {
    if (!this.notificationsArray[index].opened) {
      this.readOrNot = 'read';
      this.event.publish('opened', index);
    }
    const modal = await this.modalCtrl.create({
      component: SeeNotificationsPage,
      componentProps: {value: {id: this.hiddenId, notification: this.notificationsArray[index]}}
    });
    modal.present();
    this.notificationsArray.splice(index, 1);
  }


}
