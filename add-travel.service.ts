import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddTravelService implements OnInit {
  smth: any;
  data = {
    Depart: '',
    Rencontre: '',
    Destination: '',
    Depot: '',
    Date: '',
    Heure: '',
    NbPlace: 0,
    Prix: 0,
    LoginConducteur: 'serges.yannick.k@gmail.com',
    Data: this.smth,
    notifsNb: 0
  };
  constructor() { }

  ngOnInit() {}
}
