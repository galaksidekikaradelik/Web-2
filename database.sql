-- CREATE DATABASE ecommerce_db;
USE ecommerce_db;



-- CREATE TABLE categories (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

ALTER TABLE products
ADD image_url VARCHAR(255);


-- INSERT INTO categories (name)
-- VALUES ('Phones'), ('Laptops'), ('Tablets');

INSERT INTO products
(name, price, category_id, image_url)
VALUES
('iPhone 14', 1800, 1, 'iphone14.png'),
('Samsung Galaxy S23', 1500, 1, 's23.png'),
('Lenovo ThinkPad', 2200, 2, 'thinkpad.png');





