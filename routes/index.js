var express = require('express');
var router = express.Router();
let SmsController = require('../controllers/SmsController');
var bodyParser = require('body-parser');

// Add this line below
router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json());
/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		title: 'BulkSMS'
	});
});
router.get('/home', function (req, res) {
	res.render('home', {
		title: 'homepage'
	});
});
router.post('/contacts', function (req, res) {
	console.log('gotten')
	// res.render('contacts', {
	// 	contacts: req.body.contactsFromDb
	// });

});

router.post('/sms', SmsController.sendSMS);
// router.post('/sms', function (req, res) {
// 	console.log(req.body.csv)
// });

router.get('/contacts', function (req, res) {
	res.render('contacts', {
		title: 'homepage'
	});
});


module.exports = router;
