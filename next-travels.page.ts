import { Component, OnInit } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AddTravelService } from '../add-travel.service';
import { UserInfoService } from '../user-info.service';
import { Storage } from '@ionic/storage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MyurlsService } from '../myurls.service';



@Component({
  selector: 'app-next-travels',
  templateUrl: './next-travels.page.html',
  styleUrls: ['./next-travels.page.scss'],
})
export class NextTravelsPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  tsa = [];
  noItem = false;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public router: Router,
              public ats: AddTravelService,
              public userInfo: UserInfoService,
              public storage: Storage,
              private http: HttpClient,
              private url: MyurlsService) {
              this.load();
  }

  ngOnInit() {
  }

  load() {
    /*this.storage.get('travels').then( (array: any[]) =>  {
        if (!(array === null || array === [])) {
          this.sortTravelsByDate(array);
        } else {
          this.noItem = true;
        }
    });*/

    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {key: 'nextTravels', params: {login: this.userInfo.info.login}};

    this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((array: any) => {
      if (!(array === null || array === [])) {
        this.sortTravelsByDate(array);
      } else {
        this.noItem = true;
      }

      this.storage.get('travels').then( (tab: any[]) => {
        if (!(tab === null)) {
          tab = array;
        } else {
          array = [tab];
        }
        this.storage.set('travels', tab).then( () => {
        });
      });
    },
    (error: any) => {
      console.log(error);
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  sortTravelsByDate(array: any[]) {
    if (!(array === undefined)) {
      if (!(array.length === 0)) {
        array.forEach((elm: any, index) => {
          const elmDate: string  = elm.Date;
          const date = new Date();
          if ((date.getFullYear() <= Number(elmDate.split('-')[0])) &&
             (date.getMonth() <= Number(elmDate.split('-')[1]) - 1) &&
             (date.getDate() <= Number(elmDate.split('-')[2]))) {
                  this.tsa.push(elm);
          }
        });
      }
    }
  }

  receivePartners() {
  }

  showPartners(index: number) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {key: 'partners', params: {idTrajet: this.tsa[index].IdTrajet}};

    this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
        this.ats.data.Data = {partners: data, id: this.tsa[index].IdTrajet};
        this.router.navigateByUrl('/popover-component');
    },
    (error: any) => {
      console.log(error);
    });
  }
}
