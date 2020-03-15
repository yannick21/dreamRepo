import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsTransfertService implements OnInit{
  data = {coords: []};
  constructor() { }

  getData(dataName: string){
   if(dataName === 'coords'){
     return this.data.coords;
   }
  }

  setData(dataName: string, dataValue: any) {
    if (dataName === 'coords') {
      this.data.coords = dataValue;
    }
  }

  ngOnInit() {}
}
