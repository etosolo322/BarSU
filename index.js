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
  const baseList =  JSON.parse(JSON.stringify(require("./public/modules/cnt_base.json"))) ;
  const chellenge =  JSON.parse(JSON.stringify(require("./public/modules/chellange.json"))) ;

app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )

let massCountQues ={
  'hard1':'2385',
  'hard2':'2385',
  'hard3':'2249',
  'hard4':'3669',
  'hard5':'2445',
  'hard6':'4215',
  'hard7':'4616',
  'hard8':'4890',
  'hard9':'4725',
  'hard10':'3675',
  'hard11':'2385',
  'hard12':'1725',
}

async function vyvod (fromServer){
  let quesAvia = []
  let quesTank = []
  let quesPeho = []
  let infoCountry = detailCountry(fromServer.country);

      for (let i=0;i<infoCountry.hard; i++){
        let hardLevelAvia = chellenge[String(infoCountry.hard)]['level'+parseInt(fromServer.levelAvia)][randomNumber(1,infoCountry.hard)-1];
        let hardLevelTank = chellenge[String(infoCountry.hard)]['level'+parseInt(fromServer.levelTank)][randomNumber(1,infoCountry.hard)-1];
        let hardLevelPeho = chellenge[String(infoCountry.hard)]['level'+parseInt(fromServer.levelPeho)][randomNumber(1,infoCountry.hard)-1];

     quesAvia.push( await  getQues(hardLevelAvia, randomNumber(1,massCountQues[hardLevelAvia])))
     quesTank.push( await  getQues(hardLevelTank, randomNumber(1,massCountQues[hardLevelTank])))
     quesPeho.push( await  getQues(hardLevelPeho, randomNumber(1,massCountQues[hardLevelPeho])))
  }

    return await {
      'quesAvia':quesAvia,
      'quesTank':quesTank,
      'quesPeho':quesPeho
    }
}

app.get('/', (req, res) => {
      res.render ('index.ejs');
} );

app.post("/fromClient", (req,res) => {
  let rezalt = {  }
  console.log(req.body)
  //  console.log(randomCountry(req.body.country))
    vyvod (req.body).
      then((item)=>{
        //  res.send(item)
      //  console.log(detailCountry(req.body.country))
        rezalt.quesion = item;
        rezalt.facts  = detailCountry(req.body.country).facts;
        rezalt.picture = detailCountry(req.body.country).picture;
        randomCountry(req.body.country)
            .then((item)=>{
            //  console.log(item)
            rezalt.countryQues = item;
            })
            .then(()=>{
          //    console.log(rezalt)
                res.send(rezalt)
              })
      })
})

async function getQues(hard,max){
  let arrCounter = [];
    return new Promise ((resolve, reject) => {
        //  console.log('promise')
        SearchOnDB (hard, {"_id":max})
          .then((item) =>{
            if(item.length==0){
              item = SearchOnDB (hard, {"_id":1})
              console.log('max')
            }
        //console.log(item)
        resolve(shufler(item[0]));
        })
  })
};



const detailCountry = (country) =>{
      let    hard=0;
      let    name='';
      let    neighbour=[];
      let    facts = [];
      let    picture = '';
  for (let i=0;i<baseList.countriesBase.length;i++){
    if (baseList.countriesBase[i].id == country){
  //    console.log("/public/photoCountries/"+baseList.countriesBase[i].name+".jpg")
       hard = baseList.countriesBase[i].challenge;
       name = baseList.countriesBase[i].name;
       picture = "/public/photoCountries/"+baseList.countriesBase[i].name+".jpg"
       for (let j=0;j<baseList.countriesBase[i].neighbour.length;j++){
         neighbour.push(baseList.countriesBase[i].neighbour[j])
       }
       for (let j=0;j<baseList.countriesBase[i].facts.length;j++){
        facts.push(baseList.countriesBase[i].facts[j]);
       }
       break;
    }
  }
  return {
    'id' : country,
    'name' : name,
    'hard' : hard,
    'neighbour' : neighbour,
    'facts' : facts,
    'picture' : picture
  }
}

const countryPath = (country)=>{
  for (let i=0;i<baseList.countriesBase.length;i++){
    if (baseList.countriesBase[i].id == country){
      console.log("/public/countries/"+baseList.countriesBase[i].name+"_AL2.GeoJson")
      }
  }
}


function shufler(array){
  console.log(array)
    function shuffle(arr){
  	var j, temp;
  	for(var i = arr.length - 1; i > 0; i--){
  		j = Math.floor(Math.random()*(i + 1));
  		temp = arr[j];
  		arr[j] = arr[i];
  		arr[i] = temp;
  	}
  	return JSON.stringify(arr);
  }

  array.answer=[{'trues':array.trues},{'vB':array.vB},{'vC':array.vC}, {'vD':array.vD}];
        delete array._id
        delete array.trues
        delete array.vB
        delete array.vC
        delete array.vD
        delete array.country
          JSON.stringify(shuffle(array.answer))
          return array;
}
(()=>{
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

async function randomCountry(coutry){
    return new Promise ((resolve, reject) => {
      let infoCountry = detailCountry(coutry);
        let resultCountry = [];
        SearchOnDB ("country", {"country":String(coutry)})
          .then((item) =>{
          //console.log(base.countriesBase[0].id)
            for (let i = 0; i < detailCountry(coutry).hard+1; i++){
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
            //  console.log(shufler(peremennaya));
              resultCountry.push(shufler(peremennaya));
            }
        }
      //console.log(resultCountry)
      resolve(resultCountry);
      })
  })
};

  app.post("/country", (req,res) => {
      //  console.log(req.body)
       db.collection('hard7').insertOne(req.body,(err,result)=>{
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
          SearchOnDB ('ezy', {})
          .then((items) =>{ res.send(items);
           })
             .catch((errorMessage)=>{
               console.log(errorMessage);
             });
  })

      async function SearchOnDB (collect, find) {
             return new Promise ((resolve, reject) => {
      //      console.log(db.listCollections())
                db.collection(collect).find(find).toArray((err, results)=>{
                      if(err) console.log(err);
                      if (results.length !='1'){
                        SearchOnDB ('hard1', 1)
                  //      console.log(collect+'  '+JSON.stringify(find))
                      }
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
