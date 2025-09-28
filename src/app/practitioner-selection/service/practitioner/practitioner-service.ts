import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  get userInfo(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : {
      "userId": "HUJB7V3V",
      "title": "Mr",
      "firstName": "Praveen",
      "lastName": "Madupathy",
      "middleName": "",
      "loginEmailAddress": "praveenm@healthcode.co.uk",
      "status": "ACTIVE",
      "homesite": {
        "id": "HC02242",
        "name": "My Skin Doctor UAT Test Site"
      },
      "sites": [
        {
          "siteId": "HC00GA2",
          "siteName": "Mr T Sample",
          "description": "HC00GA2 migrated from Veda",
          "siteType": "s"
        },
        {
          "siteId": "HC02242",
          "siteName": "My Skin Doctor UAT Test Site",
          "description": "Customer access only - not for internal use",
          "siteType": "c"
        },
        {
          "siteId": "HC02298",
          "siteName": "UK Clinic",
          "description": null,
          "siteType": "c"
        },
        {
          "siteId": "HC02499",
          "siteName": "Arete Hospitals",
          "description": "Arete Hospitals Mumbai",
          "siteType": "c"
        },
        {
          "siteId": "HC02500",
          "siteName": "Gleneagles Hospitals",
          "description": "Gleneagles Hospitals",
          "siteType": "s"
        },
        {
          "siteId": "HC02530",
          "siteName": "Central Health London",
          "description": "Customer user only no testing dat",
          "siteType": "c"
        },
        {
          "siteId": "HC02541",
          "siteName": "Jones Jonathan BD Site",
          "description": null,
          "siteType": "s"
        },
        {
          "siteId": "HCODE",
          "siteName": "Healthcode",
          "description": "HCODE migrated from Veda",
          "siteType": "h"
        }
      ]
    };
  }



  get getPractionerInfo(){
  const userData = localStorage.getItem('practitioner');
    return userData ? JSON.parse(userData) : null;
  }
}
