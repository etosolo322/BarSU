
const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbName = 'playGame';
var needle = require('needle');
var cheerio = require('cheerio');
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));

const proba = (urls,count)=>{
  let rezalt = {
    _id : count,
  }

  needle.get(urls,function(err,res){
        if (err) throw(err);
        var $ = cheerio.load(res.body);
        rezalt.vopros = $("h1").text();
        for (let i=0;i<3;i++){
        var domElem = $("div[itemprop = 'suggestedAnswer']").get(i);
        var content = $(domElem).text().trim();
        if (i==0){rezalt.vB=content}
        if (i==1){rezalt.vC=content}
        if (i==2){rezalt.vD=content}
      }

                rezalt.trues = $(".correct").text();
                  MongoClient.connect(url, (err, client) => {
                  assert.equal(null, err);
                  const db = client.db(dbName);
                  const collection =db.collection('ezy2');
                      collection.insertOne(rezalt,(err,result)=>{
                                console.log(rezalt)
                                        if(err){
                                          console.log(err);
                                         }
                      })

                  });
    })

}
const probaParser = (urla,counts)=>{
   needle.get(urla,function(err,res){
       if (err) throw(err);
       var $ = cheerio.load(res.body);
     //  console.log($("a").get(0))
       var domElem = $("a[href]").get(0);
       var content = $(domElem).text().trim();
     console.log(content)
     $('.isotope').each( (index, value) => {
   var link = $(this).attr('href');

  links.push({"link": link});
 });
 let count = counts*15-15;
 for (let i=4;i<33;i++){
   count++;
  proba($("a")[i+1].attribs.href,count)
     i++;

  }
     })
}
module.exports = probaParser;
