Star Schema Design – FlexiMart Data Warehouse

1. What is a Data Warehouse?
A Data Warehouse is a centralized repository designed to support reporting and analytical queries.
It has the following key characteristics:
* Subject-Oriented – Organized around key business subjects such as sales and customers
* Integrated – Data from multiple sources is cleaned and unified
* Time-Variant – Stores historical data for trend analysis
* Non-Volatile – Data is read-only and not frequently updated
The FlexiMart Data Warehouse is built to analyze sales performance, customer behavior, and product trends.

2. What is a Star Schema?
A Star Schema is a data modeling technique used in data warehouses where:
* A central fact table stores measurable business data
* Multiple dimension tables store descriptive attributes
* The structure resembles a star
Advantages:
* Simple design
* Faster query performance
* Easy to understand and maintain
* Optimized for analytical (OLAP) queries

3. Star Schema for FlexiMart
The FlexiMart warehouse uses the following star schema:
Fact Table
fact_sales
  * Stores quantitative sales metrics such as total sales amount and quantity
  * Linked to all dimension tables via foreign keys
Dimension Tables
* dim_customer– Customer details (name, city, email)
* dim_product – Product information (name, category, price)
* dim_date– Date attributes (day, month, year)

4. Grain of the Fact Table
Grain Definition:
> One record per product per order per day
This means each row in the `fact_sales` table represents:
* A single product
* Purchased by a customer
* On a specific date
Defining the grain clearly ensures accurate aggregation and consistent analytics.

5. Schema Benefits for Analytics
This star schema enables:
* Monthly and yearly sales trend analysis
* Customer-wise and product-wise revenue reporting
* Efficient aggregation using SQL `GROUP BY`
* Scalable and high-performance reporting
