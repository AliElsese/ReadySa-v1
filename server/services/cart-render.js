const connectDB = require('../database/connection')
const FCM = require('fcm-node')
var fcm = new FCM(process.env.SERVER_KEY_EMPLOYEE)
var fcm1 = new FCM(process.env.SERVER_KEY_RESTAURANT)

module.exports = {
    addToCart : (req,res) => {
        if(res.locals.user === null) {
            res.render('loginuser' , {
                user : res.locals.user,
                message : 'من فضلك قم بتسجيل الدخول اولا'
            })
        }
        else {
            let userid = res.locals.user.values[0],
                restaurantid = req.body.restaurantid,
                mealid = req.body.mealid,
                ext = req.body['extras']

            connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ? AND mealid = ?' , [userid,restaurantid,mealid] , (err,carts) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else if(!carts || carts.length == 0) {
                    connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [restaurantid] , (err,restaurant) => {
                        if(err) {
                            var object = {
                                status : 400 ,
                                message : `${err}` ,
                                errors : [] ,
                                data : []
                            }
                            res.send(object)
                        }
                        connectDB.query('SELECT * FROM menu WHERE restaurantid = ? AND mealid = ?' , [restaurantid,mealid] , (err,meal) =>{
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
                                if(ext === undefined || ext.length == 0) {
                                    let cart = {
                                        userid : userid,
                                        restaurantid : restaurantid,
                                        restaurantname : restaurant[0].restaurantname,
                                        restaurantimage : restaurant[0].restaurantimage,
                                        mealid : mealid,
                                        mealname : meal[0].mealname,
                                        mealpoints : meal[0].mealpoints,
                                        mealtime : meal[0].mealtime,
                                        qty : req.body.qty,
                                        totalprice : meal[0].mealprice
                                    }
                                    connectDB.query('INSERT INTO cart SET ?' , [cart] , (err,result) => {
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
                                            connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
                                                if(err) res.send(err)
                                                res.render('restaurants' , {
                                                    restaurants : restaurants,
                                                    message : 'تم اضافة المنتج الى طلباتك'
                                                })
                                            })
                                        }
                                    })
                                }
                                else {
                                    for(var i = 0; i < ext.length; i++){
                                        let extra = {
                                            userid : userid,
                                            restaurantid : restaurantid,
                                            mealid : mealid,
                                            extraname : ext[i],
                                            extraqty : '1',
                                            extratotalprice : '10'
                                        }
                                        connectDB.query('INSERT INTO cartextras SET ?' , [extra] , (err,resultssss) => {
                                            if(err) {
                                                var object = {
                                                    status : 400 ,
                                                    message : `${err}` ,
                                                    errors : [] ,
                                                    data : []
                                                }
                                                res.send(object)
                                            }
                                        })
                                    }
                                    let cart = {
                                        userid : userid,
                                        restaurantid : restaurantid,
                                        restaurantname : restaurant[0].restaurantname,
                                        restaurantimage : restaurant[0].restaurantimage,
                                        mealid : mealid,
                                        mealname : meal[0].mealname,
                                        mealpoints : meal[0].mealpoints,
                                        mealtime : meal[0].mealtime,
                                        qty : req.body.qty,
                                        totalprice : meal[0].mealprice
                                    }
                                    connectDB.query('INSERT INTO cart SET ?' , [cart] , (err,result) => {
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
                                            connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
                                                if(err) res.send(err)
                                                res.render('restaurants' , {
                                                    restaurants : restaurants,
                                                    message : 'تم اضافة المنتج الى طلباتك'
                                                })
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    })
                }
                else {
                    connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [restaurantid] , (err,restaurant) => {
                        if(err) res.send(err)
                        connectDB.query('SELECT * FROM menu WHERE restaurantid = ? AND mealid = ?' , [restaurantid,mealid] , (err,meal) =>{
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
                                connectDB.query('SELECT * FROM cartextras WHERE mealid = ?' , [mealid] , (err,cartextras) => {
                                    if(err) {
                                        var object = {
                                            status : 400 ,
                                            message : `${err}` ,
                                            errors : [] ,
                                            data : []
                                        }
                                        res.send(object)
                                    }
                                    else if(!cartextras || cartextras.length == 0) {
                                        if(ext === undefined || ext.length == 0) {
                                            let cart = {
                                                userid : userid,
                                                restaurantid : restaurantid,
                                                restaurantname : restaurant[0].restaurantname,
                                                restaurantimage : restaurant[0].restaurantimage,
                                                mealid : mealid,
                                                mealname : meal[0].mealname,
                                                mealpoints : meal[0].mealpoints,
                                                mealtime : meal[0].mealtime,
                                                qty : req.body.qty,
                                                totalprice : meal[0].mealprice
                                            }
                                            connectDB.query('UPDATE cart SET ? WHERE userid = ? AND restaurantid = ? AND mealid = ?' , [cart,userid,restaurantid,mealid] , (err,result) => {
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
                                                    connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
                                                        if(err) res.send(err)
                                                        res.render('restaurants' , {
                                                            restaurants : restaurants,
                                                            message : 'تم اضافة المنتج الى طلباتك'
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                        else {
                                            for(var i = 0; i < ext.length; i++){
                                                let extra = {
                                                    userid : userid,
                                                    restaurantid : restaurantid,
                                                    mealid : mealid,
                                                    extraname : ext[i],
                                                    extraqty : '1',
                                                    extratotalprice : '10'
                                                }
                                                connectDB.query('INSERT INTO cartextras SET ?' , [extra] , (err,resultssss) => {
                                                    if(err) {
                                                        var object = {
                                                            status : 400 ,
                                                            message : `${err}` ,
                                                            errors : [] ,
                                                            data : []
                                                        }
                                                        res.send(object)
                                                    }
                                                })
                                            }
                                            let cart = {
                                                userid : userid,
                                                restaurantid : restaurantid,
                                                restaurantname : restaurant[0].restaurantname,
                                                restaurantimage : restaurant[0].restaurantimage,
                                                mealid : mealid,
                                                mealname : meal[0].mealname,
                                                mealpoints : meal[0].mealpoints,
                                                mealtime : meal[0].mealtime,
                                                qty : req.body.qty,
                                                totalprice : meal[0].mealprice
                                            }
                                            connectDB.query('UPDATE cart SET ? WHERE userid = ? AND restaurantid = ? AND mealid = ?' , [cart,userid,restaurantid,mealid] , (err,result) => {
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
                                                    connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
                                                        if(err) res.send(err)
                                                        res.render('restaurants' , {
                                                            restaurants : restaurants,
                                                            message : 'تم اضافة المنتج الى طلباتك'
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        connectDB.query('DELETE FROM cartextras WHERE mealid = ?' , [mealid] , (err,resultss) => {
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
                                                if(ext === undefined || ext.length == 0) {
                                                    let cart = {
                                                        userid : userid,
                                                        restaurantid : restaurantid,
                                                        restaurantname : restaurant[0].restaurantname,
                                                        restaurantimage : restaurant[0].restaurantimage,
                                                        mealid : mealid,
                                                        mealname : meal[0].mealname,
                                                        mealpoints : meal[0].mealpoints,
                                                        mealtime : meal[0].mealtime,
                                                        qty : req.body.qty,
                                                        totalprice : meal[0].mealprice
                                                    }
                                                    connectDB.query('UPDATE cart SET ? WHERE userid = ? AND restaurantid = ? AND mealid = ?' , [cart,userid,restaurantid,mealid] , (err,result) => {
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
                                                            connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
                                                                if(err) res.send(err)
                                                                res.render('restaurants' , {
                                                                    restaurants : restaurants,
                                                                    message : 'تم اضافة المنتج الى طلباتك'
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                                else {
                                                    for(var i = 0; i < ext.length; i++){
                                                        let extra = {
                                                            userid : userid,
                                                            restaurantid : restaurantid,
                                                            mealid : mealid,
                                                            extraname : ext[i],
                                                            extraqty : '1',
                                                            extratotalprice : '10'
                                                        }
                                                        connectDB.query('INSERT INTO cartextras SET ?' , [extra] , (err,resultssss) => {
                                                            if(err) {
                                                                var object = {
                                                                    status : 400 ,
                                                                    message : `${err}` ,
                                                                    errors : [] ,
                                                                    data : []
                                                                }
                                                                res.send(object)
                                                            }
                                                        })
                                                    }
                                                    let cart = {
                                                        userid : userid,
                                                        restaurantid : restaurantid,
                                                        restaurantname : restaurant[0].restaurantname,
                                                        restaurantimage : restaurant[0].restaurantimage,
                                                        mealid : mealid,
                                                        mealname : meal[0].mealname,
                                                        mealpoints : meal[0].mealpoints,
                                                        mealtime : meal[0].mealtime,
                                                        qty : req.body.qty,
                                                        totalprice : meal[0].mealprice
                                                    }
                                                    connectDB.query('UPDATE cart SET ? WHERE userid = ? AND restaurantid = ? AND mealid = ?' , [cart,userid,restaurantid,mealid] , (err,result) => {
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
                                                            connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
                                                                if(err) res.send(err)
                                                                res.render('restaurants' , {
                                                                    restaurants : restaurants,
                                                                    message : 'تم اضافة المنتج الى طلباتك'
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
    },

    sendOrder : (req,res) => {
        
    }
}