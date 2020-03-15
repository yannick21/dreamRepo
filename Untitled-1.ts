import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.page.html',
  styleUrls: ['./speech.page.scss'],
})
export class SpeechPage implements OnInit {
  url = 'http://www.ivoiturage.com/server/retrieve-data.php';
  isSpeechAvailable: boolean;
  isListening = false;
  matches: Array<string> = [];
  stopGreating =  false;
  townsArray = ['okra', 'newyork', 'denver', 'houston', 'dallas', 'paris',
                'toulouse', 'marseille', 'abidjan', 'aboisso', 'bassam', 'daloa', 'abobo', 'riviera',
                'yopougon', 'bondoukou', 'bondoucou', 'accra', 'koumassi', 'kumasi'];

  postRequestsArray = ['publier', 'proposer', 'poster', 'publication',
                       'proposition', 'publish', 'post'];

  exitsArray = ['merci', 'au revoir', 'thanks', 'thank', 'bon', 'bye', 'ok', 'bye-bye'];

  monthsArray = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
  'septembre', 'octobre', 'novembre', 'decembre', 'january', 'february',
  'march', 'april', 'may', 'june', 'july', 'august', 'september', 'november', 'december'];

digit = '1234567890';

travelObject =  {
 towns: {
         departure: '',
         destination: ''
        },
 date: {
         dayName: '',
         dayRank: '',
         month: {
                  monthName: '',
                  monthRank: ''
                }
       },
 hour: ''
};

dayNamesArray = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi',
                   'dimanche', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  researchRequestsArray = ['recherche', 'rechercher', 'recherché', 'cherche',
                           'cherché', 'chercher', 'research', 'searching', 'search', 'researching'];
  language = 'fr-FR';
  speechObj = {
    greating: ['bonjour yannick. que puis-je faire pour vous', 'hi ! what can I do for you'],
    didNotCatch: ['desolé je ne vous ai pas saisi', 'sorry. I didn\'t catch you'],
    holdOn: ['patientez s\'il vous plait', 'please wait...'],
    listening: ['je vous écoute', 'I am listening to you'],
    postConfirmation: ['vous voulez publier un trajet. c\'est bien cela?', 'you want to publish a travel. aren\'t you ?'],
    researchConfirmation: ['vous rechercher un trajet. c\'est cela ?', 'you are searching for a travel. aren\'t you ?'],
    checkTowns_p: ['vous voulez publier un trajet de ', 'you want to publish a travel from'],
    postOrResearch: ['vous voulez publier ou rechercher un trajet', 'you want to publish or research a travel'],
    giveTowns: ['repétez votre requête en précisant les villes de depart et d\'arrivée',
                'repeat your request precising the departure and destination towns'],
    giveDate: ['repétez votre requête en précisant la date',
                'repeat your request precising the date please'],
    checkTowns_r: ['vous rechercher un trajet de ', 'you are searching for a travel from'],
    to: ['à', 'to'],
    confirmTowns: ['veuillez confirmer si c\'est bien le cas', 'is it correct ?'],
    yesOrNo: ['veuillez repondre par oui ou non', 'please answer by yes or no'],
    travelFound: ['voyages repondent a votre requête. le choix optimal est celui-ci',
    'travels match to your request. let me choose the best one for you : this one is the best one !'],
    noGreating: ['je vous écoute', 'i am listening to you'],
    notification: ['voulez-vous recevoir une notification dès qu\' un trajet semblable est disponible ?',
                    'do you want to receive notifications as soon as any travel of the same kind is available  ?'],
    forward: ['ok c\'est fait. avez vous d\'autres preoccupations ?', 'ok done. anything more ?'],
    sayThanks: ['si vous etes satisfait dites merci pour quitter l\'assistance vocale', 'say thanks or bye to exit'],
    goodBye: ['au revoir. et merci de faire confiance à Ivoiturage', 'goodBye. have a nice trip '],
    noTravel: ['désolé. aucun voyage ne répond a votre requête', 'sorry. no travel matches to your request'],
    processing: ['nous recherchons un voyage correspondant a votre requête', 'searching for a travel matching your request'],
    confirmTravel: ['vous souhaitez voyager de ', 'so you would make a travel from'],
    reservation: ['voulez vous reserver ce  ?', 'do I make a reservation for you ?'],
    on: ['ce', 'on']
};

  options = {
                  language: 'fr-FR',
                  prompt: '',
                  matches: 1,
                  showPopup: true,
                  showPartial: false,

              };
  bestTravel: any;
  rate: number;

  constructor(private speechRecognition: SpeechRecognition,
              private plf: Platform,
              private changeDetectorRef: ChangeDetectorRef,
              private tts: TextToSpeech,
              public http: HttpClient,
              private router: Router) {
                this.plf.ready().then(() => {
                  this.speechRecognition.isRecognitionAvailable()
                     .then((available: boolean) => this.isSpeechAvailable = available);
                });


  }

  ngOnInit() {}

  speech(statementType: string, params ?: any[]) {
    let index = 0;
    this.rate = 2;
    let statement: string;
    if (this.language === 'en-US') {
      index = 1;
      this.rate = 1;
    }

    if (statementType === 'greating') {
      if (!this.stopGreating) {
        statement = this.speechObj.greating[index];
        this.stopGreating = true;
      } else {
        statement = this.speechObj.noGreating[index];
      }
    } else if (statementType === 'didNotCatch') {
      statement = this.speechObj.didNotCatch[index];
    } else if (statementType === 'giveDate') {
      statement = this.speechObj.giveDate[index];
    } else if (statementType === 'confirmTravel') {
      statement = this.speechObj.confirmTravel[index] +
                  this.travelObject.towns.departure + ' ' +
                  this.speechObj.to[index] + ' ' +
                  this.travelObject.towns.destination + ' ' +
                  this.speechObj.on[index] + ' ' +
                  this.travelObject.date.dayName + ' ' +
                  this.travelObject.date.dayRank + ' ' + this.travelObject.date.month.monthName;
    } else if (statementType === 'giveTowns') {
      statement = this.speechObj.giveTowns[index];
    } else if (statementType === 'didNotCatch') {
      statement = this.speechObj.didNotCatch[index];
    } else if (statementType === 'holdOn') {
      statement = this.speechObj.holdOn[index];
    } else if (statementType === 'listening') {
      statement = this.speechObj.listening[index];
    } else if (statementType === 'postConfirmation') {
      statement = this.speechObj.postConfirmation[index];
    } else if (statementType === 'researchConfirmation') {
      statement = this.speechObj.researchConfirmation[index];
    } else if (statementType === 'postOrResearch') {
      statement = this.speechObj.postOrResearch[index];
    } else if (statementType === 'checkTowns_r') {
      statement = this.speechObj.checkTowns_r[index];
    } else if (statementType === 'checkTowns_p') {
      statement = this.speechObj.checkTowns_p[index];
    } else if (statementType === 'to') {
      statement = this.speechObj.to[index];
    } else if (statementType === 'confirmTowns') {
      statement = this.speechObj.confirmTowns[index];
    } else if (statementType === 'yesOrNo') {
      statement = this.speechObj.yesOrNo[index];
    } else if (statementType === 'travelFound') {
      statement = this.speechObj.travelFound[index];
    } else if (statementType === 'notification') {
      statement = this.speechObj.notification[index];
    } else if (statementType === 'forward') {
      statement = this.speechObj.forward[index];
    } else if (statementType === 'sayThanks') {
      statement = this.speechObj.sayThanks[index];
    } else if (statementType === 'noTravel') {
      statement = this.speechObj.noTravel[index];
    } else if (statementType === 'processing') {
      statement = this.speechObj.processing[index];
    } else if (statementType === 'reservation') {
      statement = this.speechObj.reservation[index];
    } else if (statementType === 'goodBye') {
      statement = this.speechObj.goodBye[index];
    }
    return statement;
  }
  searchRequestType(request: string) {
    let requestType: string;
    request.split(' ').forEach(elm => {

        if (this.postRequestsArray.includes(elm.toLowerCase())) {
         requestType = 'postRequest';
        } else if (this.researchRequestsArray.includes(elm.toLowerCase())) {
          requestType = 'researchRequest';
        } else if (this.exitsArray.includes(elm.toLowerCase())) {
          requestType = 'exit';
        }
    });
    return requestType;
  }

  startTravelListening_fr() {
    this.startTravelListening('fr-FR');
  }

  startTravelListening_en() {
    this.startTravelListening('en-US');
  }

  startTravelListening(language: string) {
    this.language = language;
    this.options = {
      language: this.language,
      prompt: this.speech('listening'),
      matches: 1,
      showPopup: true,
      showPartial: false,

  };
    this.tts.speak({text: this.speech('greating'), locale: this.language, rate: 2}).then(() => {});
    this.matches = [];
    this.speechRecognition.startListening(this.options)
        .subscribe(
                      (matches: string[]) => {
                        this.matches = matches;
                        this.treatment(matches[0]);
                        this.changeDetectorRef.detectChanges();
                      },
                      () => {
                      this.tts.speak({text: this.speech('didNotCatch'), locale: this.language, rate: 2}).then(() => {});
                      this.changeDetectorRef.detectChanges();
                      }
        );
  }

  researchTowns(request: string) {
    request.split(' ').forEach(elm => {
        if (this.townsArray.includes(elm.toLowerCase())) {
         if (( this.travelObject.towns.departure === undefined) ||
             ( this.travelObject.towns.departure === '')) {
              this.travelObject.towns.departure = elm.toLowerCase();
              if (this.travelObject.towns.departure === 'okra') {
                this.travelObject.towns.departure = 'accra';
              }
         } else {
          this.travelObject.towns.destination = elm.toLowerCase();
         }
        }
    });
  }

  searchDate(statement: string) {
    statement.split(' ').forEach((elm: string) => {
      if (this.dayNamesArray.includes(elm.toLowerCase())) {
        this.travelObject.date.dayName = elm.toLowerCase();
      }
      if ( (elm.length < 3 ) && !(this.digit.indexOf(elm[0]) === -1)) {
        this.travelObject.date.dayRank = elm;
      } else if (!(elm.indexOf('th') === -1)) {
        if (elm.length === 3) {
          this.travelObject.date.dayRank = elm[0];
        } else {
          this.travelObject.date.dayRank = elm[0] + elm[1];
        }
      }
      for (let i = 0; i < this.monthsArray.length; i++) {
        if (this.monthsArray[i] === elm.toLowerCase()) {
          this.travelObject.date.month.monthName = elm.toLowerCase();
          this.travelObject.date.month.monthRank = (i + 1) + '';
        }
      }
    });
  }

  treatment(request: string) {
    const requestType = this.searchRequestType(request);
    if (requestType === 'postRequest' ||
        requestType === 'researchRequest') {
          this.researchTowns(request);
          this.searchDate(request);
          if (requestType === 'researchRequest') {
            this.tts.speak({text: this.speech('confirmTravel'),
                        locale: this.language, rate: this.rate}).then(() => {});
            let response: boolean;
            this.matches = [];
            this.speechRecognition.startListening(this.options)
                            .subscribe(
                                        (matches: string[]) => {
                                          this.matches = matches;
                                          response = this.confirmation(matches[0]);
                                          if (response) {
                                              this.researchTravel();
                                            } else {
                                              this.startTravelListening(this.language);
                                            }
                                          this.changeDetectorRef.detectChanges();
                                        },
                                        () => {
                                        this.tts.speak({text: this.speech('didNotCatch'), locale: this.language, rate: 2}).then(() => {});
                                        this.changeDetectorRef.detectChanges();
                                        }
                            );
          }
    } else if (requestType === 'exit') {
      this.tts.speak({text: this.speech('goodBye'), locale: this.language, rate: 2}).then(() => {});
      this.router.navigateByUrl('/home');
   }
  }


  confirmation(request: string) {

    let response: boolean;
    request.split(' ').forEach(elm => {
      if ((elm.toLowerCase() === 'oui') || (elm.toLowerCase() === 'yes')) {
        response =  true;
      } else if ((elm.toLowerCase() === 'non') || (elm.toLowerCase() === 'no')) {
        response = false;
      }
    });
    return response;
  }

  researchTravel() {
    this.tts.speak({text: this.speech('holdOn'), locale: this.language, rate: 2}).then(() => {});

    this.http.get(this.url).subscribe((data: any[]) => {

        let travels = [];
        this.tts.speak({text: this.speech('processing'),
        locale: this.language, rate: 2}).then(() => {
          data.forEach((elm, index) => {
            if (elm.Depart.toLowerCase() === this.travelObject.towns.departure.toLowerCase() &&
              elm.Destination.toLowerCase() === this.travelObject.towns.destination.toLowerCase()) {
              travels.push(elm);
              this.bestTravel = elm;
            }
  
            if (index === data.length - 1 || data.length === 0) {
              let nbTravelsSpeech = travels.length + ' ' +  this.speech('travelFound');
              if (travels.length === 0) {
                nbTravelsSpeech = this.speech('noTravels');
              }
              this.tts.speak({text: nbTravelsSpeech,
              locale: this.language, rate: 2}).then(() => {
              this.bestTravel = this.bestChoice(travels);
              this.tts.speak({text: this.speech('reservation'), locale: this.language, rate: 2}).then(() => {
                this.matches = [];
                this.speechRecognition.startListening(this.options)
                  .subscribe(
                        (matches: string[]) => {
                          this.matches = matches;
                          const response = this.confirmation(matches[0]);
                          if (response) {
                              this.tts.speak({text: this.speech('forward'), locale: this.language, rate: 2}).then(() => {});
                              this.matches = [];
                              this.speechRecognition.startListening(this.options)
                                  .subscribe(
                                    (matches: string[]) => {
                                      this.matches = matches;
                                      const response = this.confirmation(matches[0]);
                                      if (response) {
                                            this.startTravelListening(this.language);
                                        } else {
                                          this.tts.speak({text: this.speech('sayThanks'), locale: this.language, rate: 2}).then(() => {
                                            this.startTravelListening(this.language);
                                          });
                                        }
                                  });
                            } else {
                              this.tts.speak({text: this.speech('sayThanks'), locale: this.language, rate: 2}).then(() => {
                                this.startTravelListening('fr-FR');
                                this.matches = [];
                              });
                            }
                        });
                 });
              });
            }
          });
        });

      });
  }

  bestChoice(travels: any[]) {
    if (travels === []) {
      this.tts.speak({text: this.speech('notification'), locale: this.language, rate: 2}).then(() => {
        this.matches = [];
        this.speechRecognition.startListening(this.options)
          .subscribe(
                (matches: string[]) => {
                  this.matches = matches;
                  const response = this.confirmation(matches[0]);
                  if (response) {
                      this.tts.speak({text: this.speech('forward'), locale: this.language, rate: 2}).then(() => {
                        this.matches = [];
                        this.speechRecognition.startListening(this.options)
                          .subscribe(
                            (matches: string[]) => {
                              this.matches = matches;
                              const response = this.confirmation(matches[0]);
                              if (response) {
                                    this.startTravelListening(this.language);
                                } else {
                                  this.tts.speak({text: this.speech('sayThanks'), locale: this.language, rate: 2}).then(() => {
                                    this.startTravelListening(this.language);
                                  });
                                }
                          });
                      });
                    } else {
                      this.tts.speak({text: this.speech('sayThanks'), locale: this.language, rate: 2}).then(() => {
                        this.startTravelListening(this.language);
                        this.matches = [];
                      });
                    }
                });
      });
    }
    let passengers = [];
    for (let index = 0; index < travels.length; index++) {
      passengers.push(travels[index].NbPassagers);

      if (travels[index].NbPassagers === Math.max(...passengers)) {
        return travels[index];
      }
    }
  }
}

// ne pas oublier. c'est la revelation du siècle: lier le fichier nodeJs et le fichier PHP