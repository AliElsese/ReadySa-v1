const express = require('express');
const route = express.Router();
const connectDB = require('../database/connection');
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , './server/uploads')
    },

    filename : (req , file , cb) => {
        cb(null , file.originalname)
    }
})
const upload = multer({ storage : storage })

// MiddleWare
const { verify , check , verifyAdmin } = require('./middleware')

// Services
const mainRender = require('../services/main-render')
const profileRender = require('../services/profile-render')
const cartRender = require('../services/cart-render')
const dashboardRender = require('../services/dashboard-render')

// Controllers
const restaurantController = require('../controllers/restaurant-controller')
const offerController = require('../controllers/offers-controller')
const messageController = require('../controllers/messages-controller')
const userController = require('../controllers/user-controller')
const orderController = require('../controllers/orders-controller')
const dashboardController = require('../controllers/dashboard-controller')
const restAppController = require('../controllers/RestApp-controller')

// Dashboadr Render
route.get('/login-admin' , dashboardRender.showLoginAdminPage)
route.post('/api-loginAdmin' , dashboardRender.loginAdminAccount)
route.get('/dashboard' , verifyAdmin , dashboardRender.showDashboardPage)
route.get('/dashboard-admins' , verifyAdmin , dashboardRender.showDashboardAdminsPage)
route.get('/add-admin' , verifyAdmin , dashboardRender.showAddAdminPage)
route.get('/update-admin/:adminid' , verifyAdmin , dashboardRender.showUpdateAdminPage)
route.get('/dashboard-restaurantsAccounts' , verifyAdmin , dashboardRender.showDashboardRestaurantsPage)
route.get('/add-restaurant' , verifyAdmin , dashboardRender.showAddRestaurantPage)
route.get('/update-restaurant/:restaurantid' , verifyAdmin , dashboardRender.showUpdateRestaurantPage)
route.get('/dashboard-messages' , verifyAdmin , dashboardRender.showMessagesPage)
route.get('/single-message/:id' , verifyAdmin , dashboardRender.showSingleMessage)
route.get('/dashboard-dayMenu' , verifyAdmin , dashboardRender.showDayMenuPage)
route.get('/add-meal' , verifyAdmin , dashboardRender.showAddMealPage)
route.get('/dashboard-restaurants' , verifyAdmin , dashboardRender.showRestaurantsPage)
route.get('/dashboard-restaurantsDetails' , verifyAdmin , dashboardRender.showRestaurantsDetPage)
route.get('/dashboard-restaurantsDetails/:restaurantid' , verifyAdmin , dashboardRender.showSingleRestaurantDetails)
route.get('/update-restaurantDetails/:restaurantid' , verifyAdmin , dashboardRender.showUpdateSingleRestaurantDetails)
route.get('/dashboard-restaurantsMenus' , verifyAdmin , dashboardRender.showRestaurantsMenPage)
route.get('/dashboard-restaurantsMenus/:restaurantid' , verifyAdmin , dashboardRender.showSingleRestaurantMenus)
route.get('/add-mealRestaurant/:restaurantid' , verifyAdmin , dashboardRender.showAddMealRestaurant)
route.get('/update-mealRestaurant/:mealid' , verifyAdmin , dashboardRender.showUpdateMealRestaurant)
route.get('/dashboard-restaurantsCategories' , verifyAdmin , dashboardRender.showRestaurantsCatPage)
route.get('/dashboard-restaurantsCategories/:restaurantid' , verifyAdmin , dashboardRender.showSingleRestaurantCategories)
route.get('/add-categorie/:restaurantid' , verifyAdmin , dashboardRender.showAddCategorie)
route.get('/update-categorie/:cataid' , verifyAdmin , dashboardRender.showUpdateCategorie)
route.get('/dashboard-statistics' , verifyAdmin , dashboardRender.showDashboardStatisticsPage)
route.get('/logout-admin' , verifyAdmin , dashboardRender.logoutAdmin)

// Dashboard API
route.post('/api-addAdmin' , dashboardController.addAdmin)
route.get('/api-deleteAdmin/:adminid' , dashboardController.deleteAdmin)
route.post('/api-addRestaurant' , dashboardController.addRestaurant)
route.get('/api-deleteRestaurant/:restaurantid' , dashboardController.deleteRestaurant)
route.post('/api-updateRestaurant' , dashboardController.updateRestaurant)
route.get('/api-deleteMessage/:messageid' , dashboardController.deleteMessage)
route.post('/api-addMeal' , dashboardController.addMeal)
route.get('/api-deleteMeal/:mealid' , dashboardController.deleteMeal)
route.post('/api-updateRestaurantDetails' , upload.single('restaurantimage') , dashboardController.updateRestaurantDetails)
route.post('/api-addCategorie' , upload.single('cataimage') , dashboardController.addCategorie)
route.post('/api-updateCategorie' , upload.single('cataimage') , dashboardController.updateCategorie)
route.get('/api-deleteCategorie/:restaurantid/:cataid' , dashboardController.deleteCategorie)
route.post('/api-addMealRestaurant' , upload.single('mealimage') , dashboardController.addMealRestaurant)
route.post('/api-updateMealRestaurant' , upload.single('mealimage') , dashboardController.updateMealRestaurant)
route.get('/api-deleteMealRestaurant/:restaurantid/:mealid' , dashboardController.deleteMealRestaurant)


// Api Restaurants
route.get('/api-restaurants' , restaurantController.allRestaurants)
route.get('/api-restaurantBranches/:restaurantid' , restaurantController.restaurantBranches)
route.get('/api-restaurantBranche/:restaurantid' , restaurantController.restaurantBranches1)
route.get('/api-restaurantCategories/:restaurantid' , restaurantController.restaurantCategories)
route.get('/api-restaurantSubcategories/:cataid' , restaurantController.restaurantSubCategories)
route.post('/api-restaurantMenu/:subcataid' , restaurantController.restaurantMenu)
route.get('/api-menuDay' , restaurantController.menuDay)
route.get('/api-menuDay/:cataid' , restaurantController.menuDayCategorie)
route.get('/api-meal/:mealid' , restaurantController.mealExtras)
route.post('/api-addToFavourites' , restaurantController.addToFavourites)
route.get('/api-showFavourites/:userid' , restaurantController.showFavourites)
route.get('/api-deleteFavourite/:mealid' , restaurantController.deleteFavourite)
route.get('/api-searchMeal/:name' , restaurantController.searchMeal)

// Api Offers
route.get('/api-offers' , offerController.allOffers)

// Api Messages
route.post('/api-sendMessage' , messageController.sendMessage)

// Api Users
route.post('/api-register' , userController.newUser)
route.post('/api-login' , userController.login)
route.post('/api-profile' , userController.profile)
route.post('/api-sendProposal' , userController.sendProposal)
route.get('/api-userRestaurants/:userid' , userController.showUserRestaurants)
route.post('/api-userOrders/:restaurantid' , userController.showUserOrders)
route.post('/api-userOrderItems/:ordernumber' , userController.showUserOrderItems)
route.post('/api-generateQRCode' , userController.generateQRCode)
route.post('/api-userOrdersDelivered/:restaurantid' , userController.showUserOrdersDelivered)
route.post('/api-orderDelivered' , userController.orderDelivered)
route.post('/api-addToLikes' , userController.addToLikes)
route.post('/api-removeFromLikes' , userController.removeFromLikes)
route.post('/api-showLikesList' , userController.showLikesList)
route.post('/api-sendRate' , userController.sendRate)

// Api Orders
route.post('/api-sendToCart' , upload.fields([{name : 'extras'}]) , orderController.sendCart)
route.get('/api-showCart/:userid' , orderController.showCart)
route.post('/api-showItems/:restaurantid' , orderController.showItems)
route.post('/api-sendOrder' , upload.fields([{name : 'meals'} , {name : 'extras'} , {name : 'orderimage'}]) , orderController.sendOrder)
route.get('/api-showOrders/:userid' , orderController.showOrders)
route.post('/api-showRestaurantOrders/:restaurantid' , orderController.showRestaurantOrders)
route.post('/api-showOrdersItems/:restaurantid/:ordernumber' , orderController.showOrdersItems)
route.post('/api-sendOffer' , orderController.sendOffer)
route.post('/api-reSendOrder' , orderController.reSendToCart)

// Api Social
route.get('/api-social' , (req,res) => {
    connectDB.query('SELECT * FROM social' , (err,social) => {
        if(err) {
            var object = {
                status : 400 ,
                message : `${err}` , 
                errors : [] ,
                data : []
            }
            res.send(object)
        }
        else if(!social || social.length == 0) {
            var object = {
                status : 200 ,
                message : 'No Data' ,
                errors : [] ,
                data : []
            }
            res.send(object)
        }
        else {
            var json = JSON.stringify(social)
                object = {
                    status : 200 ,
                    message : 'Success' ,
                    errors : [] ,
                    data : JSON.parse(json)
                }
            res.send(object)
        }
    })
})

// Api Restaurant Application
route.post('/api-loginRestaurant' , restAppController.login)
route.post('/api-restaurantCheck' , restAppController.restaurantCheck)
route.post('/api-restaurantOrders/:restaurantid' , restAppController.showRestaurantOrders)
route.post('/api-RestaurantOrdersItems/:restaurantid/:ordernumber' , restAppController.showOrdersItems)
route.post('/api-restaurantOrdersCompleted/:restaurantid' , restAppController.showRestaurantOrdersCompleted)
route.post('/api-restaurantAddOffer' , restAppController.restaurantAddOffer)
route.post('/api-restaurantAddCategorie' , upload.single('cataimage') , restAppController.restaurantAddCategorie)
route.post('/api-restaurantAddSubCategorie' , upload.single('subcataimage') , restAppController.restaurantAddSubCategorie)
route.get('/api-restaurantCategories/:restaurantid' , restAppController.restaurantCategories)
route.get('/api-restaurantSubCategories/:restaurantid/:cataid' , restAppController.restaurantSubCategories)
route.post('/api-restaurantAddMeal' , upload.single('mealimage') , restAppController.restaurantAddMeal)
route.get('/api-restaurantMeals/:restaurantid' , restAppController.restaurantMeals)
route.post('/api-restaurantAddEmployee' , restAppController.restaurantAddEmployee)
route.post('/api-restaurantAddDetails' , upload.single('restaurantimage') , restAppController.restaurantAddDetails)
route.post('/api-restaurantAddBranche' , restAppController.restaurantAddBranche)
// Api Statistics And Proposals
route.post('/api-restaurantAllStatistics/:restaurantid' , restAppController.restaurantAllStatistics)
route.post('/api-restaurantProposals/:restaurantid' , restAppController.restaurantProposals)
route.get('/api-solveProposal/:proposalid' , restAppController.deleteProposal)
// Api Employees Application
route.post('/api-loginEmployee' , restAppController.loginEmployee)
route.post('/api-confirmOrder' , restAppController.confirmOrder)
route.post('/api-employeeOrders' , restAppController.employeeOrders)
// Api Languages Codes
route.get('/api-languagesCode' , restAppController.languagesCode)

// Main Render
route.get('*' , check)
route.get('/' , mainRender.showHomePage)
route.get('/restaurants' , mainRender.showRestaurantsPage)
route.get('/restaurantCategories/:restaurantid' , mainRender.showRestaurantCategoriesPage)
route.get('/restaurantMenu/:restaurantid/:cataid' , mainRender.showRestaurantMenuPage)
route.get('/mealdescription/:mealid' , mainRender.showMealPage)
route.get('/day-menu' , mainRender.showDayMenuPage)
route.get('/day-menu/:cataid' , mainRender.showDayMenuCategoriesPage)
route.get('/contact-us' , mainRender.showContactPage)
route.get('/sign-up' , mainRender.showSignUpPage)
route.get('/login-user' , mainRender.showLoginUserPage)
route.get('/offers' , mainRender.showOffersPage)
route.get('/offerdescription/:offerid' , mainRender.showOfferPage)

// Profile Render
route.post('/api-registerUser' , profileRender.addNewAccount)
route.post('/api-loginUser' , profileRender.loginUserAccount)
route.get('/profile' , verify , profileRender.profilePage)
route.get('/ordersRestaurants' , verify , profileRender.ordersRestaurantsPage)
route.get('/ordersRestaurants/:restaurantid' , verify , profileRender.ordersItemsPage)
route.get('/logoutUser' , profileRender.logout)

// Cart Render
route.post('/add-to-cart' , check , upload.fields([{name : 'extras'}]) , cartRender.addToCart)
route.post('/add-to-orders' , check , cartRender.sendOrder)

module.exports = route