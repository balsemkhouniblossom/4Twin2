var express = require('express')
var router= express.Router()
const {list,create, deleteHotel, updateHotel, recherche} = require('../Service/hotelService')

router.get('/list', list)
router.post('/create', create)
router.delete('/:id', deleteHotel)
router.put('/update/:id', updateHotel);
router.get('/recherche', recherche);

module.exports = router;

