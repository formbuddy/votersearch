var Seclist = require('../models/seclist.js');

exports.displayResults = function(req, res){
    var acno = req.params.acno;
    var partno = req.params.partno;
    var section = req.params.section;

    Seclist.findOne({acno: acno, partno: partno, secno: section}, function(err, details){
        if(err){
            console.log(err);
            res.status(500);
            res.send('Error querying database. Please try again later.');
        }
        res.render('secinfo', { acname: details.acname,
            partname: details.partname,
            secname: details.secname,
            acno: details.acno,
            partno: details.partno,
            section: details.secno,
            layout: false
        });
    });
}
