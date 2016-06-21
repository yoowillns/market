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
var dropStatus = new ReactiveVar('dropStatus');
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
        //Subscribimos el metodo, para acceder a las ordenes
        this.subscribe('Orders.all');
    });
});

//Crear la variable de session
Template.dropzone.helpers({
    dropStatus:function () {
        return dropStatus.get();
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
        dropStatus.set('active')
    },
    'dragleave #dropzone':function(event){
        event.preventDefault();
        dropStatus.set('dropStatus');
    },
    'drop #dropzone':function(event){
        event.preventDefault();
        dropStatus.set('dropStatus');
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
                            id : '0',
                            valor : 0,
                            text:'Por defecto',
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
        var idImage = this._id;
        //Recuperamos el id de la Orden mediante la imagen que se eliminara (Importante tener subscrito la coleccion Orders - linea 29)
        var idOrder=Orders.findOne({'image':idImage})._id;
        Images.remove(idImage);
        //Eliminamos la orden
        Orders.remove(idOrder);
        toastr.success("Se elimino la imagen");
        if(FlowRouter.getParam('id')){
            //Si estamos en la url de una imagen recuperamos el id
            var idImageURL = FlowRouter.getParam('id');
            if(idImage == idImageURL){
                //Si el id de la imagen es el mismo de la url redireccionamos a la url images
                FlowRouter.go('/images/');
            }
            //Si no son iguales lo mantenemos en la misma pagina ya que elimino otra imagen
        }
    }
});

