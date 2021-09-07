
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var modules = re
    
var productSchema = new schema({
    "uId":  String,
    "cId":  String,
    "cName":  String,
    "cPrice":  String,
    "cImgSrc":  String,
    "cQuantity": Number,
    "cStatus": {type: Boolean, default: false
})
