import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { UserInfoService } from '../user-info.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProfileAreaPage } from '../profile-area/profile-area.page';
import { MyurlsService } from '../myurls.service';


@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.page.html',
  styleUrls: ['./profile-search.page.scss'],
})
export class ProfileSearchPage implements OnInit {

  profilsArray: any;
  suggessionsArray: any[];

  @ViewChild(IonSearchbar) IonSearchbar;

  constructor(public event: Events,
              public userInfo: UserInfoService,
              public http: HttpClient,
              public modalCtrl: ModalController,
              public navCtrl: NavController,
              private url: MyurlsService) {
                this.load();
   }

  ngOnInit() {
  }

  suggest() {
    this.suggessionsArray = [];
    let match = true;
    const keyWordsArray = (this.IonSearchbar.value).split(' ');
    for (let index = 0; index < this.profilsArray.length; index++) {
        for (let i = 0; i < keyWordsArray.length; i++) {
            if ((this.profilsArray[index].Nom.indexOf(keyWordsArray[i]) === -1) &&
                (this.profilsArray[index].Prenom.indexOf(keyWordsArray[i]) === -1) &&
                    (this.profilsArray[index].Residence.indexOf(keyWordsArray[i]) === -1)) {
                      i =  keyWordsArray.length;
                      match = false;
          }
        }

        if (match === true) {
          this.suggessionsArray.push(this.profilsArray[index]);
        }
        match = true;

        if (this.IonSearchbar.value === '') {
          this.suggessionsArray = [];
        }
    }
  }

load() {
  const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any		= {key: 'profile'};

  this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
          .subscribe((data) => {
            this.profilsArray = data;
          },
          (error: any) => {
            console.log(error);
          });
}

goBack() {
  this.navCtrl.back();
}

  async toProfileArea(index: number) {
      const modal = await this.modalCtrl.create({
        component: ProfileAreaPage,
        componentProps: this.suggessionsArray[index]
      });
      return await modal.present();
  }

}
