import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoTravelPage } from './info-travel.page';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: InfoTravelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAy4dLnxOGDcmtEZ8qq5luqyysgiHkzQTI'})
  ],
  declarations: [InfoTravelPage]
})
export class InfoTravelPageModule {}
