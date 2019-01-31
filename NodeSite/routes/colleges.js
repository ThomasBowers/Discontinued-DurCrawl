var express = require('express');
require('http-errors');
var router = express.Router();
const fs = require('fs');
fs.readFile('/NodeSite/colleges.json', handleFile);
/* GET college page. */
router.get('/', function(req, res) {
  res.render('colleges', { title: 'colleges' });
});
module.exports = router;
function handleFile(err, data) {
  if (err) throw err
  obj = JSON.parse(data)
  // You can now play with your datas
}