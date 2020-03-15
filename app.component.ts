import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Accueil',
      url: '/home',
      icons: ['home']
    },
    {
      title: 'Prochains Trajets',
      url: '/next-travels',
      icons: ['fastforward', 'logo-model-s'],
    },
    {
      title: 'Trajets Precédents',
      url: '/previous-travels',
      icons: ['rewind', 'logo-model-s']

    },
    {
      title: 'Rechercher Un Profil',
      url: '/home',
      icons: ['search', 'person']
    },
    /*{
      title: 'paramètres',
      url: '/settings',
      icons: ['settings']
    },
    {
      title: 'consulter mes statistiques',
      url: '/stats',
      icons: ['stats']
    }*/
  ];

  dataNextTravels: any;
  dataPreviousTravels: any;
  profiles: {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private event: Events,
    private speechRecognition: SpeechRecognition,

  ) {
    this.initializeApp();
    
    this.event.subscribe('requestNext', () => {
      event.publish('selectNext', this.dataNextTravels);
    });

    this.event.subscribe('requestPrevious', () => {
      event.publish('selectPrevious', this.dataPreviousTravels);
      console.log(this.dataPreviousTravels);
    });

    this.event.subscribe('requestProfile', () => {
      event.publish('profile', this.profiles);
    });
  }

  navigate(index: number) {
    if (index === 1) {
      this.router.navigateByUrl('next-travels');
    }

    if (index === 2) {
      this.router.navigateByUrl('previous-travels');
    }

    if (index === 3) {
      this.router.navigateByUrl('profile-search');
    }
  }

  /*receiveNext() {
    const observable = new Observable(observer => {
       this.socket.on('selectNext', (response) => {
        observer.next(response);
      });
    });
    return observable;
  }

  receivePrevious() {
    const observable = new Observable(observer => {
      this.socket.on('selectPrevious', (response) => {
        observer.next(response);
      });
    });
    return observable;
  }

  receiveProfiles() {
    const observable = new Observable(observer => {
      this.socket.on('profile', (response) => {
        observer.next(response);
      });
    });
    return observable;
  }*/

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.speechRecognition.hasPermission()
         .then((hasPermission: boolean) => {
            if (!hasPermission) {
              this.requestPermission();
            }
        });
    });
  }

  requestPermission() {
    this.speechRecognition.requestPermission()
      .then(() => {});
  }
}
