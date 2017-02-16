// import {bindable} from 'aurelia-framework';

// export class NavBar {
//   @bindable router = null;

//   attached() {
//     $('.button-collapse').sideNav();
//   }
// }
import {bindable} from 'aurelia-framework';

import {inject} from 'aurelia-framework';
import {   AuthServiceGTZ } from './services';


@inject(AuthServiceGTZ)

export class NavBar {
     _isAuthenticated = false;

    @bindable router = null;

  
  

    constructor( authgtz) {
      
        this.authgtz = authgtz;
    }
    get isAuthenticated() {
        //console.log('this.authgtz.loginuserid',this.authgtz.loginuserid)
        return this.authgtz.loginuserid === "" ? false : true;
    }

  attached() {
        $('.button-collapse').sideNav();
    }
}
