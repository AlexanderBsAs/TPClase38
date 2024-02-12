const express = require('express');
const router = express.Router();
const {add,create,edit,update,list,recomended,detail,nuevo,borrar,destroy} = require('../controllers/moviesController');
const {validacionCreate} = require("../validations/productsValidator")
router.get('/movies', list);
router.get('/movies/new', nuevo);
router.get('/movies/recommended', recomended);
router.get('/movies/detail/:id', detail);


//Rutas exigidas para la creación del CRUD
router.get('/movies/add', add);
router.post('/movies/create',validacionCreate, create);
router.get('/movies/edit/:id', edit);
router.put('/movies/update/:id',validacionCreate, update);
router.get('/movies/delete/:id',borrar);
router.delete('/movies/delete/:id',destroy);

module.exports = router;