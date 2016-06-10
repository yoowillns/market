import {Meteor} from 'meteor/meteor';
import {Images} from '../../../api/images/images.js';




Meteor.publish('Images.all',function(limit){
    return Images.find({},{limit:limit});
})