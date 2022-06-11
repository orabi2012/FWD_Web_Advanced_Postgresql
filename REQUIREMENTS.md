# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
Get : /products

- Show (args : product id )
Get : /product/:id

- Create [token required]
POST : /product/create

- [OPTIONAL] Products by category (args: product category)
GET : /products/:category/category


#### Users
- Index [token required]
GET : users

- Show [token required] (args : user id )
GET : /user/:id

- Create User
POST : /user/create 

- Authinication
POST : /user/login

#### Orders
- Current Order by user (userid will extracted from token)[token required]
GET : /order/active

- index [token required]
GET /orders

- Create Order [token required]
POST : order/create

- Completed Orders by user (userid will extracted from token)[token required]
GET : /order/complete

- Create Order [token required]
POST : /order/create

- Show Odred By User (args : user id ) 
GET : /user_orders/:user_id

- add_order_detail (args : order_Id ) [token required]
POST : /order/:order_id/product

## Data Shapes

#### Product
    id  SERIAL PRIMARY KEY 
    name VARCHAR(100)  NOT NULL UNIQUE 
    price integer NOT NULL 
    category VARCHAR(50)  NOT NULL 
#### Users
    id  SERIAL PRIMARY KEY
    username VARCHAR(50)  NOT NULL UNIQUE
    firstName VARCHAR(50)  NOT NULL
    lastName VARCHAR(50)  NOT NULL
    pwd VARCHAR(100)  NOT NULL

#### Orders
    id  SERIAL PRIMARY KEY
    user_id integer REFERENCES Users(id) NOT NULL
    order_status VARCHAR(10)  NOT NULL

#### Order_details
    id  SERIAL PRIMARY KEY
    order_id  integer REFERENCES Orders(id) NOT NULL
    product_id integer REFERENCES Product(id) NOT NULL
    quantity integer NOT NULL


