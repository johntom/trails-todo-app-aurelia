import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';

// let baseweb = 'http://localhost:3000/';
let baseweb = 'http://localhost:8080/api/';

// local or server
// let baseweb = 'http://www.gtz.com:9050/';


// @inject(HttpClient)
export var api = {
    // getUserJwt(username, pass) {
    //     var token = {};
    //     token.username = username;
    //     token.password = pass;
    //  //   var url = baseweb + 'auth/local';
    //   var url = baseweb + 'v1/auth/local';
  
    //     return fetch(url, {
    //         method: 'post',

    //         mode: 'cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(token)
    //         // }).then((res) => res.json());
    //     }).then((res) => {
    //         console.log('res ', res.json)
    //         res.json()
    //     })
    // },

 getUserJwt(username, pass) {
        var token = {};
        token.username = username;
        token.password = pass;
        var url = baseweb + 'v1/auth/local';
        console.log('url ', url)
        return fetch(url, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        }).then((res) => res.json());

    },



    getTodostoken(userid, token) {

        //  var url = `http://www.gtz.com:9012/api/todo/getclient/${userid}`;
        //  var url = `http://localhost:3000/api/todo/getclient/${userid}`;
        //  var url = `http://localhost:3000/api/v1/todo`;

        var url = baseweb + 'v1/todo';
        console.log('getTodostoken ')
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
        //justid.
        let mongodid = rowData.id;
        let url = baseweb + `v1/todo/${mongodid}`;
        return fetch(url, {
            method: 'put',
            //body: JSON.stringify(newnote)
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify(rowData)
        }).then((res) => res.json());
    },

    addTodo(userid, note, token) {

        //  var url = `http://www.gtz.com:9012/api/todo/${userid}`;

        let url = baseweb + 'v1/todo';
        return fetch(url, {
            mode: 'cors',
            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            }
            , body: JSON.stringify(note)

        }).then((res) => res.json());

    },


    updateuser(note, token) {
        userid = note.user;
        //  var url = `http://cm.brookbridgeinc.com:8005/api/users/${userid}`;
   //     var url = `http://www.gtz.com:9012/api/user/${userid}`;
   let url = baseweb + `v1/user/${userid}`;
        return fetch(url, {
            method: 'put',


            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify(note)
            //body: JSON.stringify(newnote)
        }).then((res) => res.json());
        //   return fetch(url, { mode: 'cors' }).then((res) => res.json())
    },

    getuser(userid, token) {
        // var url = `http://www.gtz.com:9012/api/getuser/${userid}`;
 let url = baseweb + `api/v1/getuser/${userid}`;
  
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
//   var url = 'http://www.gtz.com:9012/api/todo';//
//   return this._http.put(`${this.baseUrl}/api/v1/todo/${todo.id}`, JSON.stringify(todo), options)
//   .map(res => res.json()).toPromise().then(todo => this.getTodos().then(todos => this.todos = todos));

//  return this._http.post(`${this.baseUrl}/api/v1/todo`, JSON.stringify(todo), options)
//         .map(res => res.json()).toPromise().then(todo => this.getTodos().then(todos => this.todos = todos));
//     }
//     else {
//       return this._http.put(`${this.baseUrl}/api/v1/todo/${todo.id}`, JSON.stringify(todo), options)
//         .map(res => res.json()).toPromise().then(todo => this.getTodos().then(todos => this.todos = todos));
//     }

//    var token = {};
// var newnote = {};
// newnote.user = userid;
// newnote.title = note;
// newnote.status = 'open';
// newnote.open = 'true';
