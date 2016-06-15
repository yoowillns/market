/**
 * Created by Willians on 14/06/2016.
 */
import { Orders } from './orders.js';
import { Meteor } from 'meteor/meteor';
//Creamos un metodo que agrega una nueva orden a una imagen dado un id
Meteor.methods({
    addOrder:function(orderText, imageID){

        Orders.update({image:imageID},{
            $push:{
                orders:{
                    text: orderText
                }
            }
        });
    },
});