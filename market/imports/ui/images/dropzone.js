/**
 * Created by Willians on 27/05/2016.
 */
import {ReactiveVar} from 'meteor/reactive-var';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
//Importar images de la api
import {Images} from '../../api/images/images.js';
//Importar templates
import './dropzone.html';
import './preview.html';
//Crear las variables reactivas
var images = new ReactiveVar();
//Configurar las notificaciones
toastr.options = {
    "positionClass": "toast-bottom-right",
}
//Crear la variable de session
Template.dropzone.helpers({
    dropStatus:function () {
        return Session.get('dropStatus');
    },
    allImages:function (){
        images.set(Images.find());
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
            Images.insert(newFile, function(error, fileObj){
                if(error){
                    toastr.error("Error al subir la imagen");
                }
                else{
                    toastr.success("Se subio el archivo");
                    setTimeout(function(){
                        var ruta = "/cfs/files/images/"+fileObj._id;
                        var html="<img src='"+ruta+"' class='img-thumbnail'>";
                        $("#preview-image").attr('src',ruta);
                    },2000);
                }
            })
        })
    }
});

