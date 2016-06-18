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
var opciones = new ReactiveVar([]);
//Creamos una variable para saber si mostramos las opciones en el preview
var stateOpciones = new ReactiveVar(false);

function getTotal(){
    var items = opciones.get();
    var aux=0;
    for(i = 0;i<items.length;i++){
        aux=aux+items[i].valor;
    }
    return aux;
}

function isRegisterOption(id) {
    var items = opciones.get();
    var count = 0;
    for(i=0;i<items.length;i++){
        if(items[i].id == id){
            count++;
            break;
        }
    }
    if(count == 0){
        return false;
    }
    else {
        return true;
    }
}

Template.preview.onCreated(function (){
    this.autorun(()=>{
        if(FlowRouter.getParam('id')){
            ruta.set('/cfs/files/images/'+FlowRouter.getParam('id'));
            //Si podemos mostrar las opciones
            stateOpciones.set(true);
        }
        else{
            ruta.set('/preview.png');
            //Reiniciamos las variables reactivas
            opciones.set([]);
            stateOpciones.set(false);
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
    getState:function (){
        return stateOpciones.get();
    },
    getRuta:function (){
        return ruta.get();
    },
    getPrecioTotal:function (){
        return getTotal();
    },
    getTags:function (){
        if(FlowRouter.getParam('id')){
            var id = FlowRouter.getParam('id');
            var item = Orders.findOne({image:id});
            if(item){
                opciones.set(item.orders);
                return item;
            }
            return [];
        }
        else{
            return [];
        }
    },
});
//Eventos del template options
Template.options.events({
    'click .btn':function (event){
        event.preventDefault();
        var id = $(event.currentTarget).attr('id');
        var valor = parseInt($(event.currentTarget).attr('valor'));
        var text = $(event.target).text();
        var idImage = FlowRouter.getParam('id');
        if(!isRegisterOption(id)){
            Meteor.call('addOrder',id,valor,text,idImage);
            toastr.success("Etiqueta agregada");
        }
        else{
            toastr.warning("Ya registraste esta opción");
        }
    }
});
//Eventos del template preview
Template.preview.events({
    'click .tag':function (event){
        event.preventDefault();
        var id = $(event.currentTarget).attr('id');
        var idOrder = $(event.currentTarget).attr('idOrder');
        Orders.update(
            {'_id':idOrder},
            {'$pull':{'orders':{'id':id}}}
        );
        toastr.success("Se elimino la etiqueta");
    },
    'click .buy':function (event){
        event.preventDefault();
        alert("Esta funcion aun no esta implementada :( porque no intentas implementar!");
    }
});


