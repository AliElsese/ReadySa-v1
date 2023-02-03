const connectDB = require("../database/connection");

module.exports = {
    addAdmin : (req,res) => {
        if(!req.body.email || !req.body.password) {
            res.render('add-admin' , {
                message : 'من فضلك املأ جميع البيانات'
            })
        }
        else {
            let admin = {
                email : req.body.email,
                password : req.body.email
            }
            connectDB.query('SELECT * FROM admins WHERE email = ?' , [admin.email] , (err,admins) => {
                if(err) res.send(err)
                else if(!admins || admins.length == 0) {
                    connectDB.query('INSERT INTO admins SET ?' , [admin] , (err,results) => {
                        if(err) res.send(err)
                        connectDB.query('SELECT * FROM admins' , (err,admins1) => {
                            if(err) res.send(err)
                            res.render('dashboard-admins' , {
                                admins : admins1,
                                message : 'تم الإضافة'
                            })
                        })
                    })
                }
                else {
                    connectDB.query('SELECT * FROM admins' , (err,admins1) => {
                        if(err) res.send(err)
                        res.render('dashboard-admins' , {
                            admins : admins1,
                            message : 'هذا البريد الاليكتروني مستخدم من قبل'
                        })
                    })
                }
            })
        }
    },

    deleteAdmin : (req,res) => {
        var id = req.params.adminid
        connectDB.query('DELETE FROM admins WHERE adminid = ?' , [id] , (err,results) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM admins' , (err,admins) => {
                if(err) res.send(err)
                res.render('dashboard-admins' , {
                    admins : admins,
                    message : 'تم المسح'
                })
            })
        })
    },

    addRestaurant : (req,res) => {
        if(!req.body.email || !req.body.password) {
            res.render('add-restaurant' , {
                message : 'من فضلك املأ جميع البيانات'
            })
        }
        else {
            let restaurant = {
                email : req.body.email,
                password : req.body.email
            }
            connectDB.query('SELECT * FROM restaccounts WHERE email = ?' , [restaurant.email] , (err,restaurants) => {
                if(err) res.send(err)
                else if(!restaurants || restaurants.length == 0) {
                    connectDB.query('INSERT INTO restaccounts SET ?' , [restaurant] , (err,results) => {
                        if(err) res.send(err)
                        connectDB.query('SELECT * FROM restaccounts' , (err,restaurants1) => {
                            if(err) res.send(err)
                            res.render('dashboard-restaurants' , {
                                restaurants : restaurants1,
                                message : 'تم الإضافة'
                            })
                        })
                    })
                }
                else {
                    connectDB.query('SELECT * FROM restaccounts' , (err,restaurants1) => {
                        if(err) res.send(err)
                        res.render('dashboard-restaurants' , {
                            restaurants : restaurants1,
                            message : 'هذا البريد الاليكتروني مستخدم من قبل'
                        })
                    })
                }
            })
        }
    },
    
    updateRestaurant : (req,res) => {
        var id = req.body.restaurantid
        try {
            if( !req.body.email || !req.body.password ){
                connectDB.query('SELECT * FROM restaccounts' , (err,restaurants) => {
                    if(err) res.send(err)
                    res.render('dashboard-restaurants' , {
                        restaurant : restaurant,
                        message : 'من فضلك املا جميع البيانات'
                    })
                })
            } else {
                var email = req.body.email,
                    password = req.body.password
                    
                var sql = 'UPDATE restaccounts SET email = ? , password = ? WHERE restaurantid = ?'
                connectDB.query(sql , [email,password,id] , (err,results) => {
                    if(err) res.send(err)
                    connectDB.query('SELECT * FROM restaccounts' , (err,restaurants) => {
                        if(err) res.send(err)
                        res.render('dashboard-restaurants' , {
                            restaurants : restaurants,
                            message : 'تم التعديل'
                        })
                    })
                })
            }
        }
        catch (err) {
            res.end(err)
        }  
    },

    deleteRestaurant : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('DELETE FROM restaccounts WHERE restaurantid = ?' , [id] , (err,results) => {
            if(err) res.send(err)
            connectDB.query('DELETE FROM restaurants WHERE restaurantid = ?' , [id] , (err,results1) => {
                if(err) res.send(err)
                connectDB.query('DELETE FROM menu WHERE restaurantid = ?' , [id] , (err,results2) => {
                    if(err) res.send(err)
                    connectDB.query('DELETE FROM daymenu WHERE restaurantid = ?' , [id] , (err,results3) => {
                        if(err) res.send(err)
                        connectDB.query('DELETE FROM offers WHERE restaurantid = ?' , [id] , (err,results4) => {
                            if(err) res.send(err)
                            connectDB.query('SELECT * FROM restaccounts' , (err,restaurants) => {
                                if(err) res.send(err)
                                res.render('dashboard-restaurants' , {
                                    restaurants : restaurants,
                                    message : 'تم المسح'
                                })
                            })
                        })
                    })
                })
            })
        })
    },

    deleteMessage : (req,res) => {
        var id = req.params.messageid
        connectDB.query('DELETE FROM messages WHERE messageid = ?' , [id] , (err,results) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM messages' , (err,messages) => {
                if(err) res.send(err)
                res.render('dashboard-messages' , {
                    messages : messages,
                    message : 'تم المسح'
                })
            })
        })
    },

    addMeal : (req,res) => {
        var id = req.body.mealid
        connectDB.query('SELECT * FROM daymenu WHERE mealid = ?' , [id] , (err,meals) => {
            if(err) res.send(err)
            else if(!meals || meals.length == 0) {
                connectDB.query('SELECT * FROM menu WHERE mealid = ?' , [id] , (err,meal) => {
                    if(err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM categories WHERE cataid = ?' , [meal[0].cataid] , (err,categorie) => {
                            if(err) res.send(err)
                            var meal1 = {
                                mealid : id,
                                restaurantid : meal[0].restaurantid,
                                cataid : meal[0].cataid,
                                cataname : categorie[0].cataname,
                                cataimage : categorie[0].cataimage,
                                mealname : meal[0].mealname,
                                mealprice : meal[0].mealprice,
                                mealdescription : meal[0].mealdescription,
                                mealimage : meal[0].mealimage,
                                mealpoints : meal[0].mealpoints,
                                mealtime : meal[0].mealtime
                            }
                            connectDB.query('INSERT INTO daymenu SET ?' , [meal1] , (err,results) => {
                                if(err) res.send(err)
                                connectDB.query('SELECT * FROM menu' , (err,meals1) => {
                                    if(err) res.send(err)
                                    res.render('add-meal' , {
                                        meals : meals1,
                                        message : 'تم الإضافه'
                                    })
                                })
                            })
                        })
                    }
                })
            }
            else {
                connectDB.query('SELECT * FROM menu' , (err,meals1) => {
                    if(err) res.send(err)
                    res.render('add-meal' , {
                        meals : meals1,
                        message : 'تم اضافة هذه الوجبة من قبل'
                    })
                })
            }
        })
    },

    deleteMeal : (req,res) => {
        var id = req.params.mealid
        connectDB.query('DELETE FROM daymenu WHERE mealid = ?' , [id] , (err,results) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM daymenu' , (err,meals) => {
                if(err) res.send(err)
                res.render('dashboard-dayMenu' , {
                    meals : meals,
                    message : 'تم المسح'
                })
            })
        })
    },

    updateRestaurantDetails : (req,res) => {
        var id = req.body.restaurantid
        try {
            if( !req.body.restaurantname || !req.body.restaurantemail || !req.body.restaurantphone || !req.body.restaurantaddress || !req.file ){
                connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [id] , (err,restaurant) => {
                    if(err) res.send(err)
                    res.render('dashboard-restaurantDetails' , {
                        restaurant : restaurant,
                        message : 'من فضلك املا جميع البيانات'
                    })
                })
            } else {
                var restaurantimage = req.file.path,
                    restaurantname = req.body.restaurantname,
                    restaurantemail = req.body.restaurantemail,
                    restaurantaddress = req.body.restaurantaddress,
                    restaurantphone = req.body.restaurantphone
                var sql = 'UPDATE restaurants SET restaurantname = ? , restaurantemail = ? , restaurantphone = ? , restaurantaddress = ? , restaurantimage = ? WHERE restaurantid = ?'
                connectDB.query(sql , [restaurantname,restaurantemail,restaurantphone,restaurantaddress,restaurantimage,id] , (err,results) => {
                    if(err) res.send(err)
                    connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [id] , (err,restaurant) => {
                        if(err) res.send(err)
                        res.render('dashboard-restaurantDetails' , {
                            restaurant : restaurant,
                            message : 'تم التعديل'
                        })
                    })
                })
            }
        }
        catch (err) {
            res.end(err)
        }
    },

    addCategorie : (req,res) => {
        var id = req.body.restaurantid
        try {
            if( !req.body.cataname || !req.file ){
                connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
                    if(err) res.send(err)
                    res.render('dashboard-restaurantCategories' , {
                        categories : categories,
                        restaurantid : id,
                        message : 'من فضلك املا جميع البيانات'
                    })
                })
            } else {
                var cataimage = req.file.path,
                    cataname = req.body.cataname,
                    restaurantid = id
                var sql = 'INSERT INTO categories SET restaurantid = ? , cataname = ? , cataimage = ?'
                connectDB.query(sql , [restaurantid,cataname,cataimage] , (err,results) => {
                    if(err) res.send(err)
                    connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
                        if(err) res.send(err)
                        res.render('dashboard-restaurantCategories' , {
                            categories : categories,
                            restaurantid : id,
                            message : 'تم الاضافة'
                        })
                    })
                })
            }
        }
        catch (err) {
            res.end(err)
        }
    },

    updateCategorie : (req,res) => {
        var id = req.body.restaurantid
        try {
            if( !req.body.cataname || !req.file ){
                connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
                    if(err) res.send(err)
                    res.render('dashboard-restaurantCategories' , {
                        categories : categories,
                        restaurantid : id,
                        message : 'من فضلك املا جميع البيانات'
                    })
                })
            } else {
                var cataimage = req.file.path,
                    cataname = req.body.cataname,
                    restaurantid = id,
                    cataid = req.body.cataid
                var sql = 'UPDATE categories SET restaurantid = ? , cataname = ? , cataimage = ? WHERE cataid = ?'
                connectDB.query(sql , [restaurantid,cataname,cataimage,cataid] , (err,results) => {
                    if(err) res.send(err)
                    connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
                        if(err) res.send(err)
                        res.render('dashboard-restaurantCategories' , {
                            categories : categories,
                            restaurantid : id,
                            message : 'تم التعديل'
                        })
                    })
                })
            }
        }
        catch (err) {
            res.end(err)
        }
    },

    deleteCategorie : (req,res) => {
        var id = req.params.cataid,
            restaurantid = req.params.restaurantid
        connectDB.query('DELETE FROM categories WHERE cataid = ? AND restaurantid = ?' , [id,restaurantid] , (err,results) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [restaurantid] , (err,categories) => {
                if(err) res.send(err)
                res.render('dashboard-restaurantCategories' , {
                    categories : categories,
                    restaurantid : restaurantid,
                    message : 'تم المسح'
                })
            })
        })
    },

    addMealRestaurant : (req,res) => {
        var id = req.body.restaurantid
        try {
            if( !req.body.mealname || !req.body.mealprice || !req.body.mealpoints || !req.body.mealtime || !req.body.mealdescription || !req.file ){
                connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [id] , (err,meals) => {
                    if(err) res.send(err)
                    res.render('dashboard-restaurantMenus' , {
                        meals : meals,
                        restaurantid : id,
                        message : 'من فضلك املا جميع البيانات'
                    })
                })
            } else {
                var meal = {
                    mealname : req.body.mealname,
                    restaurantid : id,
                    cataid : req.body.cataid,
                    mealprice : req.body.mealprice,
                    mealdescription : req.body.mealdescription,
                    mealimage : req.file.path,
                    mealpoints : req.body.mealpoints,
                    mealtime : req.body.mealtime
                }
                var sql = 'INSERT INTO menu SET ?'
                connectDB.query(sql , [meal] , (err,results) => {
                    if(err) res.send(err)
                    connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [id] , (err,meals) => {
                        if(err) res.send(err)
                        res.render('dashboard-restaurantMenus' , {
                            meals : meals,
                            restaurantid : id,
                            message : 'تم الاضافة'
                        })
                    })
                })
            }
        }
        catch (err) {
            res.end(err)
        }
    },

    updateMealRestaurant : (req,res) => {
        var id = req.body.restaurantid
        try {
            if( !req.body.mealname || !req.body.mealprice || !req.body.mealpoints || !req.body.mealtime || !req.body.mealdescription || !req.file ){
                connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [id] , (err,meals) => {
                    if(err) res.send(err)
                    res.render('dashboard-restaurantMenus' , {
                        meals : meals,
                        restaurantid : id,
                        message : 'من فضلك املا جميع البيانات'
                    })
                })
            } else {
                var mealimage = req.file.path,
                    mealname = req.body.mealname,
                    mealprice = req.body.mealprice,
                    cataid = req.body.cataid,
                    mealpoints = req.body.mealpoints,
                    mealtime = req.body.mealtime,
                    mealdescription = req.body.mealdescription,
                    mealid = req.body.mealid
                var sql = 'UPDATE menu SET mealname = ? , cataid = ? , mealprice = ? , mealdescription = ? , mealimage = ? , mealpoints = ? , mealtime = ? WHERE mealid = ?'
                connectDB.query(sql , [mealname,cataid,mealprice,mealdescription,mealimage,mealpoints,mealtime,mealid] , (err,results) => {
                    if(err) res.send(err)
                    connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [id] , (err,meals) => {
                        if(err) res.send(err)
                        res.render('dashboard-restaurantMenus' , {
                            meals : meals,
                            restaurantid : id,
                            message : 'تم التعديل'
                        })
                    })
                })
            }
        }
        catch (err) {
            res.end(err)
        }
    },

    deleteMealRestaurant : (req,res) => {
        var id = req.params.mealid,
            restaurantid = req.params.restaurantid
        connectDB.query('DELETE FROM menu WHERE mealid = ? AND restaurantid = ?' , [id,restaurantid] , (err,results) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM menu WHERE restaurantid = ?' , [restaurantid] , (err,meals) => {
                if(err) res.send(err)
                res.render('dashboard-restaurantMenus' , {
                    meals : meals,
                    restaurantid : restaurantid,
                    message : 'تم المسح'
                })
            })
        })
    },
}