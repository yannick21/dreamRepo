import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  info: {
          firstName: string,
          lastName: string,
          login: string
         };
  constructor(private storage: Storage) {
    this.storage.get('userInfo').then( (userData: any) => {
      this.info = {
        firstName: userData.firstName,
        lastName:  userData.lastName,
        login: userData.login
       };
    });
   }
}
