import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AddTravelService } from '../add-travel.service';
import { MyurlsService } from '../myurls.service';

@Component({
  selector: 'app-welcome-form',
  templateUrl: './welcome-form.page.html',
  styleUrls: ['./welcome-form.page.scss'],
})
export class WelcomeFormPage implements OnInit {

  public form: FormGroup;
  public login: string;
  public password: string;
  public alreadyUsedEmailError = false;
  authObject: {
                login: string;
                password: string;
              };
  error = false;
  constructor(private storage: Storage,
              private router: Router,
              private http: HttpClient,
              private ats: AddTravelService,
              private url: MyurlsService) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(),
      password: new FormControl()
    });
  }

  submit() {

    if (!( (this.form.get('login').value === null) ||
         (this.form.get('password').value  === null))) {

      this.login =  this.form.get('login').value;
      this.password = this.form.get('password').value;

      this.authObject = {
                          login: this.login,
                          password: this.password
                        };
      this.ats.data.Data = this.authObject;
      this.isNewUserOrNo();
    } else {
      this.error = true;
    }

  }

  isNewUserOrNo() {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any		= {key: 'user', params: {login: this.login, password: this.password}};

    this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      if ((data === null) || (data.length === 0)) {
        this.ats.data.Data = {login: this.login, password: this.password};
        this.router.navigateByUrl('new-user');
      } else {
        if (data === 'alreadyUsedEmailError') {
          this.alreadyUsedEmailError = true;
        } else {
          this.storage.set('userInfo', {firstName: data[0].Prenom, lastName: data[0].Nom, login: data[0].Login}).then(() => {
            this.storage.get('userInfo').then((userData) => {
              console.log(userData);
              this.router.navigateByUrl('home');
            });
          });
        }
      }
    },
    (error: any) => {
      console.log(error);
    });
  }

  cleanError() {
    this.error = false;
  }

}
