import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AddTravelService } from '../add-travel.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MyurlsService } from '../myurls.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  f1: boolean;
  f2: boolean;
  f3: boolean;
  a2: boolean;
  a3: boolean;
  firstName: any;
  lastName: any;
  error: boolean;
  residence: any;
  contact: any;
  marque: any;
  color: any;
  userObject: { firstName: any; lastName: any; residence: any; contact: any; marque: any; couleur: any; };
  imm: any;
  monthArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  constructor(private ats: AddTravelService,
              private http: HttpClient,
              private router: Router,
              private storage: Storage,
              private url: MyurlsService) { }

  ngOnInit() {
    this.form1 = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
     });

    this.form2 = new FormGroup({
      residence: new FormControl(),
      contact: new FormControl(),
    });

    this.form3 = new FormGroup({
      marque: new FormControl(),
      color: new FormControl(),
      imm: new FormControl()
    });
    this.f1 = true;
  }

  submit1() {

    if (!( (this.form1.get('firstName').value === null) ||
         (this.form1.get('lastName').value  === null))) {
           this.firstName = this.form1.get('firstName').value;
           this.lastName = this.form1.get('lastName').value;
           this.a2 = true;
           this.toForm2();

    } else {
      this.error = true;
    }

  }

  submit2() {

    if (!((this.form2.get('residence').value === null) ||
          (this.form2.get('contact').value === null))) {
            this.residence = this.form2.get('residence').value;
            this.contact =  this.form2.get('contact').value;
            this.a3 = true;
            this.toForm3();

    } else {
      this.error = true;
    }

  }

  submit3() {

    if (!((this.form3.get('color').value === null) ||
          (this.form3.get('marque').value === null))) {
           this.color = this.form3.get('color').value;
           this.marque = this.form3.get('marque').value;
           this.imm = this.form3.get('imm').value;

           const date = Date.call(this).split(' ');
           const year = date[3];
           let month: string;
           const day = date[2];
           this.monthArray.forEach((elm, i) => {
             if (elm === date[1].toLowerCase()) {
                month = (i + 1) + '';
                if (i < 10) {
                  month = '0' + (i + 1);
                }
             }
           });

           const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
           options: any		= {key: 'userAdd', params: {firstName: this.firstName,
                                                      lastName: this.lastName,
                                                      login: this.ats.data.Data.login,
                                                      password: this.ats.data.Data.password,
                                                      residence: this.residence,
                                                      contact: this.contact,
                                                      color: this.color,
                                                      marque: this.marque,
                                                      imm: this.imm,
                                                      date: year + '-' + month + '-' + day
                                             }};

           this.http.post(this.url.manageUrl, JSON.stringify(options), headers)
            .subscribe(() => {
              this.storage.set('userInfo', {firstName: this.firstName,
                lastName: this.lastName, login: this.ats.data.Data.login}).then(() => {
                this.router.navigateByUrl('home');
              });
            },
          (error: any) => {
            console.log(error);
          });

    } else {
      this.error = true;
    }
  }

  cleanError() {
    this.error = false;
  }

  toForm1() {
    this.f1 = true;
    this.f2 = false;
    this.f3 = false;

  }

  toForm2() {
    this.f2 = true;
    this.f1 = false;
    this.f3 = false;
  }

  toForm3() {
    this.f3 = true;
    this.f1 = false;
    this.f2 = false;
  }

}
