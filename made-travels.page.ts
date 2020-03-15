import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-made-travels',
  templateUrl: './made-travels.page.html',
  styleUrls: ['./made-travels.page.scss'],
})
export class MadeTravelsPage implements OnInit {


  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  noItem: boolean;
  mta = [];



  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private storage: Storage) {
                this.load();
               }

  ngOnInit() {
  }

  load() {
    this.storage.get('travels').then( (array: any[]) =>  {
        if (!(array === null || array.length === 0)) {
          this.sortTravelsByDate(array);
        } else {
          this.noItem = true;
        }
    });
  }

  sortTravelsByDate(array: any[]) {
    array.forEach((elm: any, index) => {
      const elmDate: string  = elm.Date;
      const date = new Date();

      if ((date.getFullYear() > Number(elmDate.split('-')[0]))) {
              this.mta.push(elm);
      } else if (date.getFullYear() === Number(elmDate.split('-')[0])) {

          if ((date.getMonth() > Number(elmDate.split('-')[1]) - 1)) {
            this.mta.push(elm);
          } else if ((date.getMonth() === Number(elmDate.split('-')[1]) - 1)) {
             if (date.getDate() > Number(elmDate.split('-')[2])) {
              this.mta.push(elm);
             }
          }
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  async presentPartners() {
    const modal = await this.modalCtrl.create({
      component: PopoverComponentPage,
      // componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
