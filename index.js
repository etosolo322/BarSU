const collectDB = ["animals", "cinema", "geography", "history", "human", "literature", "multsComics", "music", "programming", "science", "society", "sport"];
const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const _ = require('underscore');
var path = require('path');
var fs = require('fs');
var async = require('async');

const url = 'mongodb://localhost:27017/';
const dbName = 'playGame';

var massivZaskazov = {};
const massMenu = [];
  const rez =   require("./public/modules/menuSearch");
  const base =   require("./public/modules/cnt_base.json");
  var massiv = [];

app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )


app.get('/sendMenu', (req,res) => {
  rez('country', {})
  .then((items) =>{ res.send(items);
   })
     .catch((errorMessage)=>{
       console.log(errorMessage);
     });
})
app.get('/', (req, res) => {

  res.render ('country.ejs');
} );
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
function randomNumber(min,max){
  return Math.floor(Math.random() * (max-1 - min + 1)) + min
}

function randomCountry(coutry,count){

    return new Promise ((resolve, reject) => {
        let resultCountry = [];
        rez("country", {"country":String(coutry)})
          .then((item) =>{
          //console.log(base.countriesBase[0].id)

        for (let i = 0; i < count; i++){
            let peremennaya = item[randomNumber(0,item.length)]
        //    console.log(peremennaya._id)
            let  errors = 0;
            for (j = -1; j < resultCountry.length; j++) {
                if (peremennaya == resultCountry[j]) {
                  errors = 1;
                  i--;
            }
           }
          if (errors != 1) {
          //  console.log(i);
            resultCountry.push(peremennaya);
          }
        }
      //console.log(resultCountry)
      resolve(resultCountry);
      })
  })
};

  let countries ="80500";
  let hard = 0;

    for (let z=0; z<base.countriesBase.length;z++){
      if (base.countriesBase[z].id == countries){
        hard = base.countriesBase[z].challenge;

      }
  }

( ()=>{
let countCountry = []
    for (i=0;i<10;i++){
        countCountry.push(collectDB[randomNumber(0,collectDB.length)])
    }
console.log(countCountry);
console.log(_.countBy(countCountry));
let countObject = []



    randomCountry(countries,hard+1)
      .then((item)=>{
        console.log(item)
  })

}
)()

    MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection =db.collection('country');
      app.post("/country", (req,res) => {
      //  console.log(req.body)
        collection.insertOne(req.body,(err,result)=>{
                  console.log(req.body)
                          if(err){
                            console.log(err);
                            res.sendStatus(500);
                          }
    res.redirect('/order')
                      })
            })
    });

    app.get('/1', (req, res) => {
            res.render ('index.ejs');
    } );


        app.get('/sendMenu', (req,res) => {
          rez('menu', {})
          .then((items) =>{ res.send(items);
           })
             .catch((errorMessage)=>{
               console.log(errorMessage);
             });
      })


app.get('/admin', (req,res) => {

  rez('order', {})
  .then((items) =>{ //console.log(items);
     res.render ('admin.ejs', {post:items});})
     .catch((errorMessage)=>{
       console.log(errorMessage);
     });
    })


    MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db("heroku_m3c7r3j8");
    const collection =db.collection('armor');
      app.post("/armor", (req,res) => {
                collection.insertOne(req.body,(err,result)=>{
                          if(err){
                            console.log(err);
                            res.sendStatus(500);
                          }
                          res.redirect('/armor')
                      })
          })
    });

              app.get('/admin/armor/:id', (req,res) => {

                rez('armor', {_id:req.params.id})
                    .then((item) =>{
                       res.render('armorSolo.ejs',{post:item});

                     })
                       .catch((errorMessage)=>{
                         console.log(errorMessage);
                    });
              })

              MongoClient.connect(url, (err, client) => {
              assert.equal(null, err);
              const db = client.db("heroku_m3c7r3j8");
              const collection =db.collection('menu');
                app.post("/admin", (req,res) => {
                      console.log(req.body)
                         collection.update(
                             {_id: String(req.body._id) },
                             {name: req.body.name,
                              discription:req.body.discription,
                              img:req.body.img,
                              kind:req.body.kind,
                              price:req.body.price,
                              weight:req.body.weight
                             }
                             ,{ upsert: true },
                             function(err, result){
                               console.log(err);
                             }

                           );
                          res.redirect('/admin')

                     }) ;
                   })

                    app.listen(process.env.PORT || 3000, () => {
                        console.log('--//API  start 3000--//');

                      })﻿;
