import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, Events } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import 'rxjs/add/operator/map';
import { AddTravelService } from '../add-travel.service';
import { UserInfoService } from '../user-info.service';
import { Observable } from 'rxjs';
import { MarkerLabel } from '@agm/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MyurlsService } from '../myurls.service';


@Component({
  selector: 'app-geolocate-users',
  templateUrl: './geolocate-users.page.html',
  styleUrls: ['./geolocate-users.page.scss'],
})
export class GeolocateUsersPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public socket: any;
  latitude: number;
  longitude: number;
  zoom = 13;

  myMarker: {
    latitude: number,
    longitude: number,
    name: string;
  };

  markersArray: {
    latitude: number,
    longitude: number,
    name: string,
    label: any
  }[];

  labelColor: string[] =  ['black', 'green', 'blue', 'grey', 'yellow', 'purple', 'pink', 'brown', 'orange', 'indigo'];

  loginsArray: string[];

  myLabel: MarkerLabel;



  constructor(public navCtrl: NavController,
              public platform: Platform,
              public geolocation: Geolocation,
              public ats: AddTravelService,
              public event: Events,
              public userInfo: UserInfoService,
              private http: HttpClient,
              private url: MyurlsService) {

              // this.socket = userInfo.info.socket;

              // this.createMarkersAndLoginsArrays();

              /*this.coordsReception().subscribe((data: { latitude: number,
                                                        longitude: number,
                                                        userLogin: string,
                                                        name: string}[]) => {
                  for (let index = 0; index < this.loginsArray.length; index++) {
                    if (this.loginsArray[index] === data[0].userLogin) {
                      this.markersArray[index].latitude = data[0].latitude;
                      this.markersArray[index].longitude = data[0].longitude;
                      this.markersArray[index].name = data[0].name;
                      this.markersArray[index].label = {color: this.labelColor[index],
                                                        fontFamily: '',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        text:  this.markersArray[index].name};
                      this.myLabel = {color: 'white', fontFamily: '', fontSize: '12px', fontWeight: 'bold', text: 'Vous'};
                    }
                  }*/
              this.myLabel = {color: 'white', fontFamily: '', fontSize: '12px', fontWeight: 'bold', text: 'Vous'};
              platform.ready().then( () => {
                this.initMap();
              });
             // });

   }

  ngOnInit() {

    this.myMarker = {
      latitude: 0,
      longitude: 0,
      name: ''
    };
  }

  /*ionViewDidLoad() {
     this.initMap();
  }

  ionViewDidEnter() {
    this.initMap();
  }*/



  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: false }).then((resp) => {
      this.latitude = resp.coords.latitude ;
      this.longitude = resp.coords.longitude ;

      this.myMarker.latitude = resp.coords.latitude;
      this.myMarker.longitude = resp.coords.longitude;

      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any		= {
                          key: 'position', params: {
                                                    latitude: this.latitude,
                                                    longitude: this.longitude,
                                                    userLogin: this.userInfo.info.login,
                                                    idTrajet:  this.ats.data.Data.id
                                                   }
                        };

      this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log(data);
        this.markersArray = [];
        this.loginsArray = [];

        for (let index = 0; index < data.length; index++) {
        this.loginsArray.push(data[index].userLogin);
        this.markersArray.push({latitude: data[index].latitude,
                                longitude: data[index].longitude,
                                name: data[index].name,
                                label: {
                                        color: this.labelColor[index],
                                        fontFamily: '',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        text:  data[index].name
                                      }
        });
       }
      },
      (error: any) => {
        console.log(error);
      });

    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;

        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any		= {
                          key: 'position', params: {
                                                    latitude: this.latitude,
                                                    longitude: this.longitude,
                                                    userLogin: this.userInfo.info.login,
                                                    idTrajet:  this.ats.data.Data.id
                                                   }
                        };

        this.http.post(this.url.retrieveUrl, JSON.stringify(options), headers)
      .subscribe((resp: any) => {
        if (!(this.markersArray.length === 0)) {
          for (let index = 0; index < resp.length; index++) {
            this.markersArray.push({latitude: resp[index].latitude,
                                    longitude: resp[index].longitude,
                                    name: resp[index].name === this.userInfo.info.firstName ? 'vous' : resp[index].name,
                                    label: {
                                            color: this.labelColor[index],
                                            fontFamily: '',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            text:  resp[index].name
                                          }
            });
           }
        }
      },
      (error: any) => {
        console.log(error);
      });

      });
  }

  coordsReception() {
    const observable = new Observable(observer => {
      /*this.socket.on('geolocation', (response) => {
        observer.next(response);
      });*/
    });
    return observable;
  }

  goBack() {
    this.navCtrl.back();
  }
}
