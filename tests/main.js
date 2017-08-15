var config = require('./../config.json');
var test = require('tape-catch');
var utils = require('./../utils.js');
var tcpp = require('tcp-ping');


test('positive control', function(t){
    t.plan(6);

    const target = {
        address: 'google.de',
        port: 80,
        attempts: 5,
        timeout: 2000
    };

    tcpp.ping(target, function(err, data){
        t.equal(data.address, 'google.de');
        t.equal(data.port, 80);
        t.equal(data.results.length, 5);
        t.equal(utils.isNumber(data.avg), true);
        t.equal(utils.isNumber(data.min), true);
        t.equal(utils.isNumber(data.max), true);
    });
});

test('invalid address should fail', function(t){
    t.plan(1);

    const target = {
        address: 'google.doesnotexist',
        port: 80,
        attempts: 5,
        timeout: 2000
    };

    tcpp.ping(target, function(err, data){
        t.equal(utils.isNumber(data.avg), false);
    });
});

test('invalid port should fail', function(t){
    t.plan(1);

    const target = {
        address: 'google.de',
        port: 8000,
        attempts: 1,
        timeout: 2000
    };

    tcpp.ping(target, function(err, data){
        t.equal(utils.isNumber(data.avg), false);
    });
});

