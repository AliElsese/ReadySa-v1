const connectDB = require('../database/connection')

module.exports = {
    languagesCode : (req,res) => {
        connectDB.query('SELECT * FROM translator' , (err,languages) => {
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
                var json = JSON.stringify(languages)
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
    
    login : (req,res) => {
        var email = req.body.email,
            password = req.body.password,
            restauranttoken = req.body.restauranttoken,
            type = req.body.type

        if(type == 'true') {
            connectDB.query('SELECT * FROM restaccounts WHERE email = ?' , [email] , (err,restaurant) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else if(!restaurant || restaurant.length == 0) {
                    var object = {
                        status : 404 ,
                        message : 'هذا المستخدم غير موجود' ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else {
                    if(restaurant[0].password != password) {
                        var object = {
                            status : 200 ,
                            message : 'كلمة السر خطأ' ,
                            errors : [] ,
                            data : []
                        }
                        res.send(object)
                    }
                    else {
                        connectDB.query('UPDATE restaccounts SET restauranttoken = ? WHERE restaurantid = ?' , [restauranttoken,restaurant[0].restaurantid] , (err,resultss) => {
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
                                var json = JSON.stringify(restaurant)
                                    object = {
                                        status: 200,
                                        message: 'تم تسجيل الدخول',
                                        errors: [],
                                        data: JSON.parse(json)
                                    }
                                res.send(object)
                            }
                        })
                    }
                }
            })
        }
        else {
            connectDB.query('SELECT * FROM brancheaccounts WHERE email = ?' , [email] , (err,restaurant) => {
                if(err) {
                    var object = {
                        status : 400 ,
                        message : `${err}` ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else if(!restaurant || restaurant.length == 0) {
                    var object = {
                        status : 404 ,
                        message : 'هذا المستخدم غير موجود' ,
                        errors : [] ,
                        data : []
                    }
                    res.send(object)
                }
                else {
                    if(restaurant[0].password != password) {
                        var object = {
                            status : 200 ,
                            message : 'كلمة السر خطأ' ,
                            errors : [] ,
                            data : []
                        }
                        res.send(object)
                    }
                    else {
                        connectDB.query('UPDATE brancheaccounts SET restauranttoken = ? WHERE brancheid = ?' , [restauranttoken,restaurant[0].brancheid] , (err,resultss) => {
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
                                var json = JSON.stringify(restaurant)
                                    object = {
                                        status: 200,
                                        message: 'تم تسجيل الدخول',
                                        errors: [],
                                        data: JSON.parse(json)
                                    }
                                res.send(object)
                            }
                        })
                    }
                }
            })
        }
    },

    showRestaurantOrders : (req,res) => {
        var restaurantid = req.params.restaurantid,
            orderstatus = 'false',
            type = req.body.type,
            current_time = new Date(req.body.current_time)

        if(type == 'true') {
            let orderPlace = 'true'
            connectDB.query('SELECT DISTINCT ordernumber,userid,restaurantid,remainingtime,ordertime FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?', [restaurantid,orderstatus,orderPlace], (err, orders) => {
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
        }
        else {
            let orderPlace = 'false'
            connectDB.query('SELECT DISTINCT ordernumber,userid,restaurantid,remainingtime,ordertime FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?', [restaurantid,orderstatus,orderPlace], (err, orders) => {
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
        }
    },

    showOrdersItems : (req,res) => {
        var id = req.params.restaurantid,
            ordernumber = req.params.ordernumber,
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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
                        connectDB.query('SELECT MAX(mealtime) AS totaltime FROM orders WHERE ordernumber = ? AND restaurantid = ?' , [ordernumber,id] , (err,ordertime) => {
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

    showRestaurantOrdersCompleted : (req,res) => {
        var restaurantid = req.params.restaurantid,
            orderstatus = 'true',
            type = req.body.type

        if(type == 'true') {
            let orderPlace = 'true'
            connectDB.query('SELECT DISTINCT ordernumber,restaurantid FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?', [restaurantid,orderstatus,orderPlace], (err, orders) => {
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
                    var json = JSON.stringify(orders)
                    object = {
                        status: 200,
                        message: 'Success',
                        errors: [],
                        data: JSON.parse(json)
                    }
                    res.send(object)
                }
            })
        }
        else {
            let orderPlace = 'false'
            connectDB.query('SELECT DISTINCT ordernumber,restaurantid FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?', [restaurantid,orderstatus,orderPlace], (err, orders) => {
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
                    var json = JSON.stringify(orders)
                    object = {
                        status: 200,
                        message: 'Success',
                        errors: [],
                        data: JSON.parse(json)
                    }
                    res.send(object)
                }
            })
        }
    },
    
    restaurantAddOffer : (req,res) => {
        var mealid = req.body.mealid
        connectDB.query('SELECT * FROM menu WHERE mealid = ?' , [mealid] , (err,meal) => {
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
                var offer = {
                    restaurantid : req.body.restaurantid,
                    mealid : mealid,
                    mealname : meal[0].mealname,
                    mealprice : meal[0].mealprice,
                    mealnewprice : req.body.mealnewprice,
                    mealimage : meal[0].mealimage,
                    mealpoints : meal[0].mealpoints,
                    mealtime : meal[0].mealtime
                }
                connectDB.query('INSERT INTO offers SET ?' , [offer] , (err,result) => {
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
                            message: 'تم اضافة العرض',
                            errors: [],
                            data: []
                        }
                        res.send(object)
                    }
                })
            }
        })
    },
    
    restaurantAddCategorie : (req,res) => {
        var categorie = {
            restaurantid : req.body.restaurantid,
            cataname : req.body.cataname,
            cataimage : `server/uploads/${req.file.filename}`
        }
        connectDB.query('INSERT INTO categories SET ?' , [categorie] , (err,result) => {
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
                    message: 'تم اضافة القسم',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },

    restaurantAddSubCategorie : (req,res) => {
        var categorie = {
            cataid : req.body.cataid,
            restaurantid : req.body.restaurantid,
            subcataname : req.body.subcataname,
            subcataimage : `server/uploads/${req.file.filename}`
        }
        connectDB.query('INSERT INTO subcategories SET ?' , [categorie] , (err,result) => {
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
                    message: 'تم اضافة القسم',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },
    
    restaurantCategories : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
            if(err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if (!categories || categories.length == 0) {
                var object = {
                    status: 200,
                    message: 'لا توجد اقسام',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(categories)
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

    restaurantSubCategories : (req,res) => {
        var id = req.params.restaurantid,
            cataid = req.params.cataid
        connectDB.query('SELECT * FROM subcategories WHERE restaurantid = ? AND cataid = ?' , [id,cataid] , (err,categories) => {
            if(err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if (!categories || categories.length == 0) {
                var object = {
                    status: 200,
                    message: 'لا توجد اقسام',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(categories)
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
    
    restaurantAddMeal : (req,res) => {
        var cataname = req.body.cataname
        connectDB.query('SELECT * FROM subcategories WHERE subcataname = ?' , [cataname] , (err,categorie) => {
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
                var meal = {
                    restaurantid : req.body.restaurantid,
                    cataid : categorie[0].cataid,
                    subcataid : categorie[0].subcataid,
                    mealname : req.body.mealname,
                    mealprice : req.body.mealprice,
                    mealdescription : req.body.mealdescription,
                    mealimage : `server/uploads/${req.file.filename}`,
                    mealpoints : req.body.mealpoints,
                    mealtime : req.body.mealtime
                }
                connectDB.query('INSERT INTO menu SET ?' , [meal] , (err,result) => {
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
                            message: 'تم اضافة الوجبة',
                            errors: [],
                            data: []
                        }
                        res.send(object)
                    }
                })
            }
        })
    },
    
    restaurantMeals : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [id] , (err,meals) => {
            if(err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if (!meals || meals.length == 0) {
                var object = {
                    status: 200,
                    message: 'لا توجد وجبات',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(meals)
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
    
    restaurantAddEmployee : (req,res) => {
        var employee = {
            restaurantid : req.body.restaurantid,
            name : req.body.name,
            phone : req.body.phone,
            password : req.body.password
        }
        connectDB.query('INSERT INTO employees SET ?' , [employee] , (err,result) => {
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
                    message: 'تم اضافة الموظف',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },
    
    restaurantAddDetails : (req,res) => {
        var id = req.body.restaurantid,
            type = req.body.type

        if(type == 'true') {
            connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [id] , (err,restaurant) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else if(!restaurant || restaurant.length == 0) {
                    var info = {
                        restaurantid : id,
                        restaurantname : req.body.restaurantname,
                        restaurantemail : req.body.restaurantemail,
                        restaurantphone : req.body.restaurantphone,
                        restaurantimage : `server/uploads/${req.file.filename}`,
                        restaurantaddress : req.body.restaurantaddress,
                        lat : req.body.lat,
                        lang : req.body.lang
                    }
                    connectDB.query('INSERT INTO restaurants SET ?' , [info] , (err,result) => {
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
                                message: 'تم اضافة البيانات',
                                errors: [],
                                data: []
                            }
                            res.send(object)
                        }
                    })
                }
                else {
                    var info = {
                        restaurantid : id,
                        restaurantname : req.body.restaurantname,
                        restaurantemail : req.body.restaurantemail,
                        restaurantphone : req.body.restaurantphone,
                        restaurantimage : `server/uploads/${req.file.filename}`,
                        restaurantaddress : req.body.restaurantaddress,
                        lat : req.body.lat,
                        lang : req.body.lang
                    }
                    connectDB.query('UPDATE restaurants SET ? WHERE restaurantid = ?' , [info,id] , (err,result) => {
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
                                message: 'تم اضافة البيانات',
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
            var brancheid = req.body.brancheid
            connectDB.query('SELECT * FROM branches WHERE brancheid = ?' , [brancheid] , (err,restaurant) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else if(!restaurant || restaurant.length == 0) {
                    var info = {
                        brancheid : brancheid,
                        restaurantid : id,
                        restaurantemail : req.body.restaurantemail,
                        restaurantphone : req.body.restaurantphone,
                        restaurantaddress : req.body.restaurantaddress,
                        lat : req.body.lat,
                        lang : req.body.lang
                    }
                    connectDB.query('INSERT INTO branches SET ?' , [info] , (err,result) => {
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
                                message: 'تم اضافة البيانات',
                                errors: [],
                                data: []
                            }
                            res.send(object)
                        }
                    })
                }
                else {
                    var info = {
                        brancheid : brancheid,
                        restaurantid : id,
                        restaurantemail : req.body.restaurantemail,
                        restaurantphone : req.body.restaurantphone,
                        restaurantaddress : req.body.restaurantaddress,
                        lat : req.body.lat,
                        lang : req.body.lang
                    }
                    connectDB.query('UPDATE branches SET ? WHERE brancheid = ?' , [info,brancheid] , (err,result) => {
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
                                message: 'تم اضافة البيانات',
                                errors: [],
                                data: []
                            }
                            res.send(object)
                        }
                    })
                }
            })
        }
    },

    restaurantAddBranche : (req,res) => {
        var info = {
            restaurantid : req.body.restaurantid,
            email : req.body.email,
            password : req.body.password
        }
        connectDB.query('SELECT * FROM brancheaccounts WHERE email = ?' , [info.email] , (err,branche) => {
            if(err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if(!branche || branche.length == 0) {
                connectDB.query('INSERT INTO brancheaccounts SET ?' , [info] , (err,results) => {
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
                            message: 'تم اضافة حساب الفرع',
                            errors: [],
                            data: []
                        }
                        res.send(object)
                    }
                })
            }
            else {
                var object = {
                    status: 200,
                    message: 'يوجد فرع بهذا الحساب',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },
    
    restaurantCheck : (req,res) => {
        var type = req.body.type,
            id = req.body.restaurantid,
            restaurantCheck = 0
        
        if(type == 'true') {
            connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [id] , (err,restaurant) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else if(!restaurant || restaurant.length == 0) {
                    var object = {
                        status: 200,
                        message: 'لا توجد بيانات لهذا المطعم',
                        errors: [],
                        data: restaurantCheck
                    }
                    res.send(object)
                }
                else {
                    var object = {
                        status: 200,
                        message: 'توجد بيانات لهذا المطعم',
                        errors: [],
                        data: {restaurantCheck : 1}
                    }
                    res.send(object)
                }
            })
        }
        else {
            connectDB.query('SELECT * FROM branches WHERE brancheid = ?' , [id] , (err,restaurant) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else if(!restaurant || restaurant.length == 0) {
                    var object = {
                        status: 200,
                        message: 'لا توجد بيانات لهذا الفرع',
                        errors: [],
                        data: restaurantCheck
                    }
                    res.send(object)
                }
                else {
                    var object = {
                        status: 200,
                        message: 'توجد بيانات لهذا لفرع',
                        errors: [],
                        data: {restaurantCheck : 1}
                    }
                    res.send(object)
                }
            })
        }
    },
    
    // Api Statistics And Proposals
    restaurantAllStatistics : (req,res) => {
        var id = req.params.restaurantid,
            orderstatus = 'true',
            type = req.body.type

        var d = new Date();
        var month = d.getMonth()+1;

        const reducer = (previousValue, currentValue) => previousValue + currentValue;

        if(type == 'true') {
            let orderPlace = 'true'
            connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
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
                    connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [id] , (err,meals) => {
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
                            connectDB.query('SELECT * FROM employees WHERE restaurantid = ? AND type = ?' , [id,type] , (err,employees) => {
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
                                    connectDB.query('SELECT DISTINCT ordernumber FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?' , [id,orderstatus,orderPlace] , (err,ordersCompleted) => {
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
                                            var orderstatus1 = 'false'
                                            connectDB.query('SELECT DISTINCT ordernumber FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?' , [id,orderstatus1,orderPlace] , (err,ordersNotCompleted) => {
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
                                                    connectDB.query('SELECT DISTINCT ordernumber FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderdate = ? AND orderPlace = ?' , [id,orderstatus,month,orderPlace] , (err,ordersCompletedLastMonth) => {
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
                                                            connectDB.query('SELECT totalprice FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?' , [id,orderstatus,orderPlace] , (err,ordersCompletedTotalPrice) => {
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
                                                                    connectDB.query('SELECT totalprice FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderdate = ? AND orderPlace = ?' , [id,orderstatus,month,orderPlace] , (err,ordersCompletedTotalPriceLastMonth) => {
                                                                        if(err) {
                                                                            var object = {
                                                                                status: 400,
                                                                                message: `${err}`,
                                                                                errors: [],
                                                                                data: []
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else if(ordersCompletedTotalPriceLastMonth.length == 0 && ordersCompletedTotalPrice.length == 0) {
                                                                            var statisicss = {
                                                                                categories : categories.length,
                                                                                meals : meals.length,
                                                                                employees : employees.length,
                                                                                ordersCompleted : ordersCompleted.length,
                                                                                ordersCompletedTotalPrice : ordersCompletedTotalPrice.length,
                                                                                ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                ordersCompletedTotalPriceLastMonth : ordersCompletedTotalPriceLastMonth.length,
                                                                                ordersNotCompleted : ordersNotCompleted.length
                                                                            }
                                                                            var object = {
                                                                                status: 200,
                                                                                message: 'الاحصائيات',
                                                                                errors: [],
                                                                                data: statisicss
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else if(ordersCompletedTotalPrice.length == 0) {
                                                                            var array2 = []
                                                                            for(var y = 0; y < ordersCompletedTotalPriceLastMonth.length; y++){
                                                                                array2.push(parseInt(ordersCompletedTotalPriceLastMonth[y].totalprice))
                                                                            }
                                                                            var statisicss = {
                                                                                categories : categories.length,
                                                                                meals : meals.length,
                                                                                employees : employees.length,
                                                                                ordersCompleted : ordersCompleted.length,
                                                                                ordersCompletedTotalPrice : ordersCompletedTotalPrice.length,
                                                                                ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                ordersCompletedTotalPriceLastMonth : array2.reduce(reducer),
                                                                                ordersNotCompleted : ordersNotCompleted.length
                                                                            }
                                                                            var object = {
                                                                                status: 200,
                                                                                message: 'الاحصائيات',
                                                                                errors: [],
                                                                                data: statisicss
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else if(ordersCompletedTotalPriceLastMonth.length == 0) {
                                                                            var array1 = []
                                                                            for(var x = 0; x < ordersCompletedTotalPrice.length; x++){
                                                                                array1.push(parseInt(ordersCompletedTotalPrice[x].totalprice))
                                                                            }
                                                                            var statisicss = {
                                                                                categories : categories.length,
                                                                                meals : meals.length,
                                                                                employees : employees.length,
                                                                                ordersCompleted : ordersCompleted.length,
                                                                                ordersCompletedTotalPrice : array1.reduce(reducer),
                                                                                ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                ordersCompletedTotalPriceLastMonth : ordersCompletedTotalPriceLastMonth.length,
                                                                                ordersNotCompleted : ordersNotCompleted.length
                                                                            }
                                                                            var object = {
                                                                                status: 200,
                                                                                message: 'الاحصائيات',
                                                                                errors: [],
                                                                                data: statisicss
                                                                            }
                                                                            res.send(object)
                                                                        }
                                                                        else {
                                                                            var array1 = []
                                                                            for(var x = 0; x < ordersCompletedTotalPrice.length; x++){
                                                                                array1.push(parseInt(ordersCompletedTotalPrice[x].totalprice))
                                                                            }
                                                                            var array2 = []
                                                                            for(var y = 0; y < ordersCompletedTotalPriceLastMonth.length; y++){
                                                                                array2.push(parseInt(ordersCompletedTotalPriceLastMonth[y].totalprice))
                                                                            }
                                                                            var statisicss = {
                                                                                categories : categories.length,
                                                                                meals : meals.length,
                                                                                employees : employees.length,
                                                                                ordersCompleted : ordersCompleted.length,
                                                                                ordersCompletedTotalPrice : array1.reduce(reducer),
                                                                                ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                ordersCompletedTotalPriceLastMonth : array2.reduce(reducer),
                                                                                ordersNotCompleted : ordersNotCompleted.length
                                                                            }
                                                                            var object = {
                                                                                status: 200,
                                                                                message: 'الاحصائيات',
                                                                                errors: [],
                                                                                data: statisicss
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
                        }
                    })
                }
            })
        }
        else {
            connectDB.query('SELECT * FROM branches WHERE brancheid = ?' , [id] , (err,branche) => {
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
                    let orderPlace = 'false'
                    connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [branche[0].restaurantid] , (err,categories) => {
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
                            connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [branche[0].restaurantid] , (err,meals) => {
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
                                    connectDB.query('SELECT * FROM employees WHERE restaurantid = ? AND type = ?' , [id,type] , (err,employees) => {
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
                                            connectDB.query('SELECT DISTINCT ordernumber FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?' , [id,orderstatus,orderPlace] , (err,ordersCompleted) => {
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
                                                    var orderstatus1 = 'false'
                                                    connectDB.query('SELECT DISTINCT ordernumber FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?' , [id,orderstatus1,orderPlace] , (err,ordersNotCompleted) => {
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
                                                            connectDB.query('SELECT DISTINCT ordernumber FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderdate = ? AND orderPlace = ?' , [id,orderstatus,month,orderPlace] , (err,ordersCompletedLastMonth) => {
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
                                                                    connectDB.query('SELECT totalprice FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderPlace = ?' , [id,orderstatus,orderPlace] , (err,ordersCompletedTotalPrice) => {
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
                                                                            connectDB.query('SELECT totalprice FROM orders WHERE restaurantid = ? AND orderstatus = ? AND orderdate = ? AND orderPlace = ?' , [id,orderstatus,month,orderPlace] , (err,ordersCompletedTotalPriceLastMonth) => {
                                                                                if(err) {
                                                                                    var object = {
                                                                                        status: 400,
                                                                                        message: `${err}`,
                                                                                        errors: [],
                                                                                        data: []
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else if(ordersCompletedTotalPriceLastMonth.length == 0 && ordersCompletedTotalPrice.length == 0) {
                                                                                    var statisicss = {
                                                                                        categories : categories.length,
                                                                                        meals : meals.length,
                                                                                        employees : employees.length,
                                                                                        ordersCompleted : ordersCompleted.length,
                                                                                        ordersCompletedTotalPrice : ordersCompletedTotalPrice.length,
                                                                                        ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                        ordersCompletedTotalPriceLastMonth : ordersCompletedTotalPriceLastMonth.length,
                                                                                        ordersNotCompleted : ordersNotCompleted.length
                                                                                    }
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'الاحصائيات',
                                                                                        errors: [],
                                                                                        data: statisicss
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else if(ordersCompletedTotalPrice.length == 0) {
                                                                                    var array2 = []
                                                                                    for(var y = 0; y < ordersCompletedTotalPriceLastMonth.length; y++){
                                                                                        array2.push(parseInt(ordersCompletedTotalPriceLastMonth[y].totalprice))
                                                                                    }
                                                                                    var statisicss = {
                                                                                        categories : categories.length,
                                                                                        meals : meals.length,
                                                                                        employees : employees.length,
                                                                                        ordersCompleted : ordersCompleted.length,
                                                                                        ordersCompletedTotalPrice : ordersCompletedTotalPrice.length,
                                                                                        ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                        ordersCompletedTotalPriceLastMonth : array2.reduce(reducer),
                                                                                        ordersNotCompleted : ordersNotCompleted.length
                                                                                    }
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'الاحصائيات',
                                                                                        errors: [],
                                                                                        data: statisicss
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else if(ordersCompletedTotalPriceLastMonth.length == 0) {
                                                                                    var array1 = []
                                                                                    for(var x = 0; x < ordersCompletedTotalPrice.length; x++){
                                                                                        array1.push(parseInt(ordersCompletedTotalPrice[x].totalprice))
                                                                                    }
                                                                                    var statisicss = {
                                                                                        categories : categories.length,
                                                                                        meals : meals.length,
                                                                                        employees : employees.length,
                                                                                        ordersCompleted : ordersCompleted.length,
                                                                                        ordersCompletedTotalPrice : array1.reduce(reducer),
                                                                                        ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                        ordersCompletedTotalPriceLastMonth : ordersCompletedTotalPriceLastMonth.length,
                                                                                        ordersNotCompleted : ordersNotCompleted.length
                                                                                    }
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'الاحصائيات',
                                                                                        errors: [],
                                                                                        data: statisicss
                                                                                    }
                                                                                    res.send(object)
                                                                                }
                                                                                else {
                                                                                    var array1 = []
                                                                                    for(var x = 0; x < ordersCompletedTotalPrice.length; x++){
                                                                                        array1.push(parseInt(ordersCompletedTotalPrice[x].totalprice))
                                                                                    }
                                                                                    var array2 = []
                                                                                    for(var y = 0; y < ordersCompletedTotalPriceLastMonth.length; y++){
                                                                                        array2.push(parseInt(ordersCompletedTotalPriceLastMonth[y].totalprice))
                                                                                    }
                                                                                    var statisicss = {
                                                                                        categories : categories.length,
                                                                                        meals : meals.length,
                                                                                        employees : employees.length,
                                                                                        ordersCompleted : ordersCompleted.length,
                                                                                        ordersCompletedTotalPrice : array1.reduce(reducer),
                                                                                        ordersCompletedLastMonth : ordersCompletedLastMonth.length,
                                                                                        ordersCompletedTotalPriceLastMonth : array2.reduce(reducer),
                                                                                        ordersNotCompleted : ordersNotCompleted.length
                                                                                    }
                                                                                    var object = {
                                                                                        status: 200,
                                                                                        message: 'الاحصائيات',
                                                                                        errors: [],
                                                                                        data: statisicss
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
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    restaurantProposals : (req,res) => {
        var id = req.params.restaurantid,
            type = req.body.type

        if(type == 'true') {
            connectDB.query('SELECT * FROM proposals WHERE restaurantid = ? AND type = ?' , [id,type] , (err,proposals) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else if (!proposals || proposals.length == 0) {
                    var object = {
                        status: 200,
                        message: 'لا توجد شكاوي او مقترحات',
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else {
                    var json = JSON.stringify(proposals)
                    object = {
                        status: 200,
                        message: 'Success',
                        errors: [],
                        data: JSON.parse(json)
                    }
                    res.send(object)
                }
            })
        }
        else {
            connectDB.query('SELECT * FROM proposals WHERE restaurantid = ? AND type = ?' , [id,type] , (err,proposals) => {
                if(err) {
                    var object = {
                        status: 400,
                        message: `${err}`,
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else if (!proposals || proposals.length == 0) {
                    var object = {
                        status: 200,
                        message: 'لا توجد شكاوي او مقترحات',
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else {
                    var json = JSON.stringify(proposals)
                    object = {
                        status: 200,
                        message: 'Success',
                        errors: [],
                        data: JSON.parse(json)
                    }
                    res.send(object)
                }
            })
        }
    },

    deleteProposal : (req,res) => {
        var id = req.params.proposalid
        connectDB.query('DELETE FROM proposals WHERE proposalid = ?' , [id] , (err,result) => {
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
                    message: 'تم حل الشكوى',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },
    
    // Api Employee App
    loginEmployee : (req,res) => {
        var phone = req.body.phone,
            password = req.body.password,
            employeetoken = req.body.employeetoken

        connectDB.query('SELECT * FROM employees WHERE phone = ?', [phone], (err, employee) => {
            if (err) {
                var object = {
                    status: 400,
                    message: `${err}`,
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else if (!employee || employee.length == 0) {
                var object = {
                    status: 404,
                    message: 'هذا المستخدم غير موجود',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
            else {
                if (employee[0].password != password) {
                    var object = {
                        status: 200,
                        message: 'كلمة السر خطأ',
                        errors: [],
                        data: []
                    }
                    res.send(object)
                }
                else {
                    connectDB.query('UPDATE employees SET employeetoken = ? WHERE id = ? AND restaurantid = ?' , [employeetoken,employee[0].id,employee[0].restaurantid] , (err,resultss) => {
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
                            var json = JSON.stringify(employee[0])
                                object = {
                                    status: 200,
                                    message: 'تم تسجيل الدخول',
                                    errors: [],
                                    data: JSON.parse(json)
                                }
                            res.send(object)
                        }
                    })
                }
            }
        })
    },

    confirmOrder : (req,res) => {
        var id = req.body.restaurantid,
            ordernumber = req.body.ordernumber,
            orderstatus = 'true'

        connectDB.query('UPDATE orders SET orderstatus = ? WHERE ordernumber = ? AND restaurantid = ?' , [orderstatus,ordernumber,id] , (err,results) => {
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
                    message: 'تم تجهيز الطلب',
                    errors: [],
                    data: []
                }
                res.send(object)
            }
        })
    },
    
    employeeOrders : (req,res) => {
        var restaurantid = req.body.restaurantid,
            orderstatus = 'false',
            employeeid = req.body.employeeid,
            current_time = new Date(req.body.current_time)
            
        connectDB.query('SELECT DISTINCT ordernumber,userid,restaurantid,remainingtime,ordertime FROM orders WHERE restaurantid = ? AND orderstatus = ? AND employeeid = ?', [restaurantid,orderstatus,employeeid], (err, orders) => {
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
    }
}