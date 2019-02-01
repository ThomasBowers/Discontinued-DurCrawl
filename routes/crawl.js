var express = require('express');
var router = express.Router();
var fs = require('fs');
var calc = require('../crawlBackend');
var colleges, output, times;

/* read colleges.json and add to colleges object*/


/* GET college page. */
router.get('/', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    output = JSON.parse(data);
    colleges = output.colleges;
    colleges = calc.byType(colleges,"all");
    //times = output.dmatrix;
    //timeA = calc.getTimeArray(colleges, times);
    //console.log(timeA);
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });
});
router.post('/', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data) {
    if (err) throw err;
    output = JSON.parse(data);
    colleges = output.colleges;
    var collegeOn = [];
    for(var i = 0; i < colleges.length;i++){
      if(req.body[colleges[i].order]){
        collegeOn.push(colleges[i]);
      }
    }
    colleges = calc.byType(collegeOn, "all");
    //times = output.dmatrix;
    //timeA = calc.getTimeArray(colleges, times);
    //console.log(timeA);
    res.render('crawl', {title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });
});
router.get('/hill', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    output = JSON.parse(data);
    colleges = output.colleges;
    colleges = calc.byType(colleges,"hill");
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });

});
router.get('/bailey', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    output = JSON.parse(data);
    colleges = output.colleges;
    colleges = calc.byType(colleges,"bailey");
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });

});
router.get('/baileyplus', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    output = JSON.parse(data);
    colleges = output.colleges;
    colleges = calc.byType(colleges,"plus");
    res.render('crawl',{ title: 'Your Crawl', crawl: 0, times: times, colleges: colleges});
  });

});
module.exports = router;

