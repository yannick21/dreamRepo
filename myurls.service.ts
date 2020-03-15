import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyurlsService {

  /*retrieveUrl = 'http://www.ivoiturage.com/server/retrieve-data.php';
   manageUrl = 'http://www.ivoiturage.com/server/manage-data.php';*/

   retrieveUrl = 'http://localhost/dream/server/retrieve-data.php';
   manageUrl = 'http://localhost/dream/server/manage-data.php';
  constructor() { }
}
