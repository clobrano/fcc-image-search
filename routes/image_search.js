var express = require('express');
var googleImages = require('../lib/custom-google-images');
var saveHistory = require('../lib/database.js').saveHistory;

var router = express.Router();
var CSE_ID = process.env.CSE_ID;
var APP_KEY = process.env.APP_KEY;

if (!CSE_ID) {
    console.log("CSE_ID not found");
    process.exit(1);
}
if (!APP_KEY) {
    console.log("APP_KEY not found");
    process.exit(1);
}

router.get('/:query', function(req, res) {
    var offset = req.param('offset');
    var query = req.params.query;

    if (!query) {
        res.send('Error: query is empty');
    }

    saveHistory(query);

    var client = googleImages(CSE_ID, APP_KEY);
    client.search(query, {'num': offset}).then(function(images) {
        res.send(images);
    });
});

module.exports = router;
