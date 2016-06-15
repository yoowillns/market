/**
 * Created by Willians on 14/06/2016.
 */

import {ReactiveVar} from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router'
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
//Importar images de la api
import {Images} from '../../api/images/images.js';
import {Orders} from '../../api/orders/orders.js';
//Importar templates
import './dropzone.html';
import './preview.html';


var ruta = new ReactiveVar("");

Template.preview.onCreated(function (){
    this.autorun(()=>{
        if(FlowRouter.getParam('id')){
            ruta.set('/cfs/files/images/'+FlowRouter.getParam('id'));
        }
        else{
            ruta.set('/preview.png');
        }
    });
});

Template.options.onCreated(function (){
    this.autorun(()=>{
        //Recuperamos el id de la ruta
        var id = FlowRouter.getParam('id');
        this.subscribe('Orders.get',id);
    });
});

Template.preview.helpers({
    getRuta:function (){
      return ruta.get();
    },
    getTags:function (){
        if(FlowRouter.getParam('id')){
            var id = FlowRouter.getParam('id');
            var item = Orders.findOne({image:id});
            if(item){
                return item.orders;
            }
            return [];
        }
        else{
            return [];
        }
    },
});

Template.options.events({
    'click .btn':function (event){
        event.preventDefault();
        var value = event.target.value;
        var text = $(event.target).text();
        //$('.tags').append(text);
        var id = FlowRouter.getParam('id');
        Meteor.call('addOrder',text,id);
    }
});


