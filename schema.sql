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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizeo 50 inch LCD Television","Electronics", 450.50,4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizeo 60 inch LCD Television","Electronics", 650.50,3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 50 inch LCD Television","Electronics", 550.50,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 60 inch LCD Television","Electronics", 850.50,1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lenovo Flex 5 14-Inch 2-in-1 Laptop","Electronics", 650.99,4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lenovo Miix 510, 12.2-Inch Windows Laptop, 2 in 1 Laptop","Electronics", 899.99,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acer Aspire E 15 E5-575-33BM 15.6-Inch FHD Notebook","Electronics", 349.99,3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("KitchenAid KSM150PSER Artisan Tilt-Head Stand Mixer with Pouring Shield, 5-Quart","Kitchen & Dining", 399.99,3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("KitchenAid K45SSOB 4.5-Quart Classic Series Stand Mixer, Onyx Black","Kitchen & Dining", 224.50,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("OneSpace 50-1001 Stanton Computer Desk with Pullout Keyboard Tray","Home Office Desks", 44.50,1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tribesigns Computer Desk, Trestle Desk with Heavy Duty Metal Frame","Home Office Desks", 112.50,3);