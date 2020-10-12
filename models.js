const {Sequelize, Model, DataTypes} = require('sequelize')
const path = require('path')
const sequelize = new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})

//creating database tables 

class Restaurant extends Model {}
class Menu extends Model {}
class Item extends Model {}
class Booking extends Model {}

Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    imageCrop: DataTypes.STRING,
    description: DataTypes.STRING,
    ratingsTotal: {type: DataTypes.INTEGER, defaultValue: 5},
    ratingsNo: {type: DataTypes.INTEGER, defaultValue: 1}
}, {sequelize})

Menu.init({
    name: DataTypes.STRING
}, {sequelize})

Item.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
}, {sequelize})


Booking.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE
}, {sequelize})

//defining relationships between tables 

Restaurant.hasMany(Menu, {as: 'menus'})
Menu.belongsTo(Restaurant)

Menu.hasMany(Item, {as: 'items'})
Item.belongsTo(Menu)

Restaurant.hasMany(Booking, {as: "bookings"})
Booking.belongsTo(Restaurant)

module.exports = {
    sequelize,
    Restaurant,
    Menu,
    Item,
    Booking,
}