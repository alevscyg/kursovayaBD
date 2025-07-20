const Router = require('express')
const router = new Router()
const kursovayaController = require('../controllers/kursovaya.controller.js')
/////////////////////////////-----------------Musician-------------------//////////////////////////////////////
router.post('/createMusician', kursovayaController.createMusician)
router.put('/updateMusician/:id', kursovayaController.updateMusician)
router.delete('/deleteMusician/:id', kursovayaController.deleteMusician)
/////////////////////////////-----------------Song-------------------//////////////////////////////////////
router.post('/createSong', kursovayaController.createSong)
router.put('/updateMSong/:id', kursovayaController.updateMSong)
router.delete('/deleteSong/:id', kursovayaController.deleteSong)
/////////////////////////////------------------Award_of_song------------------//////////////////////////////////////
router.post('/createAward_of_song', kursovayaController.createAward_of_song)
router.put('/updateAward_of_song/:id', kursovayaController.updateAward_of_song)
router.delete('/deleteAward_of_song/:id', kursovayaController.deleteAward_of_song)

router.get('/getTop10Musicians', kursovayaController.getTop10Musicians)
router.get('/getTheNumberOfSongsForTheSpecifiedYear/:year', kursovayaController.getTheNumberOfSongsForTheSpecifiedYear)
router.post('/getTopAlbum', kursovayaController.getTopAlbum)
router.get('/getMusiciansByAlphabetOrder/:years', kursovayaController.getMusiciansByAlphabetOrder)

module.exports = router