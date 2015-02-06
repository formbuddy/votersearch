var Voterlist = require('../models/voterlist.js');

exports.displayResults = function(req, res){
    var idno = req.body.idno;
    var ename = req.body.ename;
    var rname = req.body.rname;
    var sex = req.body.sex;
    var acno = req.body.acno;

    var params = {};
    if(idno){
        params.idno = new RegExp(idno, "i");
    }
    if(ename){
        params.ename = new RegExp(ename, "i");
    }
    if(rname){
        params.rname = new RegExp(rname,"i");
    }
    if(sex){
        params.sex = sex;
    }
    if(acno != 0){
        params.acno = parseInt(acno);
    }
    Voterlist.find(params).limit(100).exec(function(err, voters){
        if(err){
            console.log(err);
            res.status(500);
            res.send('Error querying database. Please try again later.');
        }
        var context = {
            results: 1,
            voters: voters.map(function(voter){
                return {
                    acno     : voter.acno,
                    partno   : voter.partno,
                    section  : voter.section,
                    sno      : voter.sno,
                    ename    : voter.ename,
                    rname    : voter.rname,
                    sex      : voter.sex,
                    idno     : voter.idno,
                    houseno  : voter.houseno
                }
            })
        };
        res.render('index', context);
    });
}
