var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const autoPing = () => {
  if (process.env.SELF_URL) {
    setInterval(async () => {
      const response = await fetch(`${process.env.SELF_URL}/ping`);
    }, 150000);
  }
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/transmitter-ws', function (req, res, next) {
  res.render('transmitter-ws', {title: 'Transmitter'});
});

router.get('/receiver-ws', function (req, res, next) {
  res.render('receiver-ws', {title: 'Receiver', uuid: '836e88c7-47d0-48c9-be67-040b8a6a6f6e'});
});


// router.get('/receiver', function (req, res, next) {
//   res.render('receiver', {title: 'Receiver', uuid: '836e88c7-47d0-48c9-be67-040b8a6a6f6e'});
// });
//
//
// router.get('/transmitter', function (req, res, next) {
//   res.render('transmitter', {title: 'Transmitter'});
// });


router.get('/ping', function (req, res, next) {
  res.send('pong');
});

autoPing();

module.exports = router;