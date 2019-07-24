const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs');

const url = 'https://tabelog.com/tokyo/rstLst/ramen/?SrtT=rt&Srt=D&sort_mode=1'

const ramenjsons = {}
ramenjsons.table = []

request(url, (err, res, body) => {
  const $ = cheerio.load(body)

  let ramen = []
const ramenlist = {}
const ramenjson = {
name: [],
rate: []
};

function Ramen(name, rate){
this.name = name;
this.rate = rate;
}

ramenlist.name = $('.js-ranking-num').text()
ramenlist.rating = $('.list-rst__rating-val').text()

//var name = [];
//var rate = [];

  $('.list-rst').each(function(i, elem) {
 ramenjson.name[i] = 'Name: ' + $(this).find('.js-ranking-num').text();
 ramenjson.rate[i] = 'Rate: ' + $(this).find('.list-rst__rating-val').text();
 })

for (let i=0; i<ramenjson.name.length; i++)
{
let obj = {
name: ramenjson.name[i],
rate: ramenjson.rate[i]
}
ramenjsons.table.push(obj)
}

 //ramenjsons.unshift({ramenjson: ramenjson}); 
 var json = JSON.stringify(ramenjsons, null, 4);
 fs.writeFile('ramenjsons.json', json, 'utf-8', function(err){
      if (err) throw err;
      else console.log('complete')
})

  //$('.js-ranking-num').each(function(i, elem) {
  //ramenjson.name[i] = $(this).text();
  //})

  //$('.list-rst__rating-val').each(function(i, elem) {
 //ramenjson.rate[i] = $(this).text();
  //})

//for (i=0; i<ramenjson.name.length; i++)
//{
//console.log(ramenjson.name[i],' ',ramenjson.rate[i]);
//}
})
