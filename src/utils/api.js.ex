import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
//  let base = 'http://localhost:3000/';
let base = 'http://www.gtz.com:9050/';
// @inject(HttpClient)
export var api = {
  
    // getUserJwt(username, pass) {
    //     var token = {};
    //     token.username = username;
    //     token.password = pass;

    //     var url = 'http://www.gtz.com:9012/api/auth/signin';

    //     return fetch(url, {
    //         method: 'post',

    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(token)

    //     }).then((res) => res.json());

    // },

    // getTodostoken(userid, token) {

    //     var url = `http://www.gtz.com:9012/api/todo/getclient/${userid}`;
    //     return fetch(url, {
    //         mode: 'cors',
    //         method: 'get',
    //         headers: {

    //             'Content-Type': 'application/json',
    //             'Authorization': 'JWT ' + token
    //         }
    //     }).then((res) => res.json());
    // },



    getUserJwtTrails(username, pass) {
        var token = {};
        // token.email = email;
        token.username = username;
        token.password = pass;
       
       
        //  var url = 'http://www.gtz.com:9050/auth/local';
        // var url = 'http://localhost:3000/auth/local';
        var url = base + 'auth/local';

        return fetch(url, {
            method: 'post',
            // mode: 'cors', //sails
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        }).then((res) => res.json());
        //  }).then((res) => console.log('res ',res.json() ) )
       
         
    },

    getTodostokenTrails(userid, token) {
      
        //  var url = `http://www.gtz.com:9012/api/todo/getclient/${userid}`;
        //s   var url = `http://localhost:3000/api/todo/getclient/${userid}`;
        // var url = `http://localhost:3000/api/v1/todo`;

        var url = base + 'api/v1/todo';

        return fetch(url, {
            mode: 'cors',
            method: 'get',
            headers: {
                             
                'Authorization': 'JWT ' + token,
                'Accept': 'application/json',
            }
        }).then((res) => res.json());
    },

    updateTodo(rowData, token) {
        var justid = {};
        justid.mongodid = rowData.id;
        var url = 'http://www.gtz.com:9012/api/todo';//
        return fetch(url, {
            method: 'put',
            //body: JSON.stringify(newnote)
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token

            },
            body: JSON.stringify(justid)
        }).then((res) => res.json());
    },


    addTodo(userid, note, token) {
        //    var token = {};
 
        // var newnote = {};
        // newnote.user = userid;
        // newnote.title = note;
        // newnote.status = 'open';
        // newnote.open = 'true';
       
        //  var url = `http://www.gtz.com:9012/api/todo/${userid}`;
        var url = 'http://www.gtz.com:9012/api/todo';

        return fetch(url, {
            mode: 'cors',
            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            }
            , body: JSON.stringify(note)   //newnote)

        }).then((res) => res.json());

    },
    
    // body: JSON.stringify({data:newnote})

    updateuser(note, token) {
        userid = note.user;
        //  var url = `http://cm.brookbridgeinc.com:8005/api/users/${userid}`;
        var url = `http://www.gtz.com:9012/api/user/${userid}`;

        return fetch(url, {
            method: 'put',
             
            //body: JSON.stringify(newnote)
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify(note)

        }).then((res) => res.json());
        //   return fetch(url, { mode: 'cors' }).then((res) => res.json())
    },

    getuser(userid, token) {
        var url = `http://www.gtz.com:9012/api/getuser/${userid}`;

        return fetch(url, {
            mode: 'cors',
            method: 'get',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            }

        }).then((res) => res.json());


    },
    getTodos(userid) {
        var url = `http://cm.brookbridgeinc.com:8004/api/todoclient/${userid}?token=eyJhbGciOiJIUzI1NiJ9.NTNmMTY3NjllZTk5YTBmMDFlYWM0N2Q4.cx_Qv913lp4Q7lj-QsQUJ8w4DdDM16SRv3_BzraUPrc`;
        return fetch(url).then((res) => res.json())
    }
}
