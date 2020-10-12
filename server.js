const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {sequelize, Restaurant, Menu, Item, Booking} = require('./models')
const { request, response } = require('express')
const { partials } = require('handlebars')
const app = express()
var restaurantsArray = []

updateRestaurants =  async function () {
    restaurantsArray = await Restaurant.findAll()
}



const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { 
        giveMeRestaurants() {
            //allows restaurants to accessed in templates 
            return (restaurantsArray)
        }
    },
    partialsDir: __dirname + '/views/partials/'
})


app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//finds intial number of restaurants 

updateRestaurants()

//checks server is running 

app.listen(3000, async () => {
    await sequelize.sync()
    console.log('web server running on port 3000')
})

//loads home page

app.get('/home', (request, response) => {
    response.render('home')
})

//loads restaurants page

app.get('/restaurants', async (request, response) => {
    const restaurants = await Restaurant.findAll()
    response.render('restaurants', {restaurants})
})

//loads admin login page

app.get('/admin', (request, response) => {
    response.render('admin')
})

//logs admin in 

app.post('/admin_login', (request,response) => {
    if (request.body.password === "100gecs") {
        response.redirect('/admin_restaurants')
    }
    else {
        response.redirect('/admin')
    }
})

//loads admin restaurants page 

app.get('/admin_restaurants', async (request, response) => {
    const restaurants = await Restaurant.findAll()
    response.render('admin_restaurants', {restaurants})
})

//loads add restaurant page 

app.get('/admin_restaurants_add', (request, response) => {
    response.render('admin_restaurants_add')
})

//creates new restaurant

app.post('/admin_restaurants_add', async (request, response) => {
    await Restaurant.create(request.body)
    updateRestaurants()
    response.redirect('/admin_restaurants')
})

//loads specific restaurant page 

app.get('/restaurant/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    const rating = restaurant.ratingsTotal/restaurant.ratingsNo
    var stars = ""

    for (x= 0; x< rating; x++) {
        stars = stars + "★"
    }
    response.render('restaurant', {restaurant, menus, stars})
})

//loads specific restaurant admin page

app.get('/admin_restaurant/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const menus = await restaurant.getMenus({
        include: [{model: Item, as: 'items'}],
        nest: true
    })
    response.render('admin_restaurant', {restaurant, menus})
})

//loads specific restauarant edit page 

app.get('/admin_restaurant_edit/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    response.render('admin_restaurant_edit', {restaurant})
})

//updates specific restaurant 

app.post('/admin_restaurant_edit/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    await restaurant.update(request.body)
    updateRestaurants()
    response.redirect(`/admin_restaurant/${restaurant.id}`)
})

//deletes specific restaurant 

app.get('/admin_restaurant_delete/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    await restaurant.destroy()
    updateRestaurants()
    response.redirect('/admin_restaurants')  
})

//loads add menu to specific restaurant page 

app.get('/admin_restaurant_add_menu/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    response.render('admin_restaurant_add_menu', {restaurant})
})

//creates new menu

app.post('/admin_restaurants_add_menu/:id', async (request, response) => {
    menu = await Menu.create(request.body)
    response.redirect(`/admin_restaurant/${menu.RestaurantId}`)
})

//loads edit specific menu page 

app.get('/admin_menu_edit/:id', async (request, response) => {
    const menu = await Menu.findByPk(request.params.id)
    const items = await menu.getItems()
    response.render('admin_menu_edit', {menu, items})
})

//updates specific menu 

app.post('/admin_menu_edit/:id', async (request, response) => {
    const menu = await Menu.findByPk(request.params.id)
    console.log(menu)
    await menu.update(request.body) 
    response.redirect(`/admin_menu_edit/${menu.id}`)  
})

//adds specific menu item 

app.post('/admin_menu_item_add/:id', async (request, response) => {
    const menu = await Menu.findByPk(request.params.id)
    const item = await Item.create(request.body)
    await menu.addItem(item)
    response.redirect(`/admin_menu_edit/${menu.id}`)  
})

//deletes specific menu item 

app.post('/admin_menu_item_delete/:id', async (request, response) => {
    const item = await Item.findByPk(request.params.id)
    const redirect = item.MenuId
    await item.destroy()
    response.redirect(`/admin_menu_edit/${redirect}`)  
})

//deletes specific menu 

app.get('/admin_menu_delete/:id', async (request, response) => {
    const menu = await Menu.findByPk(request.params.id)
    const redirect = menu.RestaurantId
    await menu.destroy()
    response.redirect(`/admin_restaurant/${redirect}`)  
})

//loads book page 

app.get('/book', async (request, response) => {
    const restaurants = await Restaurant.findAll()
    response.render('book', {restaurants})
})

//loads book specific restaurant page 

app.get('/restaurant_book/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    response.render('restaurant_book', {restaurant})
})

//creates booking 

app.post('/restaurant_add_booking/:id', async (request,response) => {
    const booking = await Booking.create(request.body)
    response.redirect(`/restaurant/${request.params.id}`)
})

//loads rate specific restaurant page 

app.get('/restaurant_rate/:id', async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    response.render('restaurant_rate', {restaurant})  
})

//updates specific restaurant rating

app.post("/restaurant_rate/:id", async (request, response) => {
    const restaurant = await Restaurant.findByPk(request.params.id)
    const newRatingsNo = restaurant.ratingsNo + 1
    const newRatingsTotal = restaurant.ratingsTotal + parseInt(request.body.rating) 

    await restaurant.update(
        {ratingsNo: newRatingsNo}
    )

    await restaurant.update(
        {ratingsTotal: newRatingsTotal}
    )
    
    response.redirect(`/restaurant/${request.params.id}`)
})