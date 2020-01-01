
const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();

app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));

      function menuSearch (collect, find) {
            return new Promise ((resolve, reject) => {
      //      console.log(db.listCollections())
                  db.collection(collect).find(find).toArray((err, results)=>{
                      if(err) console.log(err);
                    resolve(results);
                  })

          })
      };

module.exports = menuSearch;
/*
{
  country:idCountry,
  favoriteCategory:[],
  negativeCategory:[],
  maxHard:3
}*/
