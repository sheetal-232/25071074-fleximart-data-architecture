INSERT INTO dim_customer (customer_id, first_name, last_name, email, city)
SELECT customer_id, first_name, last_name, email, city
FROM fleximart.customers;

INSERT INTO dim_product (product_id, product_name, category, price)
SELECT product_id, product_name, category, price
FROM fleximart.products;

INSERT INTO dim_date (full_date, day, month, month_name, year)
SELECT DISTINCT
order_date,
DAY(order_date),
MONTH(order_date),
MONTHNAME(order_date),
YEAR(order_date)
FROM fleximart.orders;

INSERT INTO fact_sales (customer_key, product_key, date_key, quantity, total_amount)
SELECT
dc.customer_key,
dp.product_key,
dd.date_key,
oi.quantity,
oi.subtotal
FROM fleximart.order_items oi
JOIN fleximart.orders o ON oi.order_id = o.order_id
JOIN dim_customer dc ON dc.customer_id = o.customer_id
JOIN dim_product dp ON dp.product_id = oi.product_id
JOIN dim_date dd ON dd.full_date = o.order_date;
