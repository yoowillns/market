import { Mongo } from 'meteor/mongo';
//Creamos una nueva collecion para almacenar las opciones elegidas para cada imagen
export const Orders = new Mongo.Collection('orders');


