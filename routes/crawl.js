var express = require('express');
var router = express.Router();
var fs = require('fs');
var calc = require('../crawlBackend');
var colleges;

/* read colleges.json and add to colleges object*/


/* GET college page. */
router.get('/', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    colleges = JSON.parse(data).colleges;
    colleges = calc.byType(colleges,"all");
    var times;
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });

});
router.get('/hill', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    colleges = JSON.parse(data).colleges;
    colleges = calc.byType(colleges,"hill");
    var times;
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });

});
router.get('/bailey', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    colleges = JSON.parse(data).colleges;
    colleges = calc.byType(colleges,"bailey");
    var times;
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });

});
router.get('/baileyplus', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    colleges = JSON.parse(data).colleges;
    colleges = calc.byType(colleges,"plus");
    var times;
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });

});
module.exports = router;

