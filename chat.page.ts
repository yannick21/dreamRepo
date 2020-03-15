import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, Events } from '@ionic/angular';
import { ChatroomPage } from '../chatroom/chatroom.page';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatsArray = [];
  readOrNot = 'notRead';

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              private event: Events) {

        this.chatsArray = this.navParams.data.value;
        console.log(this.chatsArray);
  }

  async read(index: number) {
    const modal = await this.modalCtrl.create({
      component: ChatroomPage,
      componentProps: {login: this.chatsArray[index].LoginExp}
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
