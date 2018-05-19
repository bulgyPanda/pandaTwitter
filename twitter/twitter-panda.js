console.log("Example is up now..")
var Twit = require('twit');
var config = require('./config')
var saveDb = require('./model/schema.js')
var T = new Twit(config);
var params = { 
q: '#rcbvscsk',
 count: 1 
}

T.get('search/tweets', params,searchedData);

 function searchedData(err, data, response) {
  console.log(data);
}