import {Meteor} from 'meteor/meteor';
import {Images} from '../../../api/images/images.js';
//Retorna todas las imagenes en un limite dado
Meteor.publish('Images.all',function(limit){
    return Images.find({},{limit:limit});
})