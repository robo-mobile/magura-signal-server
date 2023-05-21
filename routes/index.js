var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/receiver', function(req, res, next) {
  res.render('receiver', { title: 'Receiver' });
});

router.get('/transmitter', function(req, res, next) {
  res.render('transmitter', { title: 'Transmitter' });
});

module.exports = router;