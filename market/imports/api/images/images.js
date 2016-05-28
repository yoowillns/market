/**
 * Created by Willians on 27/05/2016.
 */
import {Mongo} from 'meteor/mongo';

export const Images = new FS.Collection("images",{
   stores: [new FS.Store.FileSystem("media")]
});
