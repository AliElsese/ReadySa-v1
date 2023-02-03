const connectDB = require('../database/connection')
const jwt = require('jsonwebtoken')

module.exports = {
    showLoginAdminPage : (req,res) => {
        res.render('loginadmin')
    },

    logoutAdmin : (req,res) => {
        res.clearCookie('jwt').render('loginadmin')
    },

    loginAdminAccount : (req,res) => {
        let email = req.body.email,
            password = req.body.password

        if(!email || !password) {
            res.render('loginadmin' , {
                message : 'من فضلك املأ جميع البيانات'
            })
        }
        else {
            connectDB.query('SELECT * FROM admins WHERE email = ?' , [email] , (err,admin) => {
                if(err) res.send(err)
                if(!admin || admin.length == 0 || password != admin[0].password){
                    res.render('loginadmin' , {
                        message : 'اسم المستخدم او كلمة السر خطأ'
                    })
                } 
                else {
                    var id = admin[0].adminid
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
                    res.cookie('jwt' , token , cookieOptions)
                    res.render('dashboard')
                }
            })
        }
    },

    showDashboardPage : (req,res) => {
        res.render('dashboard')
    },

    showDashboardAdminsPage : (req,res) => {
        connectDB.query('SELECT * FROM admins' , (err,admins) => {
            if(err) res.send(err)
            res.render('dashboard-admins' , {
                admins : admins
            })
        })
    },

    showAddAdminPage : (req,res) => {
        res.render('add-admin')
    },

    showUpdateAdminPage : (req,res) => {
        var id = req.params.adminid
        connectDB.query('SELECT * FROM admins WHERE adminid = ?' , [id] , (err,admin) => {
            if(err) res.send(err)
            res.render('update-admin' , {
                admin : admin
            })
        })
    },

    showDashboardRestaurantsPage : (req,res) => {
        connectDB.query('SELECT * FROM restaccounts' , (err,restaurants) => {
            if(err) res.send(err)
            res.render('dashboard-restaurants' , {
                restaurants : restaurants
            })
        })
    },

    showAddRestaurantPage : (req,res) => {
        res.render('add-restaurant')
    },

    showUpdateRestaurantPage : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM restaccounts WHERE restaurantid = ?' , [id] , (err,restaurant) => {
            if(err) res.send(err)
            res.render('update-restaurant' , {
                restaurant : restaurant
            })
        })
    },

    showMessagesPage : (req,res) => {
        connectDB.query('SELECT * FROM messages' , (err,messages) => {
            if(err) res.send(err)
            res.render('dashboard-messages' , {
                messages : messages
            })
        })
    },

    showSingleMessage : (req,res) => {
        var id = req.params.id
        connectDB.query('SELECT * FROM messages WHERE messageid = ?' , [id] , (err,message) => {
            if(err) res.send(err)
            res.render('dashboard-singlemessage' , {
                message : message
            })
        })
    },

    showDayMenuPage : (req,res) => {
        connectDB.query('SELECT * FROM daymenu' , (err,meals) => {
            if(err) res.send(err)
            res.render('dashboard-dayMenu' , {
                meals : meals
            })
        })
    },

    showAddMealPage : (req,res) => {
        connectDB.query('SELECT * FROM menu' , (err,meals) => {
            if(err) res.send(err)
            res.render('add-meal' , {
                meals : meals
            })
        })
    },

    showRestaurantsPage : (req,res) => {
        res.render('dashboard-restaurant')
    },

    showRestaurantsDetPage : (req,res) => {
        connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
            if(err) res.send(err)
            res.render('dashboard-restaurants1' , {
                restaurants : restaurants
            })
        })
    },

    showSingleRestaurantDetails : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [id] , (err,restaurant) => {
            if(err) res.send(err)
            res.render('dashboard-restaurantDetails' , {
                restaurantid : id,
                restaurant : restaurant
            })
        })
    },

    showUpdateSingleRestaurantDetails : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [id] , (err,restaurant) => {
            if(err) res.send(err)
            res.render('update-restaurantDetails' , {
                restaurant : restaurant
            })
        })
    },

    showRestaurantsMenPage : (req,res) => {
        connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
            if(err) res.send(err)
            res.render('dashboard-restaurants2' , {
                restaurants : restaurants
            })
        })
    },

    showSingleRestaurantMenus : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [id] , (err,meals) => {
            if(err) res.send(err)
            res.render('dashboard-restaurantMenus' , {
                restaurantid : id,
                meals : meals
            })
        })
    },

    showRestaurantsCatPage : (req,res) => {
        connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
            if(err) res.send(err)
            res.render('dashboard-restaurants3' , {
                restaurants : restaurants
            })
        })
    },

    showSingleRestaurantCategories : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
            if(err) res.send(err)
            res.render('dashboard-restaurantCategories' , {
                restaurantid : id,
                categories : categories
            })
        })
    },

    showAddCategorie : (req,res) => {
        var id = req.params.restaurantid
        res.render('add-categorie' , {
            restaurantid : id
        })
    },

    showUpdateCategorie : (req,res) => {
        var id = req.params.cataid
        connectDB.query('SELECT * FROM categories WHERE cataid = ?' , [id] , (err,categorie) => {
            if(err) res.send(err)
            res.render('update-categorie' , {
                categorie : categorie
            })
        })
    },

    showAddMealRestaurant : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
            if(err) res.send(err)
            res.render('add-mealRestaurant' , {
                restaurantid : id,
                categories : categories
            })
        })
    },

    showUpdateMealRestaurant : (req,res) => {
        var id = req.params.mealid
        connectDB.query('SELECT * FROM menu WHERE mealid = ?' , [id] , (err,meal) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [meal[0].restaurantid] , (err,categories) => {
                if(err) res.send(err)
                res.render('update-mealRestaurant' , {
                    meal : meal,
                    categories : categories
                })
            })
        })
    },
    
    showDashboardStatisticsPage: (req, res) => {
        var 
            orderstatus = 'true'

        var d = new Date();
        var month = d.getMonth()+1;

        const reducer = (previousValue, currentValue) => previousValue + currentValue;

        connectDB.query('SELECT * FROM categories' , (err,categories) => {
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
                connectDB.query('SELECT * FROM menu' , (err,meals) => {
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
                        connectDB.query('SELECT * FROM employees' , (err,employees) => {
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
                                connectDB.query('SELECT ordernumber FROM orders WHERE orderstatus = ?' , [orderstatus] , (err,ordersCompleted) => {
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
                                        
                                        connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
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
                                                connectDB.query('SELECT ordernumber FROM orders WHERE orderstatus = ? AND orderdate = ?' , [orderstatus,month] , (err,ordersCompletedLastMonth) => {
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
                                                        connectDB.query('SELECT totalprice FROM orders WHERE orderstatus = ?' , [orderstatus] , (err,ordersCompletedTotalPrice) => {
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
                                                                connectDB.query('SELECT totalprice FROM orders WHERE orderstatus = ? AND orderdate = ?' , [orderstatus,month] , (err,ordersCompletedTotalPriceLastMonth) => {
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
                                                                            restaurants : restaurants.length
                                                                        }
                                                                        res.render('dashboard-statistics' , {
                                                                            statisicss : statisicss
                                                                        })
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
                                                                            restaurants : restaurants.length
                                                                        }
                                                                        res.render('dashboard-statistics' , {
                                                                            statisicss : statisicss
                                                                        })
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
                                                                            restaurants : restaurants.length
                                                                        }
                                                                        res.render('dashboard-statistics' , {
                                                                            statisicss : statisicss
                                                                        })
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
                                                                            restaurants : restaurants.length
                                                                        }
                                                                        res.render('dashboard-statistics' , {
                                                                            statisicss : statisicss
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
}