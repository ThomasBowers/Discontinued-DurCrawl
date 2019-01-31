const file_system = require('fs');
var express = require('express');
var router = express.Router();
var allColleges = file_system.readFileSync('./NodeSite/public/colleges.json');
var json_object = JSON.parse(allColleges);
console.log(json_object['cuths-brooks']);
/* GET college page. */
router.get('/', function(req, res) {
  res.render('colleges', { title: 'colleges' }, {colleges: json_object});
});
module.exports = router;
