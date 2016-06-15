import {Meteor} from 'meteor/meteor';
import {Orders} from '../../../api/orders/orders.js';
//Retorna todos los pedidos de una imagen de acuerdo a un id dado
Meteor.publish('Orders.get',function(idImage){
    return Orders.find({image:idImage});
})
