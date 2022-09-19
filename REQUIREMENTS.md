# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index **GET** BASE_URL/products
-   Show  **GET** BASE_URL/products/:id
-   Create **POST** BASE_URL/products [token required]
-   Update **PUT** BASE_URL/products/:id [token required]
-   Delete **DELETE** BASE_URL/products/:id [token required]
-   [OPTIONAL] Top 5 most popular products **GET** BASE_URL/products-top-5
-   [OPTIONAL] Products by category **GET** BASE_URL/products-by-cat (args: product category)

#### Users

-   Index **GET** BASE_URL/users [token required]
-   Show **GET** BASE_URL/users/:id [token required]
-   Create **POST** BASE_URL/users [return token]
-   Update **PUT** BASE_URL/users/:id [token required]
-   Delete **DELETE** BASE_URL/users/:id [token required]
-   Authenticate **POST** BASE_URL/users/authenticate (args: user_name, password)

#### Orders

-   Index **GET** BASE_URL/orders [token required]
-   Show **GET** BASE_URL/orders/:id [token required]
-   Create **POST** BASE_URL/orders [token required]
-   Update **PUT** BASE_URL/orders/:id [token required]
-   Delete **DELETE** BASE_URL/orders/:id [token required]
-   AddProduct **POST** BASE_URL/orders/:id/products (args: quantity, productId, orderId)
-   ShowProducts **GET** BASE_URL/users/:userID/orders/:orderID/products (args: userID, orderID)
-   Current Order by user **GET** BASE_URL/active-order (args: user_id)[token required]
-   [OPTIONAL] Completed Orders by user **GET** BASE_URL/complete-orders (args: user_id)[token required]

#### Categories

-   Index **GET** BASE_URL/categories
-   Show **GET** BASE_URL/categories/:id
-   Create **POST** BASE_URL/categories
-   Update **PUT** BASE_URL/categories/:id
-   Delete **DELETE** BASE_URL/categories/:id

#### Statuses

-   Index **GET** BASE_URL/statuses
-   Show **GET** BASE_URL/statuses/:id
-   Create **POST** BASE_URL/statuses
-   Update **PUT** BASE_URL/statuses/:id
-   Delete **DELETE** BASE_URL/statuses/:id

## Data Shapes

#### products

-   id [SERIAL PRIMARY KEY]
-   name [VARCHAR(50) NOT NULL]
-   price [INT NOT NULL]
-   category_id [BIGINT NOT NULL REFERENCES categories(id)]

#### users

-   id [SERIAL PRIMARY KEY]
-   first_name [VARCHAR(20) NOT NULL]
-   last_name [VARCHAR(20) NOT NULL]
-   user_name [VARCHAR(10) NOT NULL]
-   pwrd_digest [VARCHAR NOT NULL]

#### orders

-   id [SERIAL PRIMARY KEY]
-   status_id [BIGINT NOT NULL REFERENCES statuses(id)]
-   user_id [BIGINT NOT NULL REFERENCES users(id)]

### order_products

-   id [SERIAL PRIMARY KEY]
-   order_id [BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE]
-   product_id [BIGINT NOT NULL REFERENCES orders(id)]
-   quantity [INT NOT NULL]

#### categories

-   id [SERIAL PRIMARY KEY]
-   name [VARCHAR(50) NOT NULL]

#### statuses

-   id [SERIAL PRIMARY KEY]
-   name [VARCHAR(50) NOT NULL]

**NOTE** - You have to add 'active' and 'complete'

