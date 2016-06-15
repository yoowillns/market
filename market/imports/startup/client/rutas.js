/**
 * Created by Willians on 22/05/2016.
 */
//Routes
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Meteor} from  'meteor/meteor';
//Importar Layouts y templates
import '../../ui/layouts/layout.js';
import '../../ui/home/home.js';
import '../../ui/user/register.js';
import '../../ui/user/login.js';
//importar templates de images
import '../../ui/images/dropzone.js';
import '../../ui/images/preview.js';

//Ruta para el home
FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('layout', { main: 'home',section :'register' });
    }
});
//Ruta para las imagenes
FlowRouter.route('/images/', {
    name: 'images',
    action() {
        BlazeLayout.render('layout', { main: 'dropzone',section :'preview'});
    }
});
//Ruta que recube el id de la imagen
FlowRouter.route('/images/:id',{
    name:'image',
    action(){
        BlazeLayout.render('layout', { main: 'dropzone',section :'preview',subnav :'options' });
    }
});
//Ruta para el login
FlowRouter.route('/login/', {
    name: 'login',
    action() {
        BlazeLayout.render('layout', { main: '',section :'login' });
    }
});
//Ruta para el registro
FlowRouter.route('/register/', {
    name: 'home',
    action() {
        BlazeLayout.render('layout', { main: '',section :'register' });
    }
});