CREATE DATABASE IF NOT EXISTS fleximart_warehouse;

USE fleximart_warehouse;

CREATE TABLE dim_customer (
customer_key INT AUTO_INCREMENT PRIMARY KEY,
customer_id VARCHAR(10),
first_name VARCHAR(50),
last_name VARCHAR(50),
email VARCHAR(100),
city VARCHAR(50)
);

CREATE TABLE dim_product (
product_key INT AUTO_INCREMENT PRIMARY KEY,
product_id VARCHAR(10),
product_name VARCHAR(100),
category VARCHAR(50),
price DECIMAL(10,2)
);

CREATE TABLE dim_date (
date_key INT AUTO_INCREMENT PRIMARY KEY,
full_date DATE,
day INT,
month INT,
month_name VARCHAR(20),
year INT
);

CREATE TABLE fact_sales (
sales_key INT AUTO_INCREMENT PRIMARY KEY,
customer_key INT,
product_key INT,
date_key INT,
quantity INT,
total_amount DECIMAL(12,2),
FOREIGN KEY (customer_key) REFERENCES dim_customer(customer_key),
FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
FOREIGN KEY (date_key) REFERENCES dim_date(date_key)
);
