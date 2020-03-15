import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule} from '@agm/core';


import { IonicModule } from '@ionic/angular';

import { GeolocateUsersPage } from './geolocate-users.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocateUsersPage
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
  declarations: [GeolocateUsersPage]
})
export class GeolocateUsersPageModule {}
