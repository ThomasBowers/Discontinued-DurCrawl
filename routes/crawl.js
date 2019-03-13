var express = require('express');
var router = express.Router();
var fs = require('fs');
var calc = require('../crawlBackend');
var colleges, output, times, o;
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'U', 'V', 'X', 'Y', 'Z'];
/* read colleges.json and add to colleges object*/


/* GET college page. */
router.get('/', function (req, res) {
    fs.readFile('public/colleges.json', function handleFile(err, data) {
        if (err) throw err;
        output = JSON.parse(data);
        colleges = output.colleges;
        colleges = calc.byType(colleges, "all", 1);
        times = output.dmatrix;
        o = calc.getBestValid(colleges, times);
        timeA = o[0];
        colleges = o[1];
        //console.log(timeA);
       // console.log(colleges);
        let opc = calc.openClose(colleges);
        res.render('crawl', {
            title: 'Your Crawl',
            crawl: 1,
            times: timeA,
            colleges: colleges,
            alphabet: alphabet,
            opc: opc
        });
    });
});
router.post('/', function (req, res) {
    fs.readFile('public/colleges.json', function handleFile(err, data) {
        if (err) throw err;
        output = JSON.parse(data);
        colleges = output.colleges;
        var collegeOn = [];
        for (var i = 0; i < colleges.length; i++) {
            if (req.body[colleges[i].order]) {
                collegeOn.push(colleges[i]);
            }
        }
        if (req.body[req.body.startC]) {
            var startC = parseInt(req.body.startC);
        } else {
            startC = collegeOn[0].order;
        }
        colleges = calc.byType(collegeOn, "all", startC);
        times = output.dmatrix;
        o = calc.getBestValid(colleges, times);
        timeA = o[0];
        colleges = o[1];
        let opc = calc.openClose(colleges);
        res.render('crawl', {
            title: 'Your Crawl',
            crawl: 1,
            times: timeA,
            colleges: colleges,
            alphabet: alphabet,
            opc: opc
        });
    });
});
router.get('/hill', function (req, res) {
    fs.readFile('public/colleges.json', function handleFile(err, data) {
        if (err) throw err;
        output = JSON.parse(data);
        colleges = output.colleges;
        colleges = calc.byType(colleges, "Hill", 1);
        times = output.dmatrix;
        o = calc.getBestValid(colleges, times);
        timeA = o[0];
        colleges = o[1];
        let opc = calc.openClose(colleges);
        res.render('crawl', {
            title: 'Your Crawl',
            crawl: 1,
            times: timeA,
            colleges: colleges,
            alphabet: alphabet,
            opc: opc
        });
    });


});
router.get('/bailey', function (req, res) {
    fs.readFile('public/colleges.json', function handleFile(err, data) {
        if (err) throw err;
        output = JSON.parse(data);
        colleges = output.colleges;
        colleges = calc.byType(colleges, "Bailey", 10);
        times = output.dmatrix;
        o = calc.getBestValid(colleges, times);
        timeA = o[0];
        colleges = o[1];
        let opc = calc.openClose(colleges);
        res.render('crawl', {
            title: 'Your Crawl',
            crawl: 1,
            times: timeA,
            colleges: colleges,
            alphabet: alphabet,
            opc: opc
        });
    });

});
router.get('/baileyplus', function (req, res) {
    fs.readFile('public/colleges.json', function handleFile(err, data) {
        if (err) throw err;
        output = JSON.parse(data);
        colleges = output.colleges;
        colleges = calc.byType(colleges, "Plus", 10);
        times = output.dmatrix;
        o = calc.getBestValid(colleges, times);
        timeA = o[0];
        colleges = o[1];
        let opc = calc.openClose(colleges);
        res.render('crawl', {
            title: 'Your Crawl',
            crawl: 1,
            times: timeA,
            colleges: colleges,
            alphabet: alphabet,
            opc: opc
        });
    });

});
module.exports = router;

