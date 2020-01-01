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
var needle = require('needle');
var cheerio = require('cheerio');
const url = 'mongodb://localhost:27017/';
const dbName = 'playGame';

  const rez =   require("./public/modules/menuSearch");
  const parser =   require("./public/modules/parser");
  const base =   require("./public/modules/cnt_base.json");

app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )

app.get('/', (req, res) => {
  res.render ('country.ejs');
} );

(
  ()=>{
/*
      for (let i =1;i<116;i++){
        setTimeout((function(index){
          return function() {
            let url = 'https://umnik.net/tags/slozhnost-10000?page='+i;
             parser(url,i);
             console.log(i)
          };
        })(i), 2200 * (i + 1))
      };
      */
  }
)()

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
    for (i=0;i<hard*3;i++){
        countCountry.push(collectDB[randomNumber(0,collectDB.length)])
    }
    countCountry = _.countBy(countCountry)
  console.log(countCountry);
  //это отправлять на выдачу вопросов
console.log(Object.keys(countCountry)[0])
console.log(countCountry[Object.keys(countCountry)[0]]);
/*
    randomCountry(countries,hard+1)
      .then((item)=>{
        console.log(item)
  })
*/
}
)()
  app.post("/country", (req,res) => {
      //  console.log(req.body)
        db.collection('ezy').insertOne(req.body,(err,result)=>{
                  console.log(req.body)
                          if(err)
    {
    console.log(err);
    res.sendStatus(500);
    }
    res.redirect('/order')
          })
  })

    app.get('/1', (req, res) => {
            res.render ('index.ejs');
    } );

        app.get('/sendMenu', (req,res) => {
          rez('ezy', {})
          .then((items) =>{ res.send(items);
           })
             .catch((errorMessage)=>{
               console.log(errorMessage);
             });
      })

MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  db = client.db(dbName);
  app.listen(process.env.PORT || 3000, () => {
        console.log('--//API  start 3000--//');
      })﻿;
        });
