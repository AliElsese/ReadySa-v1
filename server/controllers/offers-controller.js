const connectDB = require('../database/connection')

module.exports = {
    allOffers : (req,res) => {
        connectDB.query('SELECT * FROM offers' , (err,offers) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!offers || offers.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'No Data' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(offers)
                    object = {
                        status : 200 ,
                        message : 'Success' ,
                        errors : [] ,
                        data : JSON.parse(json)
                    }
                res.send(object)
            }
        })
    }
}