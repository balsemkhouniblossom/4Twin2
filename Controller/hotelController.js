var express = require('express')
var router= express.Router()
const {list,create, deleteHotel, updateHotel, recherche, addRoomToHotel,showHotels} = require('../Service/hotelService')

router.get('/list', list)
router.post('/create', create)
router.delete('/:id', deleteHotel)
router.put('/update/:id', updateHotel);
router.get('/recherche', recherche);
router.post('/addRoomToHotel', addRoomToHotel);
router.get('/showHotels', showHotels);

module.exports = router;


