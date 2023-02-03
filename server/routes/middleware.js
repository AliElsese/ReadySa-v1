const connectDB = require('../database/connection')
const jwt = require('jsonwebtoken')

exports.verify = (req,res,next) => {
    var token = req.cookies.jwt
    if(!token) {
        res.locals.user = null
        res.render('loginuser')
    }
    next()
}

exports.check = (req,res,next) => {
    var token = req.cookies.jwt
    if(token) {
        jwt.verify(token , process.env.JWT_SECRET , async (err,decodedToken) => {
            if(err) {
                res.locals.user = null
                next()
            }
            else {
                let user = await connectDB.query('SELECT * FROM users WHERE userid = ?' , [decodedToken.id] , (err,users) =>{
                    if(err) return err
                    return users
                })
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}

exports.verifyAdmin = (req,res,next) => {
    var token = req.cookies.jwt
    if(!token) {
        res.render('loginadmin')
    }
    next()
}