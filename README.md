# Store Donut

## Overview | Description

This project is a sample of creating a Restful Web API that supports an online storefront to showcase its great product ideas.

## Table of Contents

- [Technicals](#technicals)
- [Prerequisite](#prerequisite)
- [Instructions](#instructions)
- [API Reference](#api-reference)
- [Scripts](#scripts)
- [Run Locally](#run-locally)
- [Running Tests](#running-tests)
- [Author](#author)


## Technicals:

1. Node and Express Environment
2. Postgres for the database
3. dotenv from npm for managing environment variables
4. db-migrate from npm for migrations
5. jsonwebtoken from npm for working with JWTs
6. jasmine from npm for testing
7. supertest from npm for testing
8. Simple-node-logger package
9. typescript
10. cors
12. body-parser
13. bcrypt
14. nodemon
15. ts-node
16. ES6

## Prerequisite

This application uses PostgreSQL database, so as prerequisite you need to set up PostgreSQL database server as per requirments shared below:

1. install and configure PostgreSQL database server on your machine
2. in order to use PostgreSQL you will need a user/password as well as a database. First use the  following to become the **postgres** user, then create a user on PostgreSQL with your user name through PSQL terminal
    ```sh
    psql postgres postgres
    ```    
3. create a database user and set its password
    ```sh
    postgres=# CREATE USER donut_user WITH PASSWORD 'PASSWORD';
    ```
4. create two databases while logged in as **postgres** user
    ```sh
    postgres=# CREATE DATABASE donut_prod;
    postgres=# CREATE DATABASE donut_test;
    ```
5. Grant all database privileges to the created user in both databases
    ```sh
    postgres=# GRANT ALL PRIVILEGES ON DATABASE donut_prod TO donut_user;
    postgres=# GRANT ALL PRIVILEGES ON DATABASE donut_test TO donut_user;
    ```
6. test the database connection using these new credentials

## Instructions

1. install packages by running this command `npm install` or `yarn`.
2. add a .env file in the root directory and set the missing ### environment parameters
    ```bash
    ENV=prod
    PORT=3000
    URL=http://localhost
    DB_DRIVER=pg
    HOST_DEV=127.0.0.1
    DB_DEV=donut_dev
    USER_DEV=donut_user
    PASSWORD_DEV=PASSWORD
    HOST_TEST=127.0.0.1
    DB_TEST=donut_test
    USER_TEST=donut_user
    PASSWORD_TEST=PASSWORD
    HOST_PROD=127.0.0.1
    DB_PROD=donut_prod
    USER_PROD=donut_user
    PASSWORD_PROD=PASSWORD
    BCRYPT_PASSWORD=PASSWORD
    SALT_ROUNDS=10
    TOKEN_SECRET=SECRET
    ```
3. build the app by running `npm run build`.
4. batabase and backend are running on **port 3000** .
5. run this command to setup the database `db-migrate up -e prod`.
6. you can choose your preferred Port by changing its value in the .env file
7. run this command `npm run start` to start the app and get access via http://127.0.0.1:3000

## API Reference

### 1. View Categories

- **Endpoint Name** - `index`      <br>
- **Method** - `GET`               <br>
- **URL Pattern** - `/categories`            <br>
- **Usage**
    - Open BASE_URL/categories in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/categories
    ```
- **Expected Response** - JSON containing all categories in the database <br>

### 2. View Single Category

- **Endpoint Name** - `show`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/categories/{id}`  <br>
- **Usage**
    - Open BASE_URL/categories/{id} in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/categories/{id}
    ```
- **Expected Response** - Category with the {id} in database

### 3. Add Category

- **Endpoint Name** - `create` <br>
- **Method** - `POST`              <br>
- **URL Pattern** - `/categories`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X POST \
    -d '{ "id": 0, 
        "name": "Mobiles"
        }' \
    BASE_URL/categories
    ```
- **Expected Response** - Addition successful without any error message and returning the added category. 

### 4. Update Category

- **Endpoint Name** - `update` <br>
- **Method** - `PUT`                  <br>
- **URL Pattern** - `/categories/{id}`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X PUT \
    -d '{ "id": 1, 
        "name": "Computers",
        }' \
    BASE_URL/categories/{id}
    ```
- **Expected Response** - Update successful without any error message and return the updated category. <br>

### 5. Delete Category

- **Endpoint Name** - `destroy` <br>
- **Method** - `DELETE` <br>
- **URL Pattern** - `/categories/{id}` <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X DELETE \
    BASE_URL/categories/{id}
    ```
- **Expected Response** - Deletion successful without any error message and returning the deleted category. <br>

### 6. View Statuses

- **Endpoint Name** - `index`      <br>
- **Method** - `GET`               <br>
- **URL Pattern** - `/statuses`            <br>
- **Usage**
    - Open BASE_URL/statuses in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/statuses
    ```
- **Expected Response** - JSON containing all statuses in the database <br>

### 7. View Single Status

- **Endpoint Name** - `show`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/statuses/{id}`  <br>
- **Usage**
    - Open BASE_URL/statuses/{id} in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/statuses/{id}
    ```
- **Expected Response** - Status with the {id} in database

### 8. Add Status

- **Endpoint Name** - `create` <br>
- **Method** - `POST`              <br>
- **URL Pattern** - `/statuses`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X POST \
    -d '{ "id": 0, 
        "name": "complete",
        }' \
    BASE_URL/statuses
    ```
- **Expected Response** - Addition successful without any error message and returning the added status. 
- **NOTE** - You have to add 'active' and 'complete'

### 9. Update Status

- **Endpoint Name** - `update` <br>
- **Method** - `PUT`                  <br>
- **URL Pattern** - `/statuses/{id}`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X PUT \
    -d '{ "id": 1, 
        "name": "active",
        }' \
    BASE_URL/statuses/{id}
    ```
- **Expected Response** - Update successful without any error message and return the updated status. <br>

### 10. Delete Status

- **Endpoint Name** - `destroy` <br>
- **Method** - `DELETE` <br>
- **URL Pattern** - `/statuses/{id}` <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X DELETE \
    BASE_URL/statuses/{id}
    ```
- **Expected Response** - Deletion successful without any error message and returning the deleted status. <br>

### 11. View Users

- **Endpoint Name** - `index`      <br>
- **Method** - `GET`               <br>
- **URL Pattern** - `/users`            <br>
- **Usage**
    - Open BASE_URL/users in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/users
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    ```
- **Expected Response** - JSON containing all users in the database <br>

### 12. View Single User

- **Endpoint Name** - `show`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/users/{id}`  <br>
- **Usage**
    - Open BASE_URL/users/{id} in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/users/{id}
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    ```
- **Expected Response** - User with the {id} in database

### 13. Add User

- **Endpoint Name** - `create` <br>
- **Method** - `POST`              <br>
- **URL Pattern** - `/users`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X POST \
    -d '{ "id": 0, 
        "first_name": "Murad",
        "last_name": "Zyad",
        "user_name": "mrd",
        "password": "456"
        }' \
    BASE_URL/users
    ```
- **Expected Response** - Addition successful without any error message and returning the token. 

### 14. Update User

- **Endpoint Name** - `update` <br>
- **Method** - `PUT`                  <br>
- **URL Pattern** - `/users/{id}`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X PUT \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "id": 1, 
        "first_name": "Gamal",
        "last_name": "Sad",
        "user_name": "gmy",
        "password": "123"
        }' \
    BASE_URL/users/{id}
    ```
- **Expected Response** - Update successful without any error message and return the token.

### 15. Authenticate User

- **Endpoint Name** - `authenticate` <br>
- **Method** - `POST`              <br>
- **URL Pattern** - `/users/authenticate`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X POST \
    -d '{ "user_name": "mrd", 
        "password": "456"
        }' \
    BASE_URL/users/authenticate
    ```
- **Expected Response** - Logging successful without any error message and returning the user logged in. 

### 16. Delete User

- **Endpoint Name** - `destroy` <br>
- **Method** - `DELETE` <br>
- **URL Pattern** - `/users/{id}` <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X DELETE \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    BASE_URL/users/{id}
    ```
- **Expected Response** - Deletion successful without any error message and returning the deleted user. <br>

### 17. View Products

- **Endpoint Name** - `index`      <br>
- **Method** - `GET`               <br>
- **URL Pattern** - `/products`            <br>
- **Usage**
    - Open BASE_URL/products in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/products
    ```
- **Expected Response** - JSON containing all products in the database <br>

### 18. View Single Product

- **Endpoint Name** - `show`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/products/{id}`  <br>
- **Usage**
    - Open BASE_URL/products/{id} in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/products/{id}
    ```
- **Expected Response** - Product with the {id} in database

### 19. Add Product

- **Endpoint Name** - `create` <br>
- **Method** - `POST`              <br>
- **URL Pattern** - `/products`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X POST \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "id": 0, 
        "name": "NOKIA 50",
        "price": 2100,
        "category_id": 1
        }' \
    BASE_URL/products
    ```
- **Expected Response** - Addition successful without any error message and returning the added product. 

### 20. Update Product

- **Endpoint Name** - `update` <br>
- **Method** - `PUT`                  <br>
- **URL Pattern** - `/products/{id}`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X PUT \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "id": 1, 
        "name": "OPPO XI-3200",
        "price": 7500,
        "category_id": 1
        }' \
    BASE_URL/products/{id}
    ```
- **Expected Response** - Update successful without any error message and return the updated product. <br>

### 21. Delete Product

- **Endpoint Name** - `destroy` <br>
- **Method** - `DELETE` <br>
- **URL Pattern** - `/products/{id}` <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X DELETE \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    BASE_URL/products/{id}
    ```
- **Expected Response** - Deletion successful without any error message and returning the deleted product. <br>

### 22. View Orders

- **Endpoint Name** - `index`      <br>
- **Method** - `GET`               <br>
- **URL Pattern** - `/orders`            <br>
- **Usage**
    - Open BASE_URL/orders in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/orders
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    ```
- **Expected Response** - JSON containing all orders in the database <br>

### 23. View Single Order

- **Endpoint Name** - `show`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/orders/{id}`  <br>
- **Usage**
    - Open BASE_URL/orders/{id} in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/orders/{id}
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    ```
- **Expected Response** - Order with the {id} in database

### 24. Add Order

- **Endpoint Name** - `create` <br>
- **Method** - `POST`              <br>
- **URL Pattern** - `/orders`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X POST \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "id": 0, 
        "status_id": 1,
        "user_id": 1
        }' \
    BASE_URL/orders
    ```
- **Expected Response** - Addition successful without any error message and returning the added order. 

### 25. Update Order

- **Endpoint Name** - `update` <br>
- **Method** - `PUT`                  <br>
- **URL Pattern** - `/orders/{id}`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X PUT \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "id": 1, 
        "status_id": 2,
        "user_id": 1
        }' \
    BASE_URL/orders/{id}
    ```
- **Expected Response** - Update successful without any error message and return the updated order. <br>

### 26. Delete Order

- **Endpoint Name** - `destroy` <br>
- **Method** - `DELETE` <br>
- **URL Pattern** - `/orders/{id}` <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X DELETE \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    BASE_URL/orders/{id}
    ```
- **Expected Response** - Deletion successful without any error message and returning the deleted order. <br>

### 27. Add products to the current order

- **Endpoint Name** - `addProduct` <br>
- **Method** - `POST`                  <br>
- **URL Pattern** - `/orders/{id}/products`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X PUT \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "quantity": 15, 
        "productId": 1
        }' \
    BASE_URL/orders/{id}/products
    ```
- **Expected Response** - Addition successful without any error message and returning the added product. <br>

### 28. Display the products of the selected order belonging to the selected user

- **Endpoint Name** - `showProducts`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/users/{userID}/orders/{orderID}/products`  <br>
- **Usage**
    - Open BASE_URL/users/{userID}/orders/{orderID}/products in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/users/{userID}/orders/{orderID}/products
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    ```
- **Expected Response** - Products of the order with the {orderID} in database

### 29. Display top 5 most popular products

- **Endpoint Name** - `getTop5Products`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/products-top-5`  <br>
- **Usage**
    - Open BASE_URL/products-top-5 in browser
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/products-top-5
    ```
- **Expected Response** - List of the 5 top most popular products in the database

### 30. Display Products by category

- **Endpoint Name** - `getProductsByCat`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/products-by-cat`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/products-by-cat
    -d '{ "category": "Mobiles" }' \
    ```
- **Expected Response** - List of products that belong to the selected category in the database

### 31. Display active order by user

- **Endpoint Name** - `getActOrderByUsr`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/active-order`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/active-order
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "user_id": 1 }' \
    ```
- **Expected Response** - Current Order by user in the database

### 32. Display complete orders by user

- **Endpoint Name** - `getCmpOrdersByUsr`    <br>
- **Method** - `GET`                  <br>
- **URL Pattern** - `/complete-orders`  <br>
- **Usage** - CURL OR POSTMAN ONLY
    - **Terminal/CURL**
    ```sh
    curl -X GET BASE_URL/complete-orders
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -d '{ "user_id": 1 }' \
    ```
- **Expected Response** - Complete Orders by user in the database

## Scripts

Run prettier

```bash
  npm run prettier
```

Run eslint

```bash
  npm run lint
```

Build the project

```bash
  npm run build
```

Run the application

```bash
  npm run start
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Mahmoud-Elgharably/Store-Donut.git
```

Go to the project directory

```bash
  cd Store-Donut
```

Install dependencies - (then follow the above [Instructions](#instructions))

```bash
  npm install
```

Run the application

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Author

[Mahmoud Elgharably](https://twitter.com/Mahmoud62651196)
