const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    nuevo: (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render("moviesAdd")
    },
    create: function (req, res) {
        let id= Date.now()
     let error=validationResult(req)
       const {title,rating,awards,release_date,length}=req.body
          if(error.isEmpty()){
            db.Movie.create(
                {
                 title:title,
                 rating:rating,
                 awards:awards,
                 release_date:release_date,
                 length:length}
             )
         .then(resultado=>{
             res.redirect("/movies")
         })
          .catch(error=>{
             res.send(error)
          }) }
          else{
            res.render('moviesAdd', { errors:error.array(), old:req.body, title: "registro" });
          }
        
    },
    edit: function(req, res) {
        db.Movie.findByPk(req.params.id)
        .then(resultado=>{
            res.render("moviesEdit",{Movie:resultado,id:req.params.id})
        })
     .catch(error=>{res.send(error)})
    },
    update: function (req,res) {
        console.log("hola")
        let error=validationResult(req)
        const {title,rating,awards,release_date,length}=req.body 

        if(error.isEmpty()){
db.Movie.update({
            title:title,
            rating:rating,
            awards:awards,
            release_date:release_date,
            length:length
        },{
            where:{id:req.params.id}
        })
        .then(resultado=>{
            res.redirect("/movies")
        })
        .catch(error=>{
            res.send(error)
        })

        }
        else{
            db.Movie.findByPk(req.params.id)
            .then(resultado=>{
                res.render("moviesEdit",{Movie:resultado,id:req.params.id,old:req.body,errors:error.array()})
            })
         .catch(error=>{res.send(error)})
           
        }
        
    },
    borrar: function (req, res) {
        let id=req.params.id
        db.Movie.findByPk(id)
        .then(resultado=>{
            res.render("moviesDelete",{Movie:resultado})
        })
        .catch(error=>{res.send(error)})

    },
    destroy: function (req, res) {
      let id=req.params.id
      db.Movie.destroy({
        where:{id:id}
      })
      .then(resultado=>{
        res.redirect("/movies")
      })
      .catch(error=>{res.send(error)})
    }

}

module.exports = moviesController;