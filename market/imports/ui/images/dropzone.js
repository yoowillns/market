/**
 * Created by Willians on 27/05/2016.
 */
import {ReactiveVar} from 'meteor/reactive-var';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
//Importar images de la api
import {Images} from '../../api/images/images.js';
import {Orders} from '../../api/orders/orders.js';
//Importar templates
import './dropzone.html';
import './preview.html';
//Crear las variables reactivas
var images = new ReactiveVar();
var limit = new ReactiveVar(0);
//Configurar las notificaciones
toastr.options = {
    "positionClass": "toast-bottom-right",
}
//Suscribir Images
Template.dropzone.onCreated(function(){
    Meteor.call('getImagesCount',function(err, count){
        limit.set(count);
    });
    this.autorun(()=>{
        this.subscribe('Images.all',limit.get());
    });
});

//Crear la variable de session
Template.dropzone.helpers({
    dropStatus:function () {
        return Session.get('dropStatus');
    },
    allImages:function (){
        images.set(Images.find({state:false}));
        return images.get();
    }
});
//Eventos del template
Template.dropzone.events({
    'dragover #dropzone':function(event){
        event.preventDefault();
        Session.set('dropStatus','active');
    },
    'dragleave #dropzone':function(event){
        event.preventDefault();
        Session.set('dropStatus');
    },
    'drop #dropzone':function(event){
        event.preventDefault();
        Session.set('dropStatus');
        FS.Utility.eachFile(event, function(file){
           var newFile = new FS.File(file);
            //Creamos un nuevo campo en la imagen
            newFile.state = false;
            Images.insert(newFile, function(error, fileObj){
                if(error){
                    toastr.error("Error al subir la imagen");
                }
                else{
                    //Si se sube la imagen creamos automaticamente un nueva orden vacia con el id de la imagen
                    Orders.insert({
                       image:fileObj._id,
                        orders: [{
                            text:'Ninguno',
                        }]
                    });
                    toastr.success("Se subio el archivo");
                    setTimeout(function(){
                        limit.set(limit.get()+1);
                    },2000);
                }
            })
        })
    },
    'click .remove':function (event){
        event.preventDefault();
        Images.remove(this._id);
    }
});

