//import {inject, LogManager, ObserverLocator} from 'aurelia-framework';
// @inject( AuthServiceGTZ)
//var logger = LogManager.getLogger('DataService');
// @inject(AuthServiceGTZ, ObserverLocator)

'use strict';
import { TodoItem } from './todo-item';
import lodash from 'lodash';
import { AuthServiceGTZ } from '../services';
import { api } from '../utils/api';
import { inject } from 'aurelia-framework';

import Primus from '../scripts/primus';

import { ObserverLocator } from 'aurelia-binding';
// import { SailsSocketClient } from 'aurelia-sails-socket-client';

const ENTER_KEY = 13;
@inject(AuthServiceGTZ)

// const STORAGE_NAME = 'todomvc-aurelia';
export class Todos {

    static inject() { return [ObserverLocator]; }

    constructor(authgtz, observerLocator) {


        this.observerLocator = observerLocator;
        //    observerLocator.getObserver(this, 'includeArchived')
        //     .subscribe(() => this.getTodos());

        this.authgtz = authgtz;
        this.suspendSave = false;
        this.newTodoDescription = '';
        this.items = [];
        this.selectedlen = 0;
        this.includeArchived = false;
        this.indexes = [];
        this.getTodos();
        //   this.dataservice.addPropertyChangeHandler(this.propertyChanged.bind(this));
    }

    onSelectionChanged(e, idx) {
        console.log('e', idx, e.detail.isSelected)
        let selected = this.list.getSelected();
        this.selectedlen = selected.length;

        let titles = selected.map(i => i.title);

        if (e.detail.isSelected) {
            this.indexes.push(idx);
        }
        else {
            let apos = lodash.findIndex(this.indexes, function (file, pos) {
                if (file === idx) return pos;
            });
            if (apos !== -1) {
                this.indexes[apos].delete;
            }
        }
        this.logger.log('selection changed: ' + titles.join(', ') + '=' + this.indexes); //+'-' +idxs.join(', '));      // this.logger.log(`selection changed ${e.detail.item.name}`);
    }

    process() {



        let token = this.authgtz.token;
        let selected = this.list.getSelected();
        let counter = selected.length;
        lodash.forEach(selected, function (rec) {
            rec.status = 'closed';
            api.updateTodo(rec, token)
                .then((jsonRes) => {
                })
        });
        let items = this.items;


        for (var i = 0, len = this.indexes.length; i < len; i++) {
            this.items.splice(this.indexes[i], 1);
        }

        // if (selected.length>0) this.getTodos();// refresh as a temp solution
        this.selectedlen = 0;

    }

    get markAllCompleted() {
        return this.items.filter(x => !x.IsDone && !x.IsArchived).length === 0;
    }
    set markAllCompleted(newValue) {
        this.items.filter(x => !x.IsArchived).forEach(x => x.IsDone = newValue);
        this.save();
    }

    get archiveCompletedMessage() {
        var count = this.getStateOfItems().itemsDoneCount;
        if (count > 0) {
            return "Archive " + count + " completed item" + (count > 1 ? "s" : "");
        }
        return null;
    }

    get itemsLeftMessage() {
        var count = this.getStateOfItems().itemsLeftCount;
        if (count > 0) {
            return count + " item" + (count > 1 ? "s" : "") + " left";
        }
        return null;
    }

    archiveCompletedItems() {
        var state = this.getStateOfItems();
        this.suspendSave = true;
        state.itemsDone.forEach(item => {
            if (!this.includeArchived) {
                this.items.splice(this.items.indexOf(item), 1);
            }
            item.IsArchived = true;
        });
        this.suspendSave = false;
        this.save();
    }

    getTodos() {


        let token = this.authgtz.token;
        let user = this.authgtz.user;
        let userid = 11832;//this.authgtz.loginuserid;

        api.getTodostoken(userid, token)
            .then((jsonRes) => {

                this.items = jsonRes.data;// .data;
                console.log('Fetched Todos length' + jsonRes.data.length);//a.data);
                //   logger.info('Fetched Todos ' + (this.includeArchived ? 'including archived' : 'excluding archived'));
            })
    }

    addItem() {
        var description = this.newTodoDescription;
        if (!description) { return; }

        // var item = this.dataservice.createTodo({
        //     Description: description,
        //     CreatedAt: new Date(),
        //     IsDone: false
        // });
        //      "title" : "bs-111",
        // "status" : "open",
        // "user" : "11832",
        // "isComplete" : false,
        // "createdAt" : ISODate("2016-02-16T18:02:05.654Z"),
        // "updatedAt" : ISODate("2016-02-17T04:40:05.419Z"),
        // "open" : true,
        // "completed" : false,
        // "name" : "test2 of trails/mongodb"
        var item = ({
            title: description,
            name: 'trails demo ',
            user: "11832",
            status: 'open',
            open: true,
            completed: false,
            isComplete: false,
            IsDone: false,
            archivednote: ''

        });

        let token = this.authgtz.token;
        let user = this.authgtz.user;
        let userid = 11832;//this.authgtz.loginuserid;

        api.addTodo(userid, item, token)
            .then((data) => {
            });

        this.items.push(item);
        this.newTodoDescription = '';
    }

    editBegin(item) {
        //        item.isEditing = true;
        if (item.IsDone) {
            item.IsDone = false;
            //  item.IsArchived= false;
            item.archivednote = '';
        } else {
            item.IsDone = true;
            //  item.IsArchived= true;
            item.archivednote = 'maked for archive';
        }
        return
    }

    editEnd(item) {
        item.isEditing = false;
    }

    deleteItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
        //this.dataservice.deleteTodoAndSave(item);
    };

    getStateOfItems() {
        var itemsDone = [], itemsLeft = [];

        this.items.forEach(item => {
            if (item.IsDone) {
                if (!item.IsArchived) {
                    itemsDone.push(item); // only unarchived items
                }
            } else {
                itemsLeft.push(item);
            }
        });

        return {
            itemsDone: itemsDone,
            itemsDoneCount: itemsDone.length,
            itemsLeft: itemsLeft,
            itemsLeftCount: itemsLeft.length
        };
    }

    propertyChanged(changeArgs) {
        // propertyChanged triggers save attempt UNLESS the property is the 'Id'
        // because THEN the change is actually the post-save Id-fixup
        // rather than user data entry so there is actually nothing to save.
        if (changeArgs.args.propertyName !== 'Id') {
            this.save();
        }
    }

    purge() {
        return this.dataservice.purge(() => this.getTodos());
    }

    reset() {
        return this.dataservice.reset(() => this.getTodos());
    }

    save(force) {
        // Save if have changes to save AND
        // if must save OR save not suspended
        if (this.dataservice.hasChanges() && (force || !this.suspendSave)) {
            return this.dataservice.saveChanges();
        }
        // Decided not to save; return resolved promise w/ no result
        return new Promise((resolve, reject) => resolve(false));
    }
    activate() {
        // var primus = new Primus('http://localhost:8080/');
        // primus.on('news', function (data) {
        //     console.log(data);
        //     primus.send('my other event', { my: 'data' });
        // });
        //     let password = this.authgtz.password;
        //         let user = this.authgtz.user;
        //      primus.url.username = user
        //      primus.url.password = password
        //    // primus.url.auth = this.authgtz;//.token
        //const primus = Primus.connect('http://localhost:8080/');
        // const primus = new Primus('http://localhost:8080/');
        let token = this.authgtz.token;
        const primus = new Primus(`ws://localhost:8080?token=${token}`)

      
        primus.on('initialised', data => {
            console.log('initialised', data)
        });

        primus.on('connexion', data => {
            console.log('connexion', data)
        });

        primus.on('disconnect', data => {
            console.log('disconnect', data)
        });

        primus.on('create', (model, data) => {
            console.log('create', model, data);
            this._emitter.next({ command: 'create', type: model, item: data, id: data.id });
        });

        primus.on('update', (model, data) => {
            console.log('update', data);
            this._emitter.next({ command: 'update', type: model, item: data, id: data.id });
        });

        primus.on('destroy', (model, data) => {
            console.log('destroy', data);
            this._emitter.next({ command: 'destroy', type: model, item: data, id: data.id });
        });

        primus.on('notification', data => {
            this._notificationService.manageNotification(data)
            console.log('notification', data)
        });

        primus.on('error', data => {
            console.log(data);
            debugger;
        });

        primus.join('room');
        primus.join('device');
        primus.join('notification');





    }
}



//   process() {

//         setTimeout(function() {
//                             this.getTodos(); 
//                     }.bind(this),3000);

//     //     let token = this.authgtz.token;
//         let selected = this.list.getSelected();
//         let counter = selected.length;
//         lodash.forEach(selected, function (rec) {
//             rec.status = 'closed';
//             api.updateTodo(rec, token)
//                 .then((jsonRes) => {
//                     // this.items = jsonRes;
//                     // console.log('update Todos ');// + jsonRes);
//                     // apos = lodash.findIndex(items, function (file) {

//                     //     return (file.id === rec);
//                     // });

//                     // if (apos !== -1) {

//                     //     //this.items[apos].delete;
//                     //     this.items.remove(apos);
//                     // }

//                     // setTimeout(function () {
//                     //   //  console.log(index + ': ' + l);
//                     //     counter -= 1;
//                     //     if (counter === 0)
//                     //         this.getTodos();
//                     // }, l);
//                 })
//         });
//         // if (selected.length>0) this.getTodos();// refresh as a temp solution
//         this.selectedlen = this.selected.length;

//      }


  // setTimeout(function () {
        //     // uncheck all
        //     //  this.items.filter.forEach(x => x.IsDone = false);
        //     // this.items.filter(x => x.status==='open').forEach(x => x.IsDone = false);
        //     //   this.items.filter(x => x.status!=='xxx').forEach(x => x.IsDone = false);
        //     //  this.items.filter(x => x).forEach(x => x.IsDone = false);
        //     this.getTodos();
        //     this.items.filter(x => x).forEach(x => x.IsDone = false);
        // }.bind(this), 3000);

             // this.save(true).catch(
        //     () => {
        //         var index = this.items.indexOf(item);
        //         if (index > -1) {
        //             setTimeout(() => this.items.splice(index, 1), 2000);
        //         }
        //     });