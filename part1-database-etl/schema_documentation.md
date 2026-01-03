Schema Documentation – FlexiMart Database

This document describes the relational database schema used in the FlexiMart project.
The database is designed using a normalized structure to store customers, products, and sales transactions efficiently.

Database Name
fleximart

Customers Table

Table Name
customers

Purpose
Stores customer information.

Columns
customer_id
Primary key. Auto-increment integer.

first_name
Customer first name.

last_name
Customer last name.

email
Customer email address.
Unique constraint applied.

phone
Customer phone number in standardized format.

city
City where the customer resides.

registration_date
Date when the customer registered.

Products Table

Table Name
products

Purpose
Stores product details.

Columns
product_id
Primary key. Auto-increment integer.

product_name
Name of the product.

category
Product category such as Electronics, Fashion, or Groceries.

price
Product price.

stock_quantity
Available stock count.

Orders Table

Table Name
orders

Purpose
Stores order-level transaction data.

Columns
order_id
Primary key. Auto-increment integer.

customer_id
Foreign key referencing customers.customer_id.

order_date
Date when the order was placed.

total_amount
Total value of the order.

status
Order status such as Completed or Pending.

Order_Items Table

Table Name
order_items

Purpose
Stores item-level details for each order.

Columns
order_item_id
Primary key. Auto-increment integer.

order_id
Foreign key referencing orders.order_id.

product_id
Foreign key referencing products.product_id.

quantity
Quantity of the product ordered.

unit_price
Price of the product at the time of order.

Relationships Summary

customers to orders
One-to-many relationship.
One customer can place multiple orders.

orders to order_items
One-to-many relationship.
One order can contain multiple products.

products to order_items
One-to-many relationship.
One product can appear in multiple order items.

This schema ensures data consistency, avoids redundancy, and supports efficient querying for business analysis