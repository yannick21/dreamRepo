import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MadeTravelsPage } from './made-travels.page';

const routes: Routes = [
  {
    path: '',
    component: MadeTravelsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MadeTravelsPage]
})
export class MadeTravelsPageModule {}
