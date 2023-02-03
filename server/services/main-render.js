const connectDB = require("../database/connection")

module.exports = {
    showHomePage : (req,res) => {
        res.render('index')
    },

    showRestaurantsPage : (req,res) => {
        connectDB.query('SELECT * FROM restaurants' , (err,restaurants) => {
            if(err) res.send(err)
            res.render('restaurants' , {
                restaurants : restaurants
            })
        })
    },
    
    showRestaurantCategoriesPage : (req,res) => {
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
                res.render('restaurantCategories' , {
                    categories : categories
                })
            }
        })
    },

    showRestaurantMenuPage : (req,res) => {
        var id = req.params.restaurantid,
            cataid = req.params.cataid
        connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [id] , (err,restaurants) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM menu WHERE restaurantid = ? AND cataid = ?' , [id,cataid] , (err,menu) => {
                if(err) res.send(err)
                res.render('restaurantmenu' , {
                    menu : menu,
                    restaurantname : restaurants[0].restaurantname
                })
            })
        })
    },

    showMealPage : (req,res) => {
        var id = req.params.mealid
        connectDB.query('SELECT * FROM menu WHERE mealid = ?' , [id] , (err,menu) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM restaurants WHERE restaurantid = ?' , [menu[0].restaurantid] , (err,restaurant) => {
                if(err) res.send(err)
                connectDB.query('SELECT * FROM extras WHERE mealid = ?' , [id] , (err,extras) => {
                    if(err) res.send(err)
                    res.render('mealdescription' , {
                        menu : menu,
                        restaurantname : restaurant[0].restaurantname,
                        extras : extras
                    })
                })
            })
        })
    },

    showDayMenuPage : (req,res) => {
        connectDB.query('SELECT DISTINCT cataid,cataname,cataimage FROM daymenu' , (err,menu) => {
            if(err) res.send(err)
            res.render('daymenu' , {
                menu : menu
            })
        })
    },
    
    showDayMenuCategoriesPage : (req,res) => {
        var id = req.params.cataid
        connectDB.query('SELECT * FROM daymenu WHERE cataid = ?' , [id] , (err,menu) => {
            if(err) res.send(err)
            res.render('daymenu-categorie' , {
                menu : menu
            })
        })
    },

    showContactPage : (req,res) => {
        res.render('contactus')
    },

    showSignUpPage : (req,res) => {
        res.render('signup')
    },

    showLoginUserPage : (req,res) => {
        res.render('loginuser')
    },

    showOffersPage : (req,res) => {
        connectDB.query('SELECT * FROM offers' , (err,offers) => {
            if(err) res.send(err)
            res.render('offers' , {
                offers : offers
            })
        })
    },

    showOfferPage : (req,res) => {
        var id = req.params.offerid
        connectDB.query('SELECT * FROM offers WHERE offerid = ?' , [id] , (err,offer) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM extras WHERE mealid = ?' , [offer[0].mealid] , (err,extras) => {
                if(err) res.send(err)
                res.render('offerdescription' , {
                    offer : offer,
                    extras : extras
                })
            })
        })
    }
}