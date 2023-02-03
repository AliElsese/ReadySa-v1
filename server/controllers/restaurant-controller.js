const connectDB = require('../database/connection')
var list = []

module.exports = {
    allRestaurants : (req,res) => {
        connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!restaurants || restaurants.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'No Data' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(restaurants)
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

    restaurantBranches : (req,res) => {
        var id = req.params.restaurantid

        connectDB.query('SELECT brancheid,restaurantaddress FROM branches WHERE restaurantid = ?' , [id] , (err,restaurants) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!restaurants || restaurants.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'ليس له افرع' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(restaurants)
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

    restaurantBranches1 : (req,res) => {
        var id = req.params.restaurantid

        connectDB.query('SELECT * FROM branches WHERE restaurantid = ?' , [id] , (err,restaurants) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!restaurants || restaurants.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'ليس له افرع' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(restaurants)
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
    
    restaurantCategories : (req,res) => {
        var id = req.params.restaurantid
        connectDB.query('SELECT * FROM categories WHERE restaurantid = ?' , [id] , (err,categories) => {
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
                var json = JSON.stringify(categories)
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

    restaurantSubCategories : (req,res) => {
        var id = req.params.cataid

        connectDB.query('SELECT * FROM subcategories WHERE AND cataid = ?' , [id] , (err,subcategories) => {
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
                var json = JSON.stringify(subcategories)
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

    restaurantMenu : (req,res) => {
        var id = req.params.subcataid
        
        connectDB.query('SELECT * FROM menu WHERE subcataid = ?' , [id] , (err,menu) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!menu || menu.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'No Data' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(menu)
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

    menuDay : (req,res) => {
        connectDB.query('SELECT DISTINCT cataid,cataname,cataimage FROM daymenu' , (err,menu) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!menu || menu.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'No Data' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(menu)
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
    
    menuDayCategorie : (req,res) => {
        var id = req.params.cataid
        connectDB.query('SELECT * FROM daymenu WHERE cataid = ?' , [id] , (err,meals) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!meals || meals.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'No Data' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(meals)
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

    mealExtras : (req,res) => {
        var id = req.params.mealid
        connectDB.query('SELECT * FROM extras WHERE mealid = ?' , [id] , (err,extras) => {
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
                var object = {
                    status : 200 ,
                    message : 'No Data' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(extras)
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

    addToFavourites : (req,res) => {
        var mealid = req.body.mealid,
            userid = req.body.userid

        connectDB.query('SELECT * FROM favourites WHERE userid = ? AND mealid = ?' , [userid,mealid] , (err,fav) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!fav || fav.length == 0) {
                connectDB.query('SELECT * FROM menu WHERE mealid = ?' , [mealid] , (err,meals) => {
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
                        var meal = {
                            userid : userid,
                            mealid : meals[0].mealid,
                            restaurantid : meals[0].restaurantid,
                            cataid : meals[0].cataid,
                            subcataid : meals[0].subcataid,
                            mealname : meals[0].mealname,
                            mealprice : meals[0].mealprice,
                            mealdescription : meals[0].mealdescription,
                            mealimage : meals[0].mealimage,
                            mealpoints : meals[0].mealpoints,
                            mealtime : meals[0].mealtime
                        }
                        connectDB.query('INSERT INTO favourites SET ?' , [meal] , (err,result) => {
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
                                    message : 'تم اضافة الوجبة الى المفضلة' ,
                                    errors : [] ,
                                    data : []
                                }
                                res.send(object)
                            }
                        })
                    }
                })
            }
            else {
                var object = {
                    status : 200 ,
                    message : 'تم اضافتها للمفضلة من قبل' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
        })
    },

    showFavourites : (req,res) => {
        var id = req.params.userid

        connectDB.query('SELECT * FROM favourites WHERE userid = ?' , [id] , (err,favourites) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!favourites || favourites.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'لا توجد وجبات مفضلة' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(favourites)
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

    deleteFavourite : (req,res) => {
        var id = req.params.mealid

        connectDB.query('DELETE FROM favourites WHERE mealid = ?' , [id] , (err,result) => {
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
                    message : 'تم حذف الوجبة من المفضلة' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
        })
    },

    searchMeal : (req,res) => {
        var name = `%${req.params.name}%`
        
        connectDB.query('SELECT * FROM menu WHERE mealname LIKE ?' , [name] , (err,meals) => {
            if(err) {
                var object = {
                    status : 400 ,
                    message : `${err}` ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else if(!meals || meals.length == 0) {
                var object = {
                    status : 200 ,
                    message : 'لا توجد وجبات ' ,
                    errors : [] ,
                    data : []
                }
                res.send(object)
            }
            else {
                var json = JSON.stringify(meals)
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