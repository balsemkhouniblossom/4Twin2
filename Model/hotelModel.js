
var mongoose = require('mongoose')
const Schema  = mongoose.Schema

var RoomSchema = new Schema({
    roomNumber: { type: String, unique: true },
    type: { type: String, },
    price: { type: Number,}
});

var Hotel = new Schema(
    {   name:String,
        fabricationDate: {
            type: Date,
            default: () => new Date() 
        },
        nbrRooms: {
            type: Number,
            min: 0,
            default: 10  
        },
        rooms: [RoomSchema]
    });
    
module.exports = mongoose.model('hotels', Hotel)