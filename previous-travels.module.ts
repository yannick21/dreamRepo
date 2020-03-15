import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreviousTravelsPage } from './previous-travels.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousTravelsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreviousTravelsPage]
})
export class PreviousTravelsPageModule {}
