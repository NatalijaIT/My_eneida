var express = require('express');
var router = express.Router();
var fs = require('fs');
// var noteRoutes = require('./users');
var content = fs.readFileSync('eneida.json', "utf8");
var items = JSON.parse(content);
// var dictionary = {};
var array = []

router.use('/users', require('./users'));

for (item in items) {
    array.push(items[item].text);
    // dictionary[items[item].id] = items[item].text
}


router.get('/', function(req, res, next) {
    var output = {
        title: "Eneida",
        text: items //dictionary
    }
    res.render("index", output);
});

router.get('/all', function(req, res, next) {
    var string = "";
    for (item in items) {
        string += (items[item].text + "<br>");
    }
    res.send(string);
});

router.get("/:userid", function(req, res) {
    var result = "";
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(req.params.userid)) {
            result = items[i].text;
            break;
        }
    }
    res.send(result);
});

module.exports = router;