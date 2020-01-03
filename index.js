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

  const parser =   require("./public/modules/parser");
  const baseList =   require("./public/modules/cnt_base.json");

app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )

app.get('/', (req, res) => {

  countryPath(countries)
  picturePath(countries)
  neighbourCountry(countries)

          //вопросы по страну
        randomCountry(countries,hard+1)
          .then((item)=>{
          //  console.log(item)
            res.send (item);

          })

} );

  let countries ="571802";
  let hard = 0;

const nameCountry = (country) =>{
  for (let i=0;i<baseList.countriesBase.length;i++){
    if (baseList.countriesBase[i].id == country){
      return baseList.countriesBase[i].name;
    }
  }
}

//сложность вопроса
    for (let z=0; z<baseList.countriesBase.length;z++){
      if (baseList.countriesBase[z].id == countries){
        hard = baseList.countriesBase[z].challenge;
      }
  }

const neighbourCountry = (country) =>{
  for (let i=0;i<baseList.countriesBase.length;i++){
    if (baseList.countriesBase[i].id == country){
          console.log(baseList.countriesBase[i].neighbour)
          console.log(baseList.countriesBase[i].neighbour.length)
          for (let j=0;j<baseList.countriesBase[i].neighbour.length;j++){
            console.log(nameCountry( baseList.countriesBase[i].neighbour[j]))
          }
          break;
    }
  }
}

const factsCountry = (country)=>{
  for (let i=0;i<baseList.countriesBase.length;i++){
    if (baseList.countriesBase[i].id == country){
      for (let j=0;j<baseList.countriesBase[i].facts.length;j++){
        console.log(baseList.countriesBase[i].facts[j])
      }
      break;
    }
  }
}
const countryPath = (country)=>{
  for (let i=0;i<baseList.countriesBase.length;i++){
    if (baseList.countriesBase[i].id == country){
      console.log("/public/countries/"+baseList.countriesBase[i].name+"_AL2.GeoJson")
    }
  }
}

const picturePath = (country) =>{
  for (let i=0;i<baseList.countriesBase.length;i++){
    if (baseList.countriesBase[i].id == country){
      console.log("/public/photoCountries/"+baseList.countriesBase[i].name+".jpg")
    }
  }
}


( ()=>{

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

      let truesMass = [];
      for (let i=2000;i<2400;i++){
        let quessions = SearchOnDB("hard1",{_id:i})
                    .then((item)=>{
                      if (item[0]._id==undefined){
                        console.log(i)
                      }
                      //  console.log(item)
                    })
      }

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
        SearchOnDB ("country", {"country":String(coutry)})
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
    res.send('ok')
          })
  })

    app.get('/1', (req, res) => {
            res.render ('index.ejs');
    } );

  app.get('/sendMenu', (req,res) => {
          SearchOnDB ('ezy', {})
          .then((items) =>{ res.send(items);
           })
             .catch((errorMessage)=>{
               console.log(errorMessage);
             });
  })

      function SearchOnDB (collect, find) {
            return new Promise ((resolve, reject) => {
      //      console.log(db.listCollections())
                db.collection(collect).find(find).toArray((err, results)=>{
                      if(err) console.log(err);
                    resolve(results);
                  })

          })
      };

MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  db = client.db(dbName);
  app.listen(process.env.PORT || 3000, () => {
        console.log('--//API  start 3000--//');
      })﻿;
        });
