import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { IonInput, NavParams, NavController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyurlsService } from '../myurls.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {

  @ViewChild(IonInput) input: IonInput;

  messagesArray: {msg: string, mode: string, time: string}[];
  hisId: string;
  hisName: string;
  Input: string;

  constructor(private userInfo: UserInfoService,
              private navParams: NavParams,
              private http: HttpClient,
              private modalCtrl: ModalController,
              private url: MyurlsService) {

    this.messagesArray = [];
    this.hisId = this.navParams.data.login;
    this.hisName = this.navParams.data.name;

    this.loadMessages(this.http);

    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {
      key: 'readChat', params: {
                                MyLogin: this.userInfo.info.login,
                                HisLogin:  this.hisId
                               }
    };

    http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
    },
    (error: any) => {
      console.log(error);
    });
   }

  ngOnInit() {
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  async loadMessages(http: HttpClient) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {
      key: 'message', params: {
                                LoginExp: this.userInfo.info.login,
                                LoginDest:  this.hisId
                               }
    };

    http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log(data);
      let Time: string;
      let buffer = [];
      let message: any;
      data.forEach((elm: any, index: number) => {
        if (!(elm.Date === ' ')) {
          Time =  elm.Date.split(' ')[2].toLowerCase();
        }
        if (elm.LoginExp === this.userInfo.info.login) {
          message = {msg: elm.Message, mode: 'sent', time: Time};
          if (index >= 1) {
            if (data[index - 1].LoginExp === elm.LoginExp) {
              message = {msg: elm.Message, mode: 'meAgain', time: Time};
            }
          }
        } else {
          message = {msg: elm.Message, mode: 'received', time: Time};
          if (index >= 1) {
            if (data[index - 1].LoginExp === elm.LoginExp) {
              message = {msg: elm.Message, mode: 'hisAgain', time: Time};
            }
          }
        }
        buffer.push(message);
      });
      this.messagesArray = buffer;
    },
    (error: any) => {
      console.log(error);
    });

    setTimeout(() => {
    this.loadMessages(http);
  }, 5000);
  }

  sendMessage() {
    this.messagesArray.push({msg: this.Input, mode: 'sent', time: ''});
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {
                        key: 'message', params: {
                                                  msg: this.Input,
                                                  LoginExp: this.userInfo.info.login,
                                                  LoginDest:  this.hisId
                                                 }
                      };

    this.http.post(this.url.manageUrl, JSON.stringify(options), headers)
    .subscribe(() => {
      this.Input = '';
    },
    (error: any) => {
      console.log(error);
    });
  }

}
