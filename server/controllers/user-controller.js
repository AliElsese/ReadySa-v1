const connectDB = require('../database/connection')
const qrcode = require('qrcode')

module.exports = {
    newUser : (req,res) => {
        var user = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword
        }
        connectDB.query('SELECT email FROM users WHERE email = ?' , [user.email] , (err,result) => {
            if(err) {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
            }
            else if(!result || result.length == 0) {
                connectDB.query('INSERT INTO users SET ?' , [user] , (err,results) => {
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
            else {
                var object = {
                    status : 400 ,
                    message : 'This Email Already Exists' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
        })
    },
    
    login : (req,res) => {
        var username = req.body.email,
            password = req.body.password
        connectDB.query('SELECT * FROM users WHERE email = ?' , [username] , (err,user) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!user || user.length == 0) {
                var object = {
                    status : 404 ,
                    message : 'User Not Found' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                if(user[0].password != password) {
                    var object = {
                        status : 400 ,
                        message : 'Your Password Is Wrong' ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else {
                    var json = JSON.stringify(user)
                        object = {
                            status : 200 ,
                            message : 'Success' ,
                            errors : [] ,
                            data : JSON.parse(json)
                        }
                    res.send(object)
                }
            }
        })
    },
    
    profile : (req,res) => {
        var id = req.body.userid
        connectDB.query('SELECT * FROM users WHERE userid = ?' , [id] , (err,user) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!user || user.length == 0) {
                var object = {
                    status : 404 ,
                    message : 'User Not Found' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var 
                    object = {
                        status : 200 ,
                        message : 'Success' ,
                        errors : [] ,
                        data : {
                            userid : user[0].userid,
                            firstname : user[0].firstname,
                            lastname : user[0].lastname,
                            email : user[0].email,
                            password : user[0].password,
                            confirmpassword : user[0].confirmpassword,
                            points : user[0].points
                        }
                    }
                res.send(object)
            }
        })
    },
    
    sendProposal : (req,res) => {
        var proposal = {
            restaurantid : req.body.restaurantid,
            proposaltype : req.body.proposaltype,
            proposal : req.body.proposal,
            type : req.body.type
        }
        connectDB.query('INSERT INTO proposals SET ?' , [proposal] , (err,result) => {
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
                    message : 'تم الارسال' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
        })
    },
    
    showUserRestaurants : (req,res) => {
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
                    message : 'لا توجد مطاعم' ,
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
    
    showUserOrders : (req,res) => {
        var restaurantid = req.params.restaurantid,
            userid = req.body.userid,
            isDelivered = 'false',
            current_time = new Date(req.body.current_time)

        connectDB.query('SELECT DISTINCT ordernumber,userid,restaurantid,remainingtime,ordertime FROM orders WHERE userid = ? AND restaurantid = ? AND isDelivered = ?', [userid, restaurantid, isDelivered], (err, orders) => {
            if (err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if (!orders || orders.length == 0) {
                var object = {
                    status: 200,
                    message: 'لا توجد طلبات',
                    errors: [],
                    data: []
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
    
    showUserOrderItems : (req,res) => {
        var ordernumber = req.params.ordernumber,
            id = req.body.restaurantid,
            current_time = new Date(req.body.current_time)

        connectDB.query('SELECT * FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,items) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            connectDB.query('SELECT * FROM ordersextras WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,extras) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                connectDB.query('SELECT * FROM ordersvoice WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,voices) => {
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime,MAX(ordertime) AS totaltimee FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime,MAX(ordertime) AS totaltimee FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime,MAX(ordertime) AS totaltimee FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime,MAX(ordertime) AS totaltimee FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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
    
    generateQRCode : (req,res) => {
        var text = req.body.ordernumber
        qrcode.toDataURL(text , (err,src) => {
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
                    data : {src}
                }
                res.send(object)
            }
        })
    },
    
    orderDelivered : (req,res) => {
        var userid = req.body.userid,
            ordernumber = req.body.ordernumber,
            isDelivered = 'true'

        connectDB.query('SELECT * FROM orders WHERE userid = ? AND ordernumber = ?' , [userid,ordernumber] , (err,order) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(order[0].orderstatus == 'false') {
                var object = {
                    status : 400 ,
                    message : 'لم يتم تجهيز الطلب بعد' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                if(order[0].isDelivered === 'true') {
                    var object = {
                        status : 400 ,
                        message : 'تم تسليم هذا الطلب من قبل' ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else {
                    if(order[0].isOffer == 'true') {
                        connectDB.query('DELETE FROM orders WHERE ordernumber = ? AND userid = ?' , [ordernumber,userid] , (err,result) => {
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
                                    message : 'تم تسليم الطلب' ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                        })
                    }
                    else {
                        connectDB.query('UPDATE orders SET isDelivered = ? WHERE ordernumber = ? AND userid = ?' , [isDelivered,ordernumber,userid] , (err,result) => {
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
                                    message : 'تم تسليم الطلب' ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                        })
                    }
                }
            }
        })
    },
    
    showUserOrdersDelivered : (req,res) => {
        var restaurantid = req.params.restaurantid,
            userid = req.body.userid,
            isDelivered = 'true'

        connectDB.query('SELECT DISTINCT ordernumber,userid,restaurantid FROM orders WHERE userid = ? AND restaurantid = ? AND isDelivered = ?', [userid, restaurantid, isDelivered], (err, orders) => {
            if (err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if (!orders || orders.length == 0) {
                var object = {
                    status: 200,
                    message: 'لا توجد طلبات',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(orders.reverse())
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
    
    addToLikes : (req,res) => {
        var id = req.body.mealid,
            userid = req.body.userid

        connectDB.query('SELECT * FROM likes WHERE userid = ? AND mealid = ?' , [userid,id] , (err,meals) => {
            if(err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if(!meals || meals.length == 0) {
                connectDB.query('SELECT * FROM menu WHERE mealid = ?' , [id] , (err,meal) => {
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
                        var data = {
                            mealid : meal[0].mealid,
                            restaurantid : meal[0].restaurantid,
                            cataid : meal[0].cataid,
                            subcataid : meal[0].subcataid,
                            mealname : meal[0].mealname,
                            mealprice : meal[0].mealprice,
                            mealdescription : meal[0].mealdescription,
                            mealimage : meal[0].mealimage,
                            mealpoints : meal[0].mealpoints,
                            mealtime : meal[0].mealtime,
                            userid : userid
                        }
                        connectDB.query('INSERT INTO likes SET ?' , [data] , (err,results) => {
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
                                var object = {
                                    status: 200,
                                    message: 'تم اضافة الوجبة الى الاعجابات',
                                    errors: [],
                                    data: []
                                }
                                res.send(object)
                            }
                        })
                    }
                })
            }
            else {
                var object = {
                    status: 400,
                    message: 'تم اضافتها للاعجابات من قبل',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },
    
    removeFromLikes : (req,res) => {
        var id = req.body.mealid,
            userid = req.body.userid
        
        connectDB.query('DELETE FROM likes WHERE mealid = ? AND userid = ?' , [id,userid] , (err,results) => {
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
                var object = {
                    status: 200,
                    message: 'تم الحذف من الاعجابات',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },
    
    showLikesList : (req,res) => {
        var id = req.body.userid,
            likes = [],
            mealsCatgories = [],
            mealsid = [],
            suggestions = []

        connectDB.query('SELECT * FROM likes WHERE userid = ?' , [id] , (err,meals) => {
            if(err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if(!meals || meals.length == 0) {
                var object = {
                    status: 200,
                    message: 'لا توجد اعجابات',
                    errors: [],
                    data: {likes,suggestions}
                }
                res.send(object)
            }
            else {
                for(var i = 0; i < meals.length; i++){
                    var meal = {
                        mealid : meals[i].mealid,
                        restaurantid : meals[i].restaurantid,
                        cataid : meals[i].cataid,
                        subcataid : meals[i].subcataid,
                        mealname : meals[i].mealname,
                        mealprice : meals[i].mealprice,
                        mealdescription : meals[i].mealdescription,
                        mealimage : meals[i].mealimage,
                        mealpoints : meals[i].mealpoints,
                        mealtime : meals[i].mealtime
                    }
                    likes.push(meal)
                    mealsCatgories.push(meal.cataid)
                    mealsid.push(meal.mealid)
                }
                var categoriesid = []
                mealsCatgories.forEach((c) => {
                    if(!categoriesid.includes(c)) {
                        categoriesid.push(c)
                    }
                })
                var sql = `SELECT * FROM menu WHERE cataid IN (${categoriesid})`
                connectDB.query(sql , (err,meals1) => {
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
                        for(var i = 0; i < 6; i++){
                            var meal1 = {
                                mealid : meals1[i].mealid,
                                restaurantid : meals1[i].restaurantid,
                                cataid : meals1[i].cataid,
                                subcataid : meals1[i].subcataid,
                                mealname : meals1[i].mealname,
                                mealprice : meals1[i].mealprice,
                                mealdescription : meals1[i].mealdescription,
                                mealimage : meals1[i].mealimage,
                                mealpoints : meals1[i].mealpoints,
                                mealtime : meals1[i].mealtime
                            }
                            suggestions.push(meal1)
                        }
                        var object = {
                            status: 200,
                            message: 'Success',
                            errors: [],
                            data: {likes,suggestions}
                        }
                        res.send(object)
                    }
                })
            }
        })
    },
    
    sendRate : (req,res) => {
        var userid = req.body.userid,
            ordernumber = req.body.ordernumber,
            rate = req.body.rate

        connectDB.query('UPDATE orders SET rate = ? WHERE userid = ? AND ordernumber = ?' , [rate,userid,ordernumber] , (err,result) => {
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
                var object = {
                    status: 200,
                    message: 'تم ارسال تقييمك',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    }
}