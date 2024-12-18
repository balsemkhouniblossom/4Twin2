
var mongoose = require('mongoose')
const Schema  = mongoose.Schema

var Hotel = new Schema(
    {   name:String,
        fabricationDate:Date,
        nbrRooms: Number
})
module.exports = mongoose.model('hotels', Hotel)