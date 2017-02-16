import {  HttpClient } from 'aurelia-http-client';
import {  inject, singleton} from 'aurelia-dependency-injection';

@inject( HttpClient)

export class DataService {
//   url = 'http://cm.brookbridgeinc.com:8004/api/users?token=eyJhbGciOiJIUzI1NiJ9.NTNmMTY3NjllZTk5YTBmMDFlYWM0N2Q4.cx_Qv913lp4Q7lj-QsQUJ8w4DdDM16SRv3_BzraUPrc';
//   users = [];
//   constructor( http) {
//     this.http = http;
//    }

//   getData(){
//     return this.http.get(this.url).then(response => {
    
//     })

//   }
}

export class AuthServiceGTZ {

  constructor() {
    this.user = '';
    this.email ='';
    this.loginuserid = '';
    this.roleid = '';
    this.users = [];
    this.article={}; // put artile here
    this.isAuthenticated='';
     this.serverType='local'; // or server
     this.password='';
  }

  isLoggedIn(){
      return this.user !== '';
  }
}
