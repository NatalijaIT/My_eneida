var express = require('express');
var router = express.Router();
var fs = require('fs');
var noteRoutes = require('./index');
var content = fs.readFileSync('eneida.json', "utf8");
var items = JSON.parse(content);


router.get('/', function(req, res) {
    return res.json({
        eneida: items
    });
});

router.post('/', function(req, res) {
    if (!req.body) {
        return res.json
    }
    items.push(req.body);
    var data = JSON.stringify(items);
    fs.writeFile('eneida.json', data);
});

router.put("/:userid", function(req, res) {
    // console.log(req.body);
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == req.params.userid) {
            items[i].text = req.body.text;
            break;
        }
    }
    var data = JSON.stringify(items);
    fs.writeFile('eneida.json', data);
    res.end();
});

router.delete("/:userid", function(req, res) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == req.params.userid) {
            items.splice(i, 1);
            break;
        }
    }
    var data = JSON.stringify(items);
    fs.writeFile('eneida.json', data);
    return res.json({
        eneida: items
    });
});

router.get("/:userid", function(req, res) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(req.params.userid)) {
            return res.json(items[i]);
        }
    }
});

module.exports = router;