/**
 * Created by Willians on 27/05/2016.
 */
import {Meteor} from 'meteor/meteor';
import {Images} from './images.js';

Images.allow({
    insert:function(){
        return true;
    },
    update:function(){
        return true;
    },
    remove:function(){
        return true;
    },
    download:function(){
        return true;
    }
});

Meteor.methods({
    getImagesCount:function(){
        return Images.find().count();
    }
});