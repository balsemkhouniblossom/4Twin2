
var mongoose = require('mongoose')
const Schema  = mongoose.Schema

var Hotel = new Schema(
    {   name:String,
        fabricationDate: {
            type: Date,
            default: () => new Date() // Default to current date if not provided
        },
        nbrRooms: {
            type: Number,
            min: 0,
            default: 10  
        }
    });
    
module.exports = mongoose.model('hotels', Hotel)