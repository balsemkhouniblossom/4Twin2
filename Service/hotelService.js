const mongoose = require('mongoose');
var Hotel = require('../Model/hotelModel')
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

const create =async (req,res,next)=>{
    const { name } = req.body 
    console.log(req.params.nbrRooms)
    const { nbrRooms } = req.params
    await new Hotel ({
        name: name,
        fabricationDate: new Date(),
        nbrRooms: nbrRooms,
}).save()
  .then((err,data)=>{
    if(err){
        console.log("error create Hotel: " +err);
    }
})
res.json('Hotel added ! name : '+ name + 'fabricationDate :'+ new Date() + 'nbrRooms :'+ nbrRooms)
}

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

module.exports = { create, list, deleteHotel,updateHotel,recherche};
