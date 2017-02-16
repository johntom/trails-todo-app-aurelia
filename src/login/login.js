import { inject } from 'aurelia-dependency-injection';
import { ComponentService } from '../shared/component-service';
import { api } from '../utils/api';
import { AuthServiceGTZ } from '../services'
import { lodash } from 'lodash';
import { Router, Redirect } from 'aurelia-router';

@inject(AuthServiceGTZ, Router, Redirect)
export class Login {

    heading = 'Login';
    headingLogin = 'please login';

    password = '';

    constructor(authgtz, router, redirect) {

        this.authgtz = authgtz;
        this.authgtz.isAuthenticated = false;
        this.authgtz.loginuserid = "";
        this.message = "Security";
        this.theRouter = router;

    }

    //  activate(params, queryString, routeConfig) {

    // this.param = routeConfig.params.childRoute;
    // if (   this.param === undefined )    this.param =0;
    // if (this.authgtz.users.length === 0) {
    //     return api.getUsers().then((jsonRes) => {
    //         this.users = jsonRes.data;
    //   })
    // } else {
    //     this.users = this.authgtz.users;
    // }

    // }

    login() {

        let apos = '';

        let em = this.email;//.toUpperCase(); //upperCase toUpper lodash.toUpper(
        let pass = this.password;
        api.getUserJwt(em, pass)
            .then((jsonRes) => {
                console.log('jsonRes', jsonRes)
                if (jsonRes === undefined) {
                    this.authgtz.isAuthenticated = false;
                    this.authgtz.loginuserid = "";
                    this.authgtz.user = '';
                    this.headingLogin = 'Please check useranme or password ';



                } else
                    if (jsonRes.code === "E_WRONG_PASSWORD") {


                        this.authgtz.isAuthenticated = false;
                        this.authgtz.loginuserid = "";
                        this.authgtz.user = '';
                        this.headingLogin = 'Please check useranme or password ';

                    } else {
                        this.authgtz.token = jsonRes.token;
                        this.authgtz.user = jsonRes.user.username;
                        this.authgtz.password = pass
                        this.authgtz.loginuserid = jsonRes.user.id;
                        // if (jsonRes.data.token.length > 10) {
                        this.authgtz.isAuthenticated = true;
                        this.serverType = 'local';
                        this.theRouter.navigate("todo/index");
                    }




            });

    }


    attached() {
        Materialize.updateTextFields();


    }

}
