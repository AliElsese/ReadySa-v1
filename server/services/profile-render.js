const connectDB = require("../database/connection")
const jwt = require('jsonwebtoken')

module.exports = {
    addNewAccount : (req,res) => {
        let user = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword
        }
        if(!user.firstname || !user.lastname || !user.email || !user.password || !user.confirmpassword) {
            res.render('signup' , {
                user : res.locals.user,
                message : 'تاكد من ملأ جميع البيانات'
            })
        }
        else if(user.password !== user.confirmpassword) {
            res.render('signup' , {
                user : res.locals.user,
                message : 'تاكد ان كلمة السر متطابقة'
            })
        }
        else {
            connectDB.query('INSERT INTO users SET ?' , [user] , (err,result) => {
                if(err) res.send(err)
                res.render('loginuser' , {
                    message : 'تم تسجيل حسابك'
                })
            })
        }
    },

    loginUserAccount : (req,res) => {
        let email = req.body.email,
            password = req.body.password

        if(!email || !password) {
            res.render('loginuser' , {
                user : res.locals.user,
                message : 'من فضلك املأ جميع البيانات'
            })
        }
        else {
            connectDB.query('SELECT * FROM users WHERE email = ?' , [email] , (err,user) => {
                if(err) res.send(err)
                if(!user || user.length == 0 || password != user[0].password){
                    res.render('loginuser' , {
                        user : res.locals.user,
                        message : 'اسم المستخدم او كلمة السر خطأ'
                    })
                } 
                else {
                    var id = user[0].userid
                    var token = jwt.sign({id : id} , process.env.JWT_SECRET , {
                        expiresIn : process.env.JWT_EXPIRES_IN
                    })
                    var cookieOptions = {
                        expires : new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        
                        httpOnly : false,
                        secure : false
                    }
                    res.locals.user = user
                    res.cookie('jwt' , token , cookieOptions)
                    res.render('profile')
                }
            })
        }
    },

    profilePage : (req,res) => {
        var id = res.locals.user.values
        connectDB.query('SELECT * FROM users WHERE userid = ?' , [id] , (err,user) => {
            if(err) res.send(err)
            res.render('profile' , {
                user : user
            })
        })
    },

    ordersRestaurantsPage : (req,res) => {
        var id = res.locals.user.values
        connectDB.query('SELECT DISTINCT userid,restaurantid,restaurantname,restaurantimage FROM cart WHERE userid = ?' , [id] , (err,cart) => {
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
                res.render('ordersRestaurants' , {
                    cart : cart
                })
            }
        })
    },
    
    ordersItemsPage : (req,res) => {
        var id = req.params.restaurantid,
            userid = res.locals.user.values

        connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?' , [userid,id] , (err,items) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?' , [userid,id] , (err,extras) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else if(extras.length == 0) {
                    res.render('ordersItems' , {
                        items : items,
                        extras : extras
                    })
                }
                else {
                    res.render('ordersItems' , {
                        items : items,
                        extras : extras
                    })
                }
            })
        })    
    },

    logout : (req,res) => {
        res.locals.user = null
        res.clearCookie('jwt').render('loginuser')
    }
}