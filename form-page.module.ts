import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormPagePage } from './form-page.page';

const routes: Routes = [
  {
    path: '',
    component: FormPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [FormPagePage]
})
export class FormPagePageModule {}
