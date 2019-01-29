var express = require('express');
var router = express.Router();

/* GET college page. */
router.get('/', function(req, res, next) {
  res.render('colleges', { title: 'colleges' });
});

module.exports = router;
