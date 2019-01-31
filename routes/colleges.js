var express = require('express');
var router = express.Router();
var fs = require('fs');
var colleges;

/* read colleges.json and add to colleges object*/


/* GET college page. */
router.get('/', function(req, res) {
  fs.readFile('public/colleges.json', function handleFile(err, data){
    if (err) throw err;
    colleges = JSON.parse(data).colleges;
    res.render('colleges',{ title: 'colleges', crawl: 0, colleges: colleges});
  });

});
module.exports = router;

