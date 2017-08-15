var config = require('./../config.json');
var test = require('tape-catch');
var tcpp = require('tcp-ping');
 
test('timing test', function(t){

    t.plan(config.targets.length * 2);

    for (let target of config.targets){
        tcpp.ping(target, function(err, data){
            t.equal(data.address, target.address);
            t.equal(data.avg > 0, true);
        });

        //TODO: is it better not to run these as tests, but rather choose to generate reports, logs, notifications?
    }
});

