/**
 * Created by Willians on 22/05/2016.
 */
import {Router} from 'meteor/iron:router';
import {Meteor} from  'meteor/meteor';
//Importar Layouts y templates
import '../../ui/layouts/layout.js';
import '../../ui/home/home.js';
import '../../ui/user/register.js';
import '../../ui/user/login.js';
//importar templates de images
import '../../ui/images/dropzone.js';

//Configurar Layouts
Router.configure({
    layoutTemplate:'layout',
});
//Ruta para el home
Router.route('/',function() {
    this.render('home');
    this.render('register',{to: 'section'});
});
//Ruta para las imagenes
Router.route('/images',function() {
    this.render('dropzone');
    this.render('preview',{to: 'section'});
});
//Ruta para el login
Router.route('/login/',function(){
    this.render('login',{to:'section'});
})
//Ruta para el registro
Router.route('/register/',function(){
    this.render('register',{to:'section'});
})