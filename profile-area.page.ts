import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ChatroomPage } from '../chatroom/chatroom.page';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-profile-area',
  templateUrl: './profile-area.page.html',
  styleUrls: ['./profile-area.page.scss'],
})
export class ProfileAreaPage implements OnInit {

  user: any;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              private userInfo: UserInfoService) {
              this.user = navParams.data;
  }

  ngOnInit() {
  }

  async toChatRoom(nam: string) {
    const modal = await this.modalCtrl.create({
      component: ChatroomPage,
      componentProps: {login: this.user.Login, name: nam}
    });
    return await modal.present();
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

}
