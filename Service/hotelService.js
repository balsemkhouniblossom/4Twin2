const mongoose = require('mongoose');
var Hotel = require('../Model/hotelModel')
var socketIo = require('socket.io')

const addRoomToHotel = async (hotelId, roomDetails) => {
    try {
        console.log("Attempting to add room with hotel ID:", hotelId);  // Log the ID for debugging
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            throw new Error(`Invalid hotel ID format: ${hotelId}`);
        }
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            throw new Error(`Hotel with ID ${hotelId} not found`);
        }

        hotel.rooms.push(roomDetails);
        await hotel.save();

        return { message: "Room added successfully", hotel: hotel };
    } catch (err) {
        console.error("Error adding room:", err.message);  // Log the error message
        throw err;  // Re-throw the error for the controller to handle
    }
};

async function list(req,res,next){
   await Hotel.find()
   .then((err,data) => {
    if(err){
        res.status(503).json(err)
    }else{
        res.status(200).json(data)
    }
 })
}

function socketIO(server) {
    const io = socketIo(server);
    io.on("connection", (socket) => {
        console.log("Hotel connected with socket id" + socket.id);
        
        socket.on('addRoom', async ({ hotelId, room }) => {
            try {
                const result = await addRoomToHotel(hotelId, room);
                socket.emit('roomAdded', result);
            } catch (error) {
                socket.emit('roomAddError', { error: error.message });
            }
        });

        io.emit("msg", "msg from server");
    });
    return io;
}

   
function showHotels(req,res,next){
    res.render('hotels')
    }

const deleteHotel = async (req, res, next) => {
    const { id } = req.params; // Récupération de l'ID depuis les paramètres de requête
    try {
        // Vérifie si l'ID est valide (exemple : ObjectId pour MongoDB)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID Hotel invalide" });
        }
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel non trouvé" });
        }
        // Réponse en cas de succès
        res.status(200).json({
            message: "Hotel supprimé avec succès",
            hotel: deleteHotel, 
        });
    } catch (err) {
        // Gestion des erreurs
        console.error("Erreur lors de la suppression de l'hotel :", err);
        res.status(503).json({
            message: "Erreur lors de la suppression de l'hotel",
            error: err.message,
        });
    }
};

const create = async (req, res, next) => {
    const { name, fabricationDate, nbrRooms } = req.body;
    try {
        const hotel = new Hotel({ name, fabricationDate, nbrRooms });
        await hotel.save();
        res.status(201).json({ message: 'Hotel added!', hotel: hotel });
    } catch (err) {
        console.log("Error creating hotel:", err);
        res.status(400).json({ message: "Error creating hotel", error: err.message });
    }
};

async function updateHotel(req,res,next){
   Hotel.findByIdAndUpdate(req.params.id,req.body)
   .then((data,err)=>{
    if(err){response.status(500).json(err)}
    res.status(200).json(data)
   })
}

async function recherche(req,res,next){
    await Hotel.find({ nbrRooms: { $gte: 10, $lte: 100 } })
    .then((data,err)=>{
        if(err){
        res.status(503).json(err)}
        else{
            res.status(200).json(data)
        }
    })
}

module.exports = { create, list, deleteHotel,updateHotel,socketIO,recherche, addRoomToHotel,showHotels };
