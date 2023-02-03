const connectDB = require('../database/connection')
const FCM = require('fcm-node')
var fcm1 = new FCM(process.env.SERVER_KEY_RESTAURANT)

module.exports = {
    sendCart : (req,res) => {
        let userid = req.body.userid,
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
                                        var object = {
                                            status : 200 ,
                                            message : 'تم الاضافة الى السلة' ,
                                            errors : [] ,
                                            data : []
                                        }
                                        res.send(object)
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
                                        var object = {
                                            status : 200 ,
                                            message : 'تم الاضافة الى السلة' ,
                                            errors : [] ,
                                            data : []
                                        }
                                        res.send(object)
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
                                                var object = {
                                                    status : 200 ,
                                                    message : 'تم الاضافة الى السلة' ,
                                                    errors : [] ,
                                                    data : []
                                                }
                                                res.send(object)
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
                                                var object = {
                                                    status : 200 ,
                                                    message : 'تم الاضافة الى السلة' ,
                                                    errors : [] ,
                                                    data : []
                                                }
                                                res.send(object)
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
                                                        var object = {
                                                            status : 200 ,
                                                            message : 'تم الاضافة الى السلة' ,
                                                            errors : [] ,
                                                            data : []
                                                        }
                                                        res.send(object)
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
                                                        var object = {
                                                            status : 200 ,
                                                            message : 'تم الاضافة الى السلة' ,
                                                            errors : [] ,
                                                            data : []
                                                        }
                                                        res.send(object)
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
    },
    
    showCart : (req,res) => {
        var id = req.params.userid

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
            else if(!cart || cart.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'لا يوجد طلبات' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(cart)
                    object = {
                        status : 200 ,
                        message : 'Success' ,
                        errors : [] ,
                        data : JSON.parse(json)
                    }
                res.send(object)
            }
        })
    },
    
    showItems : (req,res) => {
        var id = req.params.restaurantid,
            userid = req.body.userid

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
                else if(items.length == 0 && extras.length == 0) {
                    var object = {
                        status : 200 ,
                        message : 'no data' ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else if(extras.length == 0) {
                    let meals = []
                    for(var i = 0; i < items.length; i++){
                        var item = {
                            cartid : items[i].cartid,
                            userid : items[i].userid,
                            restaurantid : items[i].restaurantid,
                            restaurantname : items[i].restaurantname,
                            mealid : items[i].mealid,
                            mealname : items[i].mealname,
                            qty : items[i].qty,
                            totalprice : items[i].totalprice
                        }
                        meals.push(item)
                    }
                    var order = {
                        meals : meals,
                        extras : []
                    }
                    var object = {
                        status : 200 ,
                        message : 'success' ,
                        errors : [] ,
                        data : order
                    }
                    res.send(object)
                }
                else {
                    let meals = []
                    for(var i = 0; i < items.length; i++){
                        var item = {
                            cartid : items[i].cartid,
                            userid : items[i].userid,
                            restaurantid : items[i].restaurantid,
                            restaurantname : items[i].restaurantname,
                            mealid : items[i].mealid,
                            mealname : items[i].mealname,
                            qty : items[i].qty,
                            totalprice : items[i].totalprice
                        }
                        meals.push(item)
                    }
                    let extras1 = []
                    for(var i = 0; i < extras.length; i++){
                        var extra = {
                            extraname : extras[i].extraname,
                            extraqty : extras[i].extraqty,
                            extratotalprice : extras[i].extratotalprice
                        }
                        extras1.push(extra)
                    }
                    var order = {
                        meals : meals,
                        extras : extras1
                    }
                    var object = {
                        status : 200 ,
                        message : 'success' ,
                        errors : [] ,
                        data : order
                    }
                    res.send(object)
                }
            })
        })
    },
    
    sendOrder : (req,res) => {
        var userid = req.body.userid,
            restaurantid = req.body.restaurantid,
            tokens = [],
            voice = req.body.voice,
            meals1 = JSON.parse(req.body['meals']),
            ordertime = parseInt(req.body.ordertime),
            orderPlace = req.body.orderPlace
            
        var d = new Date();
        var month = d.getMonth()+1;
        
        var current_time = new Date(req.body.current_time)

        if(ordertime == 0) {
            connectDB.query('SELECT MAX(mealtime) AS totaltime FROM cart WHERE userid = ? AND restaurantid = ?' , [userid,restaurantid] , (err,order) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else {
                    var orderTimeDelivered = new Date(current_time.setMinutes(current_time.getMinutes() + ordertime)).toLocaleTimeString()
                    if(!req.file) {
                        if(orderPlace == 'true') {
                            connectDB.query('SELECT * FROM restaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                if(err) {
                                    var object = {
                                        status: 400,
                                        message: `${err}`,
                                        errors: [],
                                        data: []
                                    }
                                    res.send(object)
                                }
                                else {
                                    tokens.push(restaccount[0].restauranttoken)
                                    connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                        if (err) {
                                            var object = {
                                                status: 400,
                                                message: `${err}`,
                                                errors: [],
                                                data: []
                                            }
                                            res.send(object)
                                        }
                                        connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            else {
                                                var points = parseInt(user[0].points)
                                                var mealPoints = 0
                                                for (var y = 0; y < meals.length; y++) {
                                                    mealPoints += parseInt(meals[y].mealpoints)
                                                }
                                                var totalPoints = points + mealPoints
                                                if (voice === '') {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage: '',
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered,
                                                                remainingtime : parseInt(order[0].totaltime)
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                            registration_ids: tokens, 
                                                                            
                                                                            notification : {
                                                                                title : 'Ready-Sa notification',
                                                                                body : 'لديك طلب جديد',
                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                "icon" : "fcm_push_icon"
                                                                            }
                                                                        };
                                                                        
                                                                        fcm1.send(message, function(err, response1){
                                                                           if (err) {
                                                                               var object = {
                                                                                   status: 400,
                                                                                   message: `${err}`,
                                                                                   errors: [],
                                                                                   data: []
                                                                               }
                                                                               res.send(object)
                                                                           }
                                                                           else {
                                                                               var object = {
                                                                                   status: 200,
                                                                                   message: 'تم ارسال طلبك',
                                                                                   errors: [],
                                                                                   data: []
                                                                               }
                                                                               res.send(object)
                                                                           }
                                                                       })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage: '',
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered,
                                                                        remainingtime : parseInt(order[0].totaltime)
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                            registration_ids: tokens, 
                                                                                            
                                                                                            notification : {
                                                                                                title : 'Ready-Sa notification',
                                                                                                body : 'لديك طلب جديد',
                                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                "icon" : "fcm_push_icon"
                                                                                            }
                                                                                        };
                                                                                        
                                                                                        fcm1.send(message, function(err, response1){
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var object = {
                                                                                                    status: 200,
                                                                                                    message: 'تم ارسال طلبك',
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                                else {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage: '',
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered,
                                                                remainingtime : parseInt(order[0].totaltime)
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        var voiceorder = {
                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                            userid: userid,
                                                            restaurantid: restaurantid,
                                                            voice: voice
                                                        }
                                                        connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'تم ارسال طلبك',
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage: '',
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered,
                                                                        remainingtime : parseInt(order[0].totaltime)
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                var voiceorder = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    voice: voice
                                                                }
                                                                connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                    registration_ids: tokens, 
                                                                                                    
                                                                                                    notification : {
                                                                                                        title : 'Ready-Sa notification',
                                                                                                        body : 'لديك طلب جديد',
                                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                        "icon" : "fcm_push_icon"
                                                                                                    }
                                                                                                };
                                                                                                
                                                                                                fcm1.send(message, function(err, response1){
                                                                                                    if (err) {
                                                                                                        var object = {
                                                                                                            status: 400,
                                                                                                            message: `${err}`,
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                    else {
                                                                                                        var object = {
                                                                                                            status: 200,
                                                                                                            message: 'تم ارسال طلبك',
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                }))
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                            })
                        }
                        else {
                            connectDB.query('SELECT * FROM brancheaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                if(err) {
                                    var object = {
                                        status: 400,
                                        message: `${err}`,
                                        errors: [],
                                        data: []
                                    }
                                    res.send(object)
                                }
                                else {
                                    tokens.push(restaccount[0].restauranttoken)
                                    connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                        if (err) {
                                            var object = {
                                                status: 400,
                                                message: `${err}`,
                                                errors: [],
                                                data: []
                                            }
                                            res.send(object)
                                        }
                                        connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            else {
                                                var points = parseInt(user[0].points)
                                                var mealPoints = 0
                                                for (var y = 0; y < meals.length; y++) {
                                                    mealPoints += parseInt(meals[y].mealpoints)
                                                }
                                                var totalPoints = points + mealPoints
                                                if (voice === '') {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage: '',
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered,
                                                                remainingtime : parseInt(order[0].totaltime)
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                            registration_ids: tokens, 
                                                                            
                                                                            notification : {
                                                                                title : 'Ready-Sa notification',
                                                                                body : 'لديك طلب جديد',
                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                "icon" : "fcm_push_icon"
                                                                            }
                                                                        };
                                                                        
                                                                        fcm1.send(message, function(err, response1){
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                var object = {
                                                                                    status: 200,
                                                                                    message: 'تم ارسال طلبك',
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage: '',
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered,
                                                                        remainingtime : parseInt(order[0].totaltime)
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                            registration_ids: tokens, 
                                                                                            
                                                                                            notification : {
                                                                                                title : 'Ready-Sa notification',
                                                                                                body : 'لديك طلب جديد',
                                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                "icon" : "fcm_push_icon"
                                                                                            }
                                                                                        };
                                                                                        
                                                                                        fcm1.send(message, function(err, response1){
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var object = {
                                                                                                    status: 200,
                                                                                                    message: 'تم ارسال طلبك',
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                                else {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage: '',
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered,
                                                                remainingtime : parseInt(order[0].totaltime)
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        var voiceorder = {
                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                            userid: userid,
                                                            restaurantid: restaurantid,
                                                            voice: voice
                                                        }
                                                        connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'تم ارسال طلبك',
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage: '',
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered,
                                                                        remainingtime : parseInt(order[0].totaltime)
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                var voiceorder = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    voice: voice
                                                                }
                                                                connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                    registration_ids: tokens, 
                                                                                                    
                                                                                                    notification : {
                                                                                                        title : 'Ready-Sa notification',
                                                                                                        body : 'لديك طلب جديد',
                                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                        "icon" : "fcm_push_icon"
                                                                                                    }
                                                                                                };
                                                                                                
                                                                                                fcm1.send(message, function(err, response1){
                                                                                                    if (err) {
                                                                                                        var object = {
                                                                                                            status: 400,
                                                                                                            message: `${err}`,
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                    else {
                                                                                                        var object = {
                                                                                                            status: 200,
                                                                                                            message: 'تم ارسال طلبك',
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                }))
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    }
                    else {
                        if(orderPlace == 'true') {
                            connectDB.query('SELECT * FROM restaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                if(err) {
                                    var object = {
                                        status: 400,
                                        message: `${err}`,
                                        errors: [],
                                        data: []
                                    }
                                    res.send(object)
                                }
                                else {
                                    tokens.push(restaccount[0].restauranttoken)
                                    connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                        if (err) {
                                            var object = {
                                                status: 400,
                                                message: `${err}`,
                                                errors: [],
                                                data: []
                                            }
                                            res.send(object)
                                        }
                                        connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            else {
                                                var points = parseInt(user[0].points)
                                                var mealPoints = 0
                                                for (var y = 0; y < meals.length; y++) {
                                                    mealPoints += parseInt(meals[y].mealpoints)
                                                }
                                                var totalPoints = points + mealPoints
                                                if (voice === '') {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                            registration_ids: tokens, 
                                                                            
                                                                            notification : {
                                                                                title : 'Ready-Sa notification',
                                                                                body : 'لديك طلب جديد',
                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                "icon" : "fcm_push_icon"
                                                                            }
                                                                        };
                                                                        
                                                                        fcm1.send(message, function(err, response1){
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                var object = {
                                                                                    status: 200,
                                                                                    message: 'تم ارسال طلبك',
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                            registration_ids: tokens, 
                                                                                            
                                                                                            notification : {
                                                                                                title : 'Ready-Sa notification',
                                                                                                body : 'لديك طلب جديد',
                                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                "icon" : "fcm_push_icon"
                                                                                            }
                                                                                        };
                                                                                        
                                                                                        fcm1.send(message, function(err, response1){
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var object = {
                                                                                                    status: 200,
                                                                                                    message: 'تم ارسال طلبك',
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                                else {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        var voiceorder = {
                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                            userid: userid,
                                                            restaurantid: restaurantid,
                                                            voice: voice
                                                        }
                                                        connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'تم ارسال طلبك',
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                var voiceorder = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    voice: voice
                                                                }
                                                                connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                    registration_ids: tokens, 
                                                                                                    
                                                                                                    notification : {
                                                                                                        title : 'Ready-Sa notification',
                                                                                                        body : 'لديك طلب جديد',
                                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                        "icon" : "fcm_push_icon"
                                                                                                    }
                                                                                                };
                                                                                                
                                                                                                fcm1.send(message, function(err, response1){
                                                                                                    if (err) {
                                                                                                        var object = {
                                                                                                            status: 400,
                                                                                                            message: `${err}`,
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                    else {
                                                                                                        var object = {
                                                                                                            status: 200,
                                                                                                            message: 'تم ارسال طلبك',
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                }))
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                            })
                        }
                        else {
                            connectDB.query('SELECT * FROM brancheaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                if(err) {
                                    var object = {
                                        status: 400,
                                        message: `${err}`,
                                        errors: [],
                                        data: []
                                    }
                                    res.send(object)
                                }
                                else {
                                    tokens.push(restaccount[0].restauranttoken)
                                    connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                        if (err) {
                                            var object = {
                                                status: 400,
                                                message: `${err}`,
                                                errors: [],
                                                data: []
                                            }
                                            res.send(object)
                                        }
                                        connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            else {
                                                var points = parseInt(user[0].points)
                                                var mealPoints = 0
                                                for (var y = 0; y < meals.length; y++) {
                                                    mealPoints += parseInt(meals[y].mealpoints)
                                                }
                                                var totalPoints = points + mealPoints
                                                if (voice === '') {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered,
                                                                remainingtime : parseInt(order[0].totaltime)
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                            registration_ids: tokens, 
                                                                            
                                                                            notification : {
                                                                                title : 'Ready-Sa notification',
                                                                                body : 'لديك طلب جديد',
                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                "icon" : "fcm_push_icon"
                                                                            }
                                                                        };
                                                                        
                                                                        fcm1.send(message, function(err, response1){
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                var object = {
                                                                                    status: 200,
                                                                                    message: 'تم ارسال طلبك',
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered,
                                                                        remainingtime : parseInt(order[0].totaltime)
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                            registration_ids: tokens, 
                                                                                            
                                                                                            notification : {
                                                                                                title : 'Ready-Sa notification',
                                                                                                body : 'لديك طلب جديد',
                                                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                "icon" : "fcm_push_icon"
                                                                                            }
                                                                                        };
                                                                                        
                                                                                        fcm1.send(message, function(err, response1){
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var object = {
                                                                                                    status: 200,
                                                                                                    message: 'تم ارسال طلبك',
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                                else {
                                                    if (!req.body['extras']) {
                                                        for (var i = 0; i < meals1.length; i++) {
                                                            let meal = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                restaurantname: meals[i].restaurantname,
                                                                restaurantimage: meals[i].restaurantimage,
                                                                mealid: meals1[i].mealid,
                                                                mealname: meals[i].mealname,
                                                                mealpoints: meals[i].mealpoints,
                                                                mealtime: meals[i].mealtime,
                                                                qty: meals1[i].qty,
                                                                totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                orderdate : month,
                                                                orderPlace : orderPlace,
                                                                ordertime : orderTimeDelivered,
                                                                remainingtime : parseInt(order[0].totaltime)
                                                            }
                                                            connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                            })
                                                        }
                                                        var voiceorder = {
                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                            userid: userid,
                                                            restaurantid: restaurantid,
                                                            voice: voice
                                                        }
                                                        connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'تم ارسال طلبك',
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        })
                                                    }
                                                    else {
                                                        var extras1 = JSON.parse(req.body['extras'])
                                                        connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                            if (err) {
                                                                var object = {
                                                                    status: 400,
                                                                    message: `${err}`,
                                                                    errors: [],
                                                                    data: []
                                                                }
                                                                res.send(object)
                                                            }
                                                            else {
                                                                for (var i = 0; i < meals1.length; i++) {
                                                                    let meal = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        restaurantname: meals[i].restaurantname,
                                                                        restaurantimage: meals[i].restaurantimage,
                                                                        mealid: meals1[i].mealid,
                                                                        mealname: meals[i].mealname,
                                                                        mealpoints: meals[i].mealpoints,
                                                                        mealtime: meals[i].mealtime,
                                                                        qty: meals1[i].qty,
                                                                        totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                        orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                        orderdate : month,
                                                                        orderPlace : orderPlace,
                                                                        ordertime : orderTimeDelivered,
                                                                        remainingtime : parseInt(order[0].totaltime)
                                                                    }
                                                                    connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                for (var x = 0; x < extras1.length; x++) {
                                                                    let extra = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        mealid: extras[x].mealid,
                                                                        extraname: extras1[x].extraname,
                                                                        extraqty: extras1[x].extraqty,
                                                                        extratotalprice: extras[x].extratotalprice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                    })
                                                                }
                                                                var voiceorder = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    voice: voice
                                                                }
                                                                connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                            if (err) {
                                                                                                var object = {
                                                                                                    status: 400,
                                                                                                    message: `${err}`,
                                                                                                    errors: [],
                                                                                                    data: []
                                                                                                }
                                                                                                res.send(object)
                                                                                            }
                                                                                            else {
                                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                    registration_ids: tokens, 
                                                                                                    
                                                                                                    notification : {
                                                                                                        title : 'Ready-Sa notification',
                                                                                                        body : 'لديك طلب جديد',
                                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                        "icon" : "fcm_push_icon"
                                                                                                    }
                                                                                                };
                                                                                                
                                                                                                fcm1.send(message, function(err, response1){
                                                                                                    if (err) {
                                                                                                        var object = {
                                                                                                            status: 400,
                                                                                                            message: `${err}`,
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                    else {
                                                                                                        var object = {
                                                                                                            status: 200,
                                                                                                            message: 'تم ارسال طلبك',
                                                                                                            errors: [],
                                                                                                            data: []
                                                                                                        }
                                                                                                        res.send(object)
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                }))
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    }
                }
            })
        }
        else {
            connectDB.query('SELECT MAX(mealtime) AS totaltime FROM cart WHERE userid = ? AND restaurantid = ?' , [userid,restaurantid] , (err,order) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else {
                    if(ordertime >= parseInt(order[0].totaltime)) {
                        var orderTimeDelivered = new Date(current_time.setMinutes(current_time.getMinutes() + ordertime)).toLocaleTimeString()
                        if(!req.file) {
                            if(orderPlace == 'true') {
                                connectDB.query('SELECT * FROM restaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                    if(err) {
                                        var object = {
                                            status: 400,
                                            message: `${err}`,
                                            errors: [],
                                            data: []
                                        }
                                        res.send(object)
                                    }
                                    else {
                                        tokens.push(restaccount[0].restauranttoken)
                                        connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                                if (err) {
                                                    var object = {
                                                        status: 400,
                                                        message: `${err}`,
                                                        errors: [],
                                                        data: []
                                                    }
                                                    res.send(object)
                                                }
                                                else {
                                                    var points = parseInt(user[0].points)
                                                    var mealPoints = 0
                                                    for (var y = 0; y < meals.length; y++) {
                                                        mealPoints += parseInt(meals[y].mealpoints)
                                                    }
                                                    var totalPoints = points + mealPoints
                                                    if (voice === '') {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage: '',
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                               if (err) {
                                                                                   var object = {
                                                                                       status: 400,
                                                                                       message: `${err}`,
                                                                                       errors: [],
                                                                                       data: []
                                                                                   }
                                                                                   res.send(object)
                                                                               }
                                                                               else {
                                                                                   var object = {
                                                                                       status: 200,
                                                                                       message: 'تم ارسال طلبك',
                                                                                       errors: [],
                                                                                       data: []
                                                                                   }
                                                                                   res.send(object)
                                                                               }
                                                                           })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage: '',
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                registration_ids: tokens, 
                                                                                                
                                                                                                notification : {
                                                                                                    title : 'Ready-Sa notification',
                                                                                                    body : 'لديك طلب جديد',
                                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                    "icon" : "fcm_push_icon"
                                                                                                }
                                                                                            };
                                                                                            
                                                                                            fcm1.send(message, function(err, response1){
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var object = {
                                                                                                        status: 200,
                                                                                                        message: 'تم ارسال طلبك',
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage: '',
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            var voiceorder = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                voice: voice
                                                            }
                                                            connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                    registration_ids: tokens, 
                                                                                    
                                                                                    notification : {
                                                                                        title : 'Ready-Sa notification',
                                                                                        body : 'لديك طلب جديد',
                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                        "icon" : "fcm_push_icon"
                                                                                    }
                                                                                };
                                                                                
                                                                                fcm1.send(message, function(err, response1){
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var object = {
                                                                                            status: 200,
                                                                                            message: 'تم ارسال طلبك',
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage: '',
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    var voiceorder = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        voice: voice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                        registration_ids: tokens, 
                                                                                                        
                                                                                                        notification : {
                                                                                                            title : 'Ready-Sa notification',
                                                                                                            body : 'لديك طلب جديد',
                                                                                                            "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                            "icon" : "fcm_push_icon"
                                                                                                        }
                                                                                                    };
                                                                                                    
                                                                                                    fcm1.send(message, function(err, response1){
                                                                                                        if (err) {
                                                                                                            var object = {
                                                                                                                status: 400,
                                                                                                                message: `${err}`,
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                        else {
                                                                                                            var object = {
                                                                                                                status: 200,
                                                                                                                message: 'تم ارسال طلبك',
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    }))
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                            else {
                                connectDB.query('SELECT * FROM brancehaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                    if(err) {
                                        var object = {
                                            status: 400,
                                            message: `${err}`,
                                            errors: [],
                                            data: []
                                        }
                                        res.send(object)
                                    }
                                    else {
                                        tokens.push(restaccount[0].restauranttoken)
                                        connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                                if (err) {
                                                    var object = {
                                                        status: 400,
                                                        message: `${err}`,
                                                        errors: [],
                                                        data: []
                                                    }
                                                    res.send(object)
                                                }
                                                else {
                                                    var points = parseInt(user[0].points)
                                                    var mealPoints = 0
                                                    for (var y = 0; y < meals.length; y++) {
                                                        mealPoints += parseInt(meals[y].mealpoints)
                                                    }
                                                    var totalPoints = points + mealPoints
                                                    if (voice === '') {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage: '',
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'تم ارسال طلبك',
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage: '',
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                registration_ids: tokens, 
                                                                                                
                                                                                                notification : {
                                                                                                    title : 'Ready-Sa notification',
                                                                                                    body : 'لديك طلب جديد',
                                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                    "icon" : "fcm_push_icon"
                                                                                                }
                                                                                            };
                                                                                            
                                                                                            fcm1.send(message, function(err, response1){
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var object = {
                                                                                                        status: 200,
                                                                                                        message: 'تم ارسال طلبك',
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage: '',
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            var voiceorder = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                voice: voice
                                                            }
                                                            connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                    registration_ids: tokens, 
                                                                                    
                                                                                    notification : {
                                                                                        title : 'Ready-Sa notification',
                                                                                        body : 'لديك طلب جديد',
                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                        "icon" : "fcm_push_icon"
                                                                                    }
                                                                                };
                                                                                
                                                                                fcm1.send(message, function(err, response1){
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var object = {
                                                                                            status: 200,
                                                                                            message: 'تم ارسال طلبك',
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage: '',
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    var voiceorder = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        voice: voice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                        registration_ids: tokens, 
                                                                                                        
                                                                                                        notification : {
                                                                                                            title : 'Ready-Sa notification',
                                                                                                            body : 'لديك طلب جديد',
                                                                                                            "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                            "icon" : "fcm_push_icon"
                                                                                                        }
                                                                                                    };
                                                                                                    
                                                                                                    fcm1.send(message, function(err, response1){
                                                                                                        if (err) {
                                                                                                            var object = {
                                                                                                                status: 400,
                                                                                                                message: `${err}`,
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                        else {
                                                                                                            var object = {
                                                                                                                status: 200,
                                                                                                                message: 'تم ارسال طلبك',
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    }))
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                        }
                        else {
                            if(orderPlace == 'true') {
                                connectDB.query('SELECT * FROM restaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                    if(err) {
                                        var object = {
                                            status: 400,
                                            message: `${err}`,
                                            errors: [],
                                            data: []
                                        }
                                        res.send(object)
                                    }
                                    else {
                                        tokens.push(restaccount[0].restauranttoken)
                                        connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                                if (err) {
                                                    var object = {
                                                        status: 400,
                                                        message: `${err}`,
                                                        errors: [],
                                                        data: []
                                                    }
                                                    res.send(object)
                                                }
                                                else {
                                                    var points = parseInt(user[0].points)
                                                    var mealPoints = 0
                                                    for (var y = 0; y < meals.length; y++) {
                                                        mealPoints += parseInt(meals[y].mealpoints)
                                                    }
                                                    var totalPoints = points + mealPoints
                                                    if (voice === '') {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'تم ارسال طلبك',
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                registration_ids: tokens, 
                                                                                                
                                                                                                notification : {
                                                                                                    title : 'Ready-Sa notification',
                                                                                                    body : 'لديك طلب جديد',
                                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                    "icon" : "fcm_push_icon"
                                                                                                }
                                                                                            };
                                                                                            
                                                                                            fcm1.send(message, function(err, response1){
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var object = {
                                                                                                        status: 200,
                                                                                                        message: 'تم ارسال طلبك',
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            var voiceorder = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                voice: voice
                                                            }
                                                            connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                    registration_ids: tokens, 
                                                                                    
                                                                                    notification : {
                                                                                        title : 'Ready-Sa notification',
                                                                                        body : 'لديك طلب جديد',
                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                        "icon" : "fcm_push_icon"
                                                                                    }
                                                                                };
                                                                                
                                                                                fcm1.send(message, function(err, response1){
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var object = {
                                                                                            status: 200,
                                                                                            message: 'تم ارسال طلبك',
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    var voiceorder = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        voice: voice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                        registration_ids: tokens, 
                                                                                                        
                                                                                                        notification : {
                                                                                                            title : 'Ready-Sa notification',
                                                                                                            body : 'لديك طلب جديد',
                                                                                                            "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                            "icon" : "fcm_push_icon"
                                                                                                        }
                                                                                                    };
                                                                                                    
                                                                                                    fcm1.send(message, function(err, response1){
                                                                                                        if (err) {
                                                                                                            var object = {
                                                                                                                status: 400,
                                                                                                                message: `${err}`,
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                        else {
                                                                                                            var object = {
                                                                                                                status: 200,
                                                                                                                message: 'تم ارسال طلبك',
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    }))
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                            else {
                                connectDB.query('SELECT * FROM brancehaccounts WHERE restaurantid = ?' , [restaurantid] , (err,restaccount) => {
                                    if(err) {
                                        var object = {
                                            status: 400,
                                            message: `${err}`,
                                            errors: [],
                                            data: []
                                        }
                                        res.send(object)
                                    }
                                    else {
                                        tokens.push(restaccount[0].restauranttoken)
                                        connectDB.query('SELECT points FROM users WHERE userid = ?', [userid], (err, user) => {
                                            if (err) {
                                                var object = {
                                                    status: 400,
                                                    message: `${err}`,
                                                    errors: [],
                                                    data: []
                                                }
                                                res.send(object)
                                            }
                                            connectDB.query('SELECT * FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, meals) => {
                                                if (err) {
                                                    var object = {
                                                        status: 400,
                                                        message: `${err}`,
                                                        errors: [],
                                                        data: []
                                                    }
                                                    res.send(object)
                                                }
                                                else {
                                                    var points = parseInt(user[0].points)
                                                    var mealPoints = 0
                                                    for (var y = 0; y < meals.length; y++) {
                                                        mealPoints += parseInt(meals[y].mealpoints)
                                                    }
                                                    var totalPoints = points + mealPoints
                                                    if (voice === '') {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                registration_ids: tokens, 
                                                                                
                                                                                notification : {
                                                                                    title : 'Ready-Sa notification',
                                                                                    body : 'لديك طلب جديد',
                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                    "icon" : "fcm_push_icon"
                                                                                }
                                                                            };
                                                                            
                                                                            fcm1.send(message, function(err, response1){
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'تم ارسال طلبك',
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                registration_ids: tokens, 
                                                                                                
                                                                                                notification : {
                                                                                                    title : 'Ready-Sa notification',
                                                                                                    body : 'لديك طلب جديد',
                                                                                                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                    "icon" : "fcm_push_icon"
                                                                                                }
                                                                                            };
                                                                                            
                                                                                            fcm1.send(message, function(err, response1){
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var object = {
                                                                                                        status: 200,
                                                                                                        message: 'تم ارسال طلبك',
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        if (!req.body['extras']) {
                                                            for (var i = 0; i < meals1.length; i++) {
                                                                let meal = {
                                                                    ordernumber: parseInt(meals[0].cartid, 10),
                                                                    userid: userid,
                                                                    restaurantid: restaurantid,
                                                                    restaurantname: meals[i].restaurantname,
                                                                    restaurantimage: meals[i].restaurantimage,
                                                                    mealid: meals1[i].mealid,
                                                                    mealname: meals[i].mealname,
                                                                    mealpoints: meals[i].mealpoints,
                                                                    mealtime: meals[i].mealtime,
                                                                    qty: meals1[i].qty,
                                                                    totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                    orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                    orderdate : month,
                                                                    orderPlace : orderPlace,
                                                                    ordertime : orderTimeDelivered,
                                                                    remainingtime : req.body.ordertime
                                                                }
                                                                connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                })
                                                            }
                                                            var voiceorder = {
                                                                ordernumber: parseInt(meals[0].cartid, 10),
                                                                userid: userid,
                                                                restaurantid: restaurantid,
                                                                voice: voice
                                                            }
                                                            connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results1) => {
                                                                    if (err) {
                                                                        var object = {
                                                                            status: 400,
                                                                            message: `${err}`,
                                                                            errors: [],
                                                                            data: []
                                                                        }
                                                                        res.send(object)
                                                                    }
                                                                    else {
                                                                        connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                            else {
                                                                                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                    registration_ids: tokens, 
                                                                                    
                                                                                    notification : {
                                                                                        title : 'Ready-Sa notification',
                                                                                        body : 'لديك طلب جديد',
                                                                                        "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                        "icon" : "fcm_push_icon"
                                                                                    }
                                                                                };
                                                                                
                                                                                fcm1.send(message, function(err, response1){
                                                                                    if (err) {
                                                                                        var object = {
                                                                                            status: 400,
                                                                                            message: `${err}`,
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                    else {
                                                                                        var object = {
                                                                                            status: 200,
                                                                                            message: 'تم ارسال طلبك',
                                                                                            errors: [],
                                                                                            data: []
                                                                                        }
                                                                                        res.send(object)
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                        }
                                                        else {
                                                            var extras1 = JSON.parse(req.body['extras'])
                                                            connectDB.query('SELECT * FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, extras) => {
                                                                if (err) {
                                                                    var object = {
                                                                        status: 400,
                                                                        message: `${err}`,
                                                                        errors: [],
                                                                        data: []
                                                                    }
                                                                    res.send(object)
                                                                }
                                                                else {
                                                                    for (var i = 0; i < meals1.length; i++) {
                                                                        let meal = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            restaurantname: meals[i].restaurantname,
                                                                            restaurantimage: meals[i].restaurantimage,
                                                                            mealid: meals1[i].mealid,
                                                                            mealname: meals[i].mealname,
                                                                            mealpoints: meals[i].mealpoints,
                                                                            mealtime: meals[i].mealtime,
                                                                            qty: meals1[i].qty,
                                                                            totalprice: (parseInt(meals1[i].qty) * parseInt(meals[i].totalprice)).toString(),
                                                                            orderimage : `server/uploads/${req.files['orderimage'][0].filename}`,
                                                                            orderdate : month,
                                                                            orderPlace : orderPlace,
                                                                            ordertime : orderTimeDelivered,
                                                                            remainingtime : req.body.ordertime
                                                                        }
                                                                        connectDB.query('INSERT INTO orders SET ?', [meal], (err, results) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    for (var x = 0; x < extras1.length; x++) {
                                                                        let extra = {
                                                                            ordernumber: parseInt(meals[0].cartid, 10),
                                                                            userid: userid,
                                                                            restaurantid: restaurantid,
                                                                            mealid: extras[x].mealid,
                                                                            extraname: extras1[x].extraname,
                                                                            extraqty: extras1[x].extraqty,
                                                                            extratotalprice: extras[x].extratotalprice
                                                                        }
                                                                        connectDB.query('INSERT INTO ordersextras SET ?', [extra], (err, results1) => {
                                                                            if (err) {
                                                                                var object = {
                                                                                    status: 400,
                                                                                    message: `${err}`,
                                                                                    errors: [],
                                                                                    data: []
                                                                                }
                                                                                res.send(object)
                                                                            }
                                                                        })
                                                                    }
                                                                    var voiceorder = {
                                                                        ordernumber: parseInt(meals[0].cartid, 10),
                                                                        userid: userid,
                                                                        restaurantid: restaurantid,
                                                                        voice: voice
                                                                    }
                                                                    connectDB.query('INSERT INTO ordersvoice SET ?', [voiceorder], (err, resultss2 => {
                                                                        if (err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            connectDB.query('DELETE FROM cart WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results2) => {
                                                                                if (err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    connectDB.query('DELETE FROM cartextras WHERE userid = ? AND restaurantid = ?', [userid, restaurantid], (err, results3) => {
                                                                                        if (err) {
                                                                                            var object = {
                                                                                                status: 400,
                                                                                                message: `${err}`,
                                                                                                errors: [],
                                                                                                data: []
                                                                                            }
                                                                                            res.send(object)
                                                                                        }
                                                                                        else {
                                                                                            connectDB.query('UPDATE users SET points = ? WHERE userid = ?', [totalPoints.toString(), userid], (err, result) => {
                                                                                                if (err) {
                                                                                                    var object = {
                                                                                                        status: 400,
                                                                                                        message: `${err}`,
                                                                                                        errors: [],
                                                                                                        data: []
                                                                                                    }
                                                                                                    res.send(object)
                                                                                                }
                                                                                                else {
                                                                                                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                                                                        registration_ids: tokens, 
                                                                                                        
                                                                                                        notification : {
                                                                                                            title : 'Ready-Sa notification',
                                                                                                            body : 'لديك طلب جديد',
                                                                                                            "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                                                            "icon" : "fcm_push_icon"
                                                                                                        }
                                                                                                    };
                                                                                                    
                                                                                                    fcm1.send(message, function(err, response1){
                                                                                                        if (err) {
                                                                                                            var object = {
                                                                                                                status: 400,
                                                                                                                message: `${err}`,
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                        else {
                                                                                                            var object = {
                                                                                                                status: 200,
                                                                                                                message: 'تم ارسال طلبك',
                                                                                                                errors: [],
                                                                                                                data: []
                                                                                                            }
                                                                                                            res.send(object)
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    }))
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                        }
                    }
                    else {
                        var object = {
                            status: 400,
                            message: 'الوقت اقل من الوقت اللازم لتجهيز الطلب',
                            errors: [],
                            data: []
                        }
                        res.send(object)
                    }
                }
            })
        }
    },
    
    showOrders : (req,res) => {
        var id = req.params.userid

        connectDB.query('SELECT DISTINCT userid,restaurantid,restaurantname,restaurantimage FROM orders WHERE userid = ?' , [id] , (err,cart) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!cart || cart.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'no data' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(cart)
                    object = {
                        status : 200 ,
                        message : 'Success' ,
                        errors : [] ,
                        data : JSON.parse(json)
                    }
                res.send(object)
            }
        })
    },
    
    showRestaurantOrders : (req,res) => {
        var restaurantid = req.params.restaurantid,
            userid = req.body.userid,
            isDelivered = 'false',
            current_time = new Date(req.body.current_time)

            connectDB.query('SELECT DISTINCT ordernumber,userid,restaurantid,remainingtime,ordertime FROM orders WHERE userid = ? AND restaurantid = ? AND isDelivered = ?' , [userid,restaurantid,isDelivered] , (err,orders) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else if(!orders || orders.length == 0) {
                    var object = {
                        status : 200 ,
                        message : 'لا توجد طلبات' ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else {
                    let orders1 = []
                    for(var i = 0; i < orders.length; i++) {
                        var order = {
                            ordernumber : orders[i].ordernumber,
                            userid : orders[i].userid,
                            restaurantid : orders[i].restaurantid,
                            remainingtime : `ساعه ${Math.abs(new Date((orders[i].ordertime).toString()).getHours() - current_time.getHours())} - دقيقه ${Math.abs(new Date((orders[i].ordertime).toString()).getMinutes() - current_time.getMinutes())}`,
                            ordertime : new Date((orders[i].ordertime).toString()).toLocaleTimeString()
                        }
                        orders1.push(order)
                    }
                    var json = JSON.stringify(orders1.reverse())
                    object = {
                        status: 200,
                        message: 'Success',
                        errors: [],
                        data: JSON.parse(json)
                    }
                    res.send(object)
                }
            })
    },
    
    showOrdersItems : (req,res) => {
        var id = req.params.restaurantid,
            ordernumber = req.params.ordernumber,
            userid = req.body.userid,
            current_time = new Date(req.body.current_time)

        connectDB.query('SELECT * FROM orders WHERE ordernumber = ? AND userid = ? AND restaurantid = ?' , [ordernumber,userid,id] , (err,items) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            connectDB.query('SELECT * FROM ordersextras WHERE ordernumber = ? AND userid = ? AND restaurantid = ?' , [ordernumber,userid,id] , (err,extras) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                connectDB.query('SELECT * FROM ordersvoice WHERE ordernumber = ? AND userid = ? AND restaurantid = ?' , [ordernumber,userid,id] , (err,voices) => {
                    if(err) {
                        var object = {
                            status : 400 ,
                            message : `${err}` ,
                            errors : [] ,
                            data : []
                        }
                        res.send(object)
                    }
                    else if(items.length == 0 && extras.length == 0 && voices.length == 0) {
                        var object = {
                            status : 200 ,
                            message : 'no data' ,
                            errors : [] ,
                            data : []
                        }
                        res.send(object)
                    }
                    else if(extras.length == 0 && voices.length == 0) {
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND userid = ? AND restaurantid = ?' , [ordernumber,userid,id] , (err,ordertime) => {
                            if(err) {
                                var object = {
                                    status : 400 ,
                                    message : `${err}` ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                            let meals = []
                            for(var i = 0; i < items.length; i++){
                                var item = {
                                    cartid : items[i].cartid,
                                    userid : items[i].userid,
                                    restaurantid : items[i].restaurantid,
                                    restaurantname : items[i].restaurantname,
                                    mealid : items[i].mealid,
                                    mealname : items[i].mealname,
                                    qty : items[i].qty,
                                    totalprice : items[i].totalprice
                                }
                                meals.push(item)
                            }
                            var order = {
                                ordernumber : ordernumber,
                                voice : '',
                                meals : meals,
                                extras : [],
                                orderimage : `${items[0].orderimage}`,
                                remainingtime : `ساعه ${Math.abs(new Date((items[0].ordertime).toString()).getHours() - current_time.getHours())} - دقيقه ${Math.abs(new Date((items[0].ordertime).toString()).getMinutes() - current_time.getMinutes())}`,
                                time : `${new Date((items[0].ordertime).toString()).toLocaleTimeString()}`,
                                rate : `${items[0].rate}`
                            }
                            var object = {
                                status : 200 ,
                                message : 'success' ,
                                errors : [] ,
                                data : order
                            }
                            res.send(object)
                        })
                    }
                    else if(extras.length == 0) {
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND userid = ? AND restaurantid = ?' , [ordernumber,userid,id] , (err,ordertime) => {
                            if(err) {
                                var object = {
                                    status : 400 ,
                                    message : `${err}` ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                            let meals = []
                            for(var i = 0; i < items.length; i++){
                                var item = {
                                    cartid : items[i].cartid,
                                    userid : items[i].userid,
                                    restaurantid : items[i].restaurantid,
                                    restaurantname : items[i].restaurantname,
                                    mealid : items[i].mealid,
                                    mealname : items[i].mealname,
                                    qty : items[i].qty,
                                    totalprice : items[i].totalprice
                                }
                                meals.push(item)
                            }
                            var order = {
                                ordernumber : ordernumber,
                                voice : voices[0].voice,
                                meals : meals,
                                extras : [],
                                orderimage : `${items[0].orderimage}`,
                                remainingtime : `ساعه ${Math.abs(new Date((items[0].ordertime).toString()).getHours() - current_time.getHours())} - دقيقه ${Math.abs(new Date((items[0].ordertime).toString()).getMinutes() - current_time.getMinutes())}`,
                                time : `${new Date((items[0].ordertime).toString()).toLocaleTimeString()}`,
                                rate : `${items[0].rate}`
                            }
                            var object = {
                                status : 200 ,
                                message : 'success' ,
                                errors : [] ,
                                data : order
                            }
                            res.send(object)
                        })
                    }
                    else if(voices.length == 0) {
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND userid = ? AND restaurantid = ?' , [ordernumber,userid,id] , (err,ordertime) => {
                            if(err) {
                                var object = {
                                    status : 400 ,
                                    message : `${err}` ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                            let meals = []
                            for(var i = 0; i < items.length; i++){
                                var item = {
                                    cartid : items[i].cartid,
                                    userid : items[i].userid,
                                    restaurantid : items[i].restaurantid,
                                    restaurantname : items[i].restaurantname,
                                    mealid : items[i].mealid,
                                    mealname : items[i].mealname,
                                    qty : items[i].qty,
                                    totalprice : items[i].totalprice
                                }
                                meals.push(item)
                            }
                            let extras1 = []
                            for(var i = 0; i < extras.length; i++){
                                var extra = {
                                    extraname : extras[i].extraname,
                                    extraqty : extras[i].extraqty,
                                    extratotalprice : extras[i].extratotalprice
                                }
                                extras1.push(extra)
                            }
                            var order = {
                                ordernumber : ordernumber,
                                voice : '',
                                meals : meals,
                                extras : extras1,
                                orderimage : `${items[0].orderimage}`,
                                remainingtime : `ساعه ${Math.abs(new Date((items[0].ordertime).toString()).getHours() - current_time.getHours())} - دقيقه ${Math.abs(new Date((items[0].ordertime).toString()).getMinutes() - current_time.getMinutes())}`,
                                time : `${new Date((items[0].ordertime).toString()).toLocaleTimeString()}`,
                                rate : `${items[0].rate}`
                            }
                            var object = {
                                status : 200 ,
                                message : 'success' ,
                                errors : [] ,
                                data : order
                            }
                            res.send(object)
                        })
                    }
                    else {
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND userid = ? AND restaurantid = ?' , [ordernumber,userid,id] , (err,ordertime) => {
                            if(err) {
                                var object = {
                                    status : 400 ,
                                    message : `${err}` ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                            let meals = []
                            for(var i = 0; i < items.length; i++){
                                var item = {
                                    cartid : items[i].cartid,
                                    userid : items[i].userid,
                                    restaurantid : items[i].restaurantid,
                                    restaurantname : items[i].restaurantname,
                                    mealid : items[i].mealid,
                                    mealname : items[i].mealname,
                                    qty : items[i].qty,
                                    totalprice : items[i].totalprice
                                }
                                meals.push(item)
                            }
                            let extras1 = []
                            for(var i = 0; i < extras.length; i++){
                                var extra = {
                                    extraname : extras[i].extraname,
                                    extraqty : extras[i].extraqty,
                                    extratotalprice : extras[i].extratotalprice
                                }
                                extras1.push(extra)
                            }
                            var order = {
                                ordernumber : ordernumber,
                                voice : voices[0].voice,
                                meals : meals,
                                extras : extras1,
                                orderimage : `${items[0].orderimage}`,
                                remainingtime : `ساعه ${Math.abs(new Date((items[0].ordertime).toString()).getHours() - current_time.getHours())} - دقيقه ${Math.abs(new Date((items[0].ordertime).toString()).getMinutes() - current_time.getMinutes())}`,
                                time : `${new Date((items[0].ordertime).toString()).toLocaleTimeString()}`,
                                rate : `${items[0].rate}`
                            }
                            var object = {
                                status : 200 ,
                                message : 'success' ,
                                errors : [] ,
                                data : order
                            }
                            res.send(object)
                        })
                    }
                })
            })
        })
    },
    
    sendOffer : (req,res) => {
        let userid = req.body.userid,
            offerid = req.body.offerid,
            qty = req.body.qty,
            current_time = new Date(req.body.current_time),
            tokens = []
            
        var d = new Date();
        var month = d.getMonth()+1;

        connectDB.query('SELECT * FROM users WHERE userid = ?' , [userid] , (err,user) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            connectDB.query('SELECT * FROM offers WHERE offerid = ?' , [offerid] , (err,offers) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [offers[0].restaurantid] , (err,restaurants) => {
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
                        connectDB.query('SELECT ordernumber FROM orders ORDER BY orderid DESC' , (err,orderr) => {
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
                                var points = parseInt(user[0].points)
                                var mealpoints = parseInt(offers[0].mealpoints)
                                var totalPoints = points + mealpoints
                                var order = {
                                    ordernumber : parseInt(orderr[0].ordernumber) + 1,
                                    userid : userid,
                                    restaurantid : offers[0].restaurantid,
                                    restaurantname : restaurants[0].restaurantname,
                                    restaurantimage : restaurants[0].restaurantimage,
                                    mealid : offers[0].mealid,
                                    mealname : offers[0].mealname,
                                    mealpoints : offers[0].mealpoints,
                                    mealtime : offers[0].mealtime,
                                    qty : qty,
                                    totalprice : offers[0].mealnewprice,
                                    orderdate : month,
                                    ordertime : new Date(current_time.setMinutes(current_time.getMinutes() + parseInt(offers[0].mealtime))),
                                    remainingtime : offers[0].mealtime,
                                    isOffer : 'true'
                                }
                                connectDB.query('SELECT * FROM restaccounts WHERE restaurantid = ?' , [offers[0].restaurantid] , (err,restaccount) => {
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
                                        tokens.push(restaccount[0].restauranttoken)
                                        connectDB.query('INSERT INTO orders SET ?' , [order] , (err,result) => {
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
                                                connectDB.query('UPDATE users SET points = ? WHERE userid = ?' , [totalPoints.toString(),userid] , (err,resultssss) => {
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
                                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                                            registration_ids: tokens, 
                                                            
                                                            notification : {
                                                                title : 'Ready-Sa notification',
                                                                body : 'لديك طلب جديد',
                                                                "click_action" : "FCM_PLUGIN_ACTIVITY",
                                                                "icon" : "fcm_push_icon"
                                                            }
                                                        };
                                                        
                                                        fcm1.send(message, function(err, response1){
                                                           if (err) {
                                                               var object = {
                                                                   status: 400,
                                                                   message: `${err}`,
                                                                   errors: [],
                                                                   data: []
                                                               }
                                                               res.send(object)
                                                           }
                                                           else {
                                                               var object = {
                                                                   status: 200,
                                                                   message: 'تم ارسال طلبك',
                                                                   errors: [],
                                                                   data: []
                                                               }
                                                               res.send(object)
                                                           }
                                                       })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })
        })
    },
    
    reSendToCart : (req,res) => {
        var userid = req.body.userid,
            ordernumber = req.body.ordernumber,
            sql = 'SELECT userid,restaurantid,restaurantname,restaurantimage,mealid,mealname,mealpoints,mealtime,qty,totalprice FROM orders WHERE userid = ? AND ordernumber = ?',
            sql2 = 'SELECT userid,restaurantid,mealid,extraname,extraqty,extratotalprice FROM ordersextras WHERE userid = ? AND ordernumber = ?'

        connectDB.query(sql , [userid,ordernumber] , (err,orders) => {
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
                connectDB.query(sql2 , [userid,ordernumber] , (err,extras) => {
                    if(err) {
                        var object = {
                            status : 400 ,
                            message : `${err}` ,
                            errors : [] ,
                            data : []
                        }
                        res.send(object)
                    }
                    else if(!extras || extras.length == 0) {
                        connectDB.query('INSERT INTO cart SET ?' , orders , (err,result) => {
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
                                    message : 'تم ارسال الطلب الى السله' ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                        })
                    }
                    else {
                        connectDB.query('INSERT INTO cart SET ?' , orders , (err,result) => {
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
                                connectDB.query('INSERT INTO cartextras SET ?' , extras , (err,result1) => {
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
                                            message : 'تم ارسال الطلب الى السله' ,
                                            errors : [] ,
                                            data : []
                                        }
                                        res.send(object)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}