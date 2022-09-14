CREATE TABLE products (
    id SERIAL PRIMARY KEY,    
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    category_id BIGINT NOT NULL REFERENCES categories(id)
);