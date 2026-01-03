Database Schema Documentation – FlexiMart

1. Entity–Relationship Description

ENTITY: customers  
Purpose: Stores customer information for all registered users on the FlexiMart platform.

Attributes:  
- customer_id: Unique identifier for each customer (Primary Key)  
- first_name: Customer’s first name  
- last_name: Customer’s last name  
- email: Unique email address of the customer  
- phone: Customer contact number  
- city: City where the customer resides  
- registration_date: Date when the customer registered  

Relationships:  
- One customer can place many orders (1:M relationship with orders table)

---

ENTITY: products  
Purpose: Stores product details available for sale on the platform.

Attributes:  
- product_id: Unique identifier for each product (Primary Key)  
- product_name: Name of the product  
- category: Product category (Electronics, Fashion, Groceries)  
- price: Price of the product  
- stock_quantity: Available stock quantity  

Relationships:  
- One product can appear in many order items (1:M relationship with order_items table)

---

ENTITY: orders  
Purpose: Stores order-level transaction information.

Attributes:  
- order_id: Unique identifier for each order (Primary Key)  
- customer_id: References the customer who placed the order (Foreign Key)  
- order_date: Date when the order was placed  
- total_amount: Total value of the order  
- status: Current status of the order  

Relationships:  
- Each order belongs to one customer  
- One order can contain many order items (1:M with order_items table)

---

ENTITY: order_items  
Purpose: Stores detailed line-item information for each order.

Attributes:  
- order_item_id: Unique identifier for each order item (Primary Key)  
- order_id: References the related order (Foreign Key)  
- product_id: References the purchased product (Foreign Key)  
- quantity: Number of units purchased  
- unit_price: Price per unit at time of purchase  
- subtotal: Calculated as quantity × unit_price  

Relationships:  
- Each order item belongs to one order  
- Each order item references one product

---

2. Normalization Explanation (Third Normal Form)

The FlexiMart database design follows Third Normal Form (3NF) to ensure data integrity and minimize redundancy.  
Each table stores data related to a single entity, and all non-key attributes are fully functionally dependent on the primary key.

Functional Dependencies:
- customers: customer_id → first_name, last_name, email, phone, city, registration_date  
- products: product_id → product_name, category, price, stock_quantity  
- orders: order_id → customer_id, order_date, total_amount, status  
- order_items: order_item_id → order_id, product_id, quantity, unit_price, subtotal  

There are no partial dependencies because each table uses a single-column primary key.  
There are no transitive dependencies because non-key attributes do not depend on other non-key attributes.

This design avoids update anomalies by ensuring customer or product details are stored in only one place.  
Insert anomalies are avoided because new customers, products, or orders can be added independently without requiring unrelated data.  
Delete anomalies are prevented because removing an order does not remove customer or product information.

By separating customers, products, orders, and order items into distinct tables, the schema maintains consistency, reduces redundancy, and supports reliable transactional processing.

---

3. Sample Data Representation

Customers (Sample Records)

| customer_id | first_name | last_name | email                  | city      |
|------------|-----------|-----------|------------------------|-----------|
| 1          | Rahul     | Sharma    | rahul.sharma@gmail.com | Bangalore |
| 2          | Priya     | Patel     | priya.patel@yahoo.com  | Mumbai    |

Products (Sample Records)

| product_id | product_name            | category     | price  | stock_quantity |
|-----------|--------------------------|--------------|--------|----------------|
| 1         | Samsung Galaxy S21       | Electronics  | 45999  | 150            |
| 2         | Nike Running Shoes       | Fashion      | 3499   | 80             |

Orders (Sample Records)

| order_id | customer_id | order_date | total_amount | status     |
|---------|-------------|------------|--------------|------------|
| 101     | 1           | 2024-01-15 | 45999        | Completed  |
| 102     | 2           | 2024-01-16 | 6998         | Completed  |

Order_Items (Sample Records)

| order_item_id | order_id | product_id | quantity | unit_price | subtotal |
|--------------|----------|------------|----------|------------|----------|
| 1            | 101      | 1          | 1        | 45999      | 45999    |
| 2            | 102      | 2          | 2        | 3499       | 6998     |
