DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Make a string column called "product_name" which cannot contain null --
  product_name VARCHAR(256) NOT NULL,
  -- Make a string column called "department_name" --
  department_name varchar(256) NOT NULL,
  -- Make an integer column called "price" --
  price DECIMAL(6,2) NOT NULL,
  -- Make an integer column called "stock_quantity" --
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
