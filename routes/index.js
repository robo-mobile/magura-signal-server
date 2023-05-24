var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/receiver', function(req, res, next) {
  res.render('receiver', { title: 'Receiver', uuid: '836e88c7-47d0-48c9-be67-040b8a6a6f6e' });
});

router.get('/transmitter', function(req, res, next) {
  res.render('transmitter', { title: 'Transmitter' });
});

module.exports = router;