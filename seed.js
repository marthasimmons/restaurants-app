const {sequelize, Restaurant, Menu, Item}  = require('./models')

//data to be seeded 

const restaurants =[
    {
        "name": "Down The Hatch",
        "description": "Vegan burgers",
        "image": "https://images.squarespace-cdn.com/content/v1/5bd4b119ab1a620a8d023950/1553530529608-RK37KZ5G0UJ4Z36N04BT/ke17ZwdGBToddI8pDm48kLUX65yUSD0JXK2KssNH7nIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcoDuhWbWrrB_ziMz6nHAFmE2re1TNHD5kJuc1F48Z_3BAi_Qe-klGgIEfIe1drRXb/WhatsApp%2BImage%2B2019-03-25%2Bat%2B16.12.27.jpg?format=1500w",
        "image_crop": "center"
    },
    
    {
        "name": "Mowgli",
        "description": "Indian street food",
        "image": "https://i2-prod.liverpoolecho.co.uk/incoming/article17792234.ece/ALTERNATES/s1200b/1_The-new-Mowgli-Restaurant-on-Water-StreetLiverpool.jpg",
        "image_crop": "bottom"
    },

    {
        "name": "Bakchich",
        "description": "Lebanese street food",
        "image": "https://www.lilykitten.com/wp-content/uploads/2015/09/IMG_8285.jpg",
        "image_crop": "bottom"
    },

    {
        "name": "Rosa's",
        "description": "Thai cafe",
        "image": "https://www.rosasthaicafe.com/wp-content/uploads/2019/01/Rosas-Liverpool-Albert-Dock-Exterior-520px-feature.jpg",
        "image_crop": "bottom"
    },

    {
        "name": "Crust",
        "description": "Pizza restaurant",
        "image": "https://pbs.twimg.com/media/EEHoiPvUEAEKPAc.jpg",
        "image_crop": "center"
    },

    {
        "name": "Egg",
        "description": "Vegetarian cafe",
        "image": "https://www.theeggcafe.co.uk/wp-content/uploads/2019/12/20190808-DSC_1864-small.jpg",
        "image_crop": "center"
    },

    {
        "name": "McDonald's",
        "description": "Fast food",
        "image": "https://i2-prod.liverpoolecho.co.uk/incoming/article13434960.ece/ALTERNATES/s1200b/McDonalds-Restaurant-in-Lord-Street-Liverpool.jpg",
        "image_crop": "top"
    },


    {
        "name": "Taco Bell",
        "description": "Fast food",
        "image": "https://i2-prod.liverpoolecho.co.uk/whats-on/food-drink-news/article14470592.ece/ALTERNATES/s1200b/JS147578433.jpg",
        "image_crop": "center"
    }

]

const menus = [
    {
        "name": "Burgers",
        "restaurant_id": 1
    },

    {
        "name": "Sides",
        "restaurant_id": 1
    },

    {
        "name": "Drinks",
        "restaurant_id": 1
    },

    {
        "name": "Desserts",
        "restaurant_id": 1
    },

    {
        "name": "Curries",
        "restaurant_id": 2
    },

    {
        "name": "Carbs",
        "restaurant_id": 2
    },

    {
        "name": "Drinks",
        "restaurant_id": 2
    },

    {
        "name": "Desserts",
        "restaurant_id": 2
    },
    
    {
        "name": "Breakfast",
        "restaurant_id": 3
    },

    {
        "name": "Mezze",
        "restaurant_id": 3
    },

    {
        "name": "Drinks",
        "restaurant_id": 3
    },

    {
        "name": "Starters",
        "restaurant_id": 4
    },

    {
        "name": "Mains",
        "restaurant_id": 4
    },

    {
        "name": "Kids",
        "restaurant_id": 4
    },

    {
        "name": "Veggie",
        "restaurant_id": 4
    },

    {
        "name": "Drinks",
        "restaurant_id": 4
    },

    {
        "name": "Pizza",
        "restaurant_id": 5
    },

    {
        "name": "Not Pizza",
        "restaurant_id": 5
    },
    
    {
        "name": "Drinks",
        "restaurant_id": 5
    },

    {
        "name": "Specials",
        "restaurant_id": 6
    },

    {
        "name": "Regulars",
        "restaurant_id": 6
    },
    
    {
        "name": "Drinks",
        "restaurant_id": 6
    },

    {
        "name": "Food",
        "restaurant_id": 7
    },

    {
        "name": "Driks",
        "restaurant_id": 7
    },

    {
        "name": "Food",
        "restaurant_id": 8
    },

    {
        "name": "Drinks",
        "restaurant_id": 8
    }

]

items = [
    {
        "name": "Classic Burger",
        "price": 8.50,
        "menu_id": 1
    },

    {
        "name": "French Fries",
        "price": 2.60,
        "menu_id": 2
    },

    {
        "name": "Onion Rings",
        "price": 3.00,
        "menu_id": 2
    },

    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 3
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 3
    },

    {
        "name": "Cider",
        "price": 3.90,
        "menu_id": 3
    },

    {
        "name": "Red Wine ",
        "price": 4.10,
        "menu_id": 3
    },

    {
        "name": "White Wine",
        "price": 4.00,
        "menu_id": 3
    },

    {
        "name": "Ice Cream",
        "price": 3.50,
        "menu_id": 4
    },

    {
        "name": "Cheesecake",
        "price": 3.95,
        "menu_id": 4
    },
    
    {
        "name": "Chicken Curry",
        "price": 9.60,
        "menu_id": 5
    },

    {
        "name": "Lamb Curry",
        "price": 9.70,
        "menu_id": 5
    },

    {
        "name": "Veggie Curry",
        "price": 8.90,
        "menu_id": 5
    },
    
    {
        "name": "Rice",
        "price": 2.10,
        "menu_id": 6
    },

    {
        "name": "Plain Naan",
        "price": 2.30,
        "menu_id": 6
    },

    {
        "name": "Peshwari naan",
        "price": 2.50,
        "menu_id": 6
    },

    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 7
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 7
    },

    {
        "name": "Cider",
        "price": 3.90,
        "menu_id": 7
    },

    {
        "name": "Red Wine ",
        "price": 4.10,
        "menu_id": 7
    },

    {
        "name": "White Wine",
        "price": 4.00,
        "menu_id": 7
    },

    {
        "name": "Ice Cream",
        "price": 3.50,
        "menu_id": 8
    },

    {
        "name": "Cheesecake",
        "price": 3.95,
        "menu_id": 8
    },
    
    {
        "name": "Lebanese Breakfast",
        "price": 7.00,
        "menu_id": 9
    },

    {
        "name": "Veggie Lebanese Breakfast",
        "price": 7.00,
        "menu_id": 9
    },

    {
        "name": "Falafels",
        "price": 5.55,
        "menu_id": 10
    },
    
    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 11
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 11
    },

    {
        "name": "Cider",
        "price": 3.90,
        "menu_id": 11
    },

    {
        "name": "Red Wine ",
        "price": 4.10,
        "menu_id": 11
    },

    {
        "name": "White Wine",
        "price": 4.00,
        "menu_id": 11
    },

    {
        "name": "Spring Rolls",
        "price": 4.70,
        "menu_id": 12
    },

    {
        "name": "Chicken Satay",
        "price": 4.80,
        "menu_id": 12
    },

    {
        "name": "Pad Thai",
        "price": 8.90,
        "menu_id": 13
    },

    {
        "name": "Stir Fried Noodles",
        "price": 9.05,
        "menu_id": 13
    },

    {
        "name": "Stir Fried Noodles",
        "price": 6.10,
        "menu_id": 14
    },

    {
        "name": "Tofu Stir Fry",
        "price": 7.70,
        "menu_id": 15
    },

    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 16
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 16
    },

    {
        "name": "Cider",
        "price": 3.90,
        "menu_id": 16
    },

    {
        "name": "Red Wine ",
        "price": 4.10,
        "menu_id": 16
    },

    {
        "name": "White Wine",
        "price": 4.00,
        "menu_id": 16
    },

    {
        "name": "Margherita Pizza",
        "price": 9.10,
        "menu_id": 17
    },

    {
        "name": "Pepperoni Pizza",
        "price": 9.70,
        "menu_id": 17
    },

    {
        "name": "Spag Bol",
        "price": 9.30,
        "menu_id": 18
    },

    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 19
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 19
    },

    {
        "name": "Cider",
        "price": 3.90,
        "menu_id": 19
    },

    {
        "name": "Red Wine ",
        "price": 4.10,
        "menu_id": 19
    },

    {
        "name": "White Wine",
        "price": 4.00,
        "menu_id": 19
    },

    {
        "name": "Soup Of The Day",
        "price": 2.65,
        "menu_id": 20
    },

    {
        "name": "Bean Burger",
        "price": 5.35,
        "menu_id": 21
    },

    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 22
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 22
    },

    {
        "name": "Mozzarella Sticks",
        "price": 2.30,
        "menu_id": 23
    },

    {
        "name": "Apple Pie",
        "price": 2.90,
        "menu_id": 23
    },

    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 24
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 24
    },

    {
        "name": "Vanilla Milkshake",
        "price": 3.00,
        "menu_id": 24
    },

    {
        "name": "Banana Milkshake",
        "price": 3.00,
        "menu_id": 24
    },

    {
        "name": "Burrito",
        "price": 3.50,
        "menu_id": 25
    },

    {
        "name": "Nachos",
        "price": 4.20,
        "menu_id": 25
    },

    {
        "name": "Coke",
        "price": 1.60,
        "menu_id": 26
    },

    {
        "name": "Sprite",
        "price": 1.60,
        "menu_id": 26
    }

]

//seeding data 

sequelize.sync().then( () => {

    const seedRestaurants = restaurants.map(async (restaurant) => {
        const newRestaurant = await Restaurant.create({name: restaurant.name, image: restaurant.image, imageCrop: restaurant.image_crop, description: restaurant.description})
    })

    const seedMenus = menus.map(async (menu) => {
        const newMenu = await Menu.create({name: menu.name, RestaurantId: menu.restaurant_id})
    })

    const seedItems = items.map(async (item) => {
        const newItem = await Item.create({name: item.name,price: item.price,MenuId: item.menu_id})
    })


})