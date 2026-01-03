# FlexiMart Data Engineering Assignment

## Objective
Implement a complete data engineering pipeline using Python, MySQL, MongoDB, and Data Warehousing.

---

## Part 1: Data Cleaning & ETL (Python)
Raw CSV data contained duplicates, missing values, and inconsistent formats.

**Actions performed:**
- Removed duplicates
- Handled missing values
- Standardized phone numbers and categories
- Standardized date formats
- Generated cleaned CSV files

**Files:**
- data/*.csv
- part1-database-etl/etl_pipeline.py

---

## Part 2: Relational Database (MySQL)
- Database: `fleximart`
- Tables: customers, products, orders, order_items
- Cleaned data inserted via Python ETL script

**Business Queries:**
- Top customers by spending
- Monthly and cumulative revenue

File:
- part1-database-etl/business_queries.sql

---

## Part 3: NoSQL Database (MongoDB)
- Database: `fleximart_nosql`
- Collection: `products`
- Nested JSON with embedded reviews

**Operations:**
- Insert product catalog
- Category filtering
- Average rating aggregation
- Top-priced products

File:
- part2-nosql/products-catalog.json

---

## Part 4: Data Warehouse
- Star schema implemented
- Fact table: fact_sales
- Dimension tables: customer, product, date

Files:
- part3-datawarehouse/warehouse_schema.sql
- part3-datawarehouse/warehouse_data.sql

---

## Part 5: Analytics
Analytical queries for revenue trends and sales insights.

File:
- part3-datawarehouse/analytics_queries.sql

---

## Technologies
Python, MySQL, MongoDB, Git, VS Code

---

## Conclusion
The assignment demonstrates end-to-end data engineering including ETL, relational databases, NoSQL storage, and data warehousing.
