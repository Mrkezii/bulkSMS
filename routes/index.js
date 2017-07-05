var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
	  title: 'BulkSMS' });
});
router.get('/home', function(req, res) {
  res.render('home', {
	  title: 'homepage' });
});

module.exports = router;
