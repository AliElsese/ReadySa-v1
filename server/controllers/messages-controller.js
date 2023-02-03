const connectDB = require('../database/connection')

module.exports = {
    sendMessage : (req,res) => {
        var mes = {
            name : JSON.stringify(req.body.name),
            phone : JSON.stringify(req.body.phone),
            email : JSON.stringify(req.body.email),
            title : JSON.stringify(req.body.title),
            message : JSON.stringify(req.body.message)
        }
        connectDB.query('INSERT INTO messages SET ?' , [mes] , (err,results) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var object = {
                    status : 200 ,
                    message : 'Success' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
        })
    }
}