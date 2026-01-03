Q: 1
Module 2: Assignment: AI Data Architecture Design and Implementation
Course: Data for Artificial Intelligence

Weightage: 5% of CGPA

Total Marks: 100

Assignment Type: Individual Project

Estimated Completion Time: 10 hours

Submission Mode: GitHub Repository

Please find the data here

Assignment Overview
You are a Data Engineer at FlexiMart, an e-commerce company. Your task is to build a complete data pipeline from raw CSV files to a fully functional analytics system.

What You'll Build
ETL Pipeline: Ingest raw CSV data into a relational database
Database Documentation: Document the database schema and relationships
Business Queries: Answer specific business questions using SQL
NoSQL Analysis: Analyze product data requirements and implement MongoDB queries
Data Warehouse: Build a star schema and generate analytical reports
Time Allocation
Part	Tasks	Marks
Part 1	ETL Pipeline + Database + Queries	35
Part 2	NoSQL Analysis (Theory + Practical)	20
Part 3	Data Warehouse + Analytics	35
Documentation	README files and code quality	10
Total		100
Part 1: Database Design and ETL Pipeline (35 Marks)
Problem Statement
FlexiMart has three CSV files containing customer, product, and sales data with quality issues. You need to:

Clean and load this data into a MySQL/PostgreSQL database
Document the database schema
Answer specific business questions
Task 1.1: ETL Pipeline Implementation (15 marks)
Provided Data Files
You will be given three CSV files with intentional data quality issues:

File 1: customers_raw.csv (20+ records)

Issues: Missing emails, inconsistent phone formats, duplicate entries
File 2: products_raw.csv (15+ records)

Issues: Missing prices, inconsistent category names, null stock values
File 3: sales_raw.csv (30+ records)

Issues: Date format inconsistencies, missing customer/product IDs, duplicate transactions
Your Tasks
Create etl_pipeline.py that:

Extract: Read all three CSV files
Transform:
Remove duplicate records
Handle missing values (use appropriate strategy: drop, fill, or default)
Standardize phone formats (e.g., +91-9876543210)
Standardize category names (e.g., "electronics", "Electronics", "ELECTRONICS" → "Electronics")
Convert date formats to YYYY-MM-DD
Add surrogate keys (auto-incrementing IDs)
Load: Insert cleaned data into MySQL/PostgreSQL database using Python
Database Schema (Provided)
Use this exact schema for your database:

-- Database: fleximart

CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(50),
    registration_date DATE
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

Deliverables
etl_pipeline.py - Complete ETL script with comments
data_quality_report.txt - Generated report showing:
Number of records processed per file
Number of duplicates removed
Number of missing values handled
Number of records loaded successfully
Evaluation Criteria
Extract logic (3 marks): Reads all CSV files correctly
Transform logic (7 marks): Handles all data quality issues appropriately
Load logic (3 marks): Successfully inserts into database with error handling
Code quality (2 marks): Comments, error handling, logging
Task 1.2: Database Schema Documentation (5 marks)
Create schema_documentation.md with:

Required Sections
Entity-Relationship Description (Text Format)

ENTITY: customers
Purpose: Stores customer information
Attributes:
  - customer_id: Unique identifier (Primary Key)
  - first_name: Customer's first name
  - [list all attributes with descriptions]

Relationships:
  - One customer can place MANY orders (1:M with orders table)

Normalization Explanation

Explain why this design is in 3NF (200-250 words)
Identify functional dependencies
Explain how the design avoids update, insert, and delete anomalies
Sample Data Representation

Show 2-3 sample records from each table in table format
Evaluation Criteria
Entity descriptions (2 marks): Clear description of all 4 tables
Normalization explanation (2 marks): Correct 3NF justification
Documentation quality (1 mark): Formatting and clarity
Task 1.3: Business Query Implementation (15 marks)
Write SQL queries to answer these specific business scenarios:

Query 1: Customer Purchase History (5 marks)
Business Question: "Generate a detailed report showing each customer's name, email, total number of orders placed, and total amount spent. Include only customers who have placed at least 2 orders and spent more than ₹5,000. Order by total amount spent in descending order."

Requirements:

Must join: customers, orders, order_items tables
Use GROUP BY with HAVING clause
Calculate aggregates: COUNT of orders, SUM of amounts
Expected Output Columns:

customer_name | email | total_orders | total_spent

Query 2: Product Sales Analysis (5 marks)
Business Question: "For each product category, show the category name, number of different products sold, total quantity sold, and total revenue generated. Only include categories that have generated more than ₹10,000 in revenue. Order by total revenue descending."

Requirements:

Must join: products, order_items tables
Use GROUP BY with HAVING clause
Calculate: COUNT(DISTINCT), SUM aggregates
Expected Output Columns:

category | num_products | total_quantity_sold | total_revenue

Query 3: Monthly Sales Trend (5 marks)
Business Question: "Show monthly sales trends for the year 2024. For each month, display the month name, total number of orders, total revenue, and the running total of revenue (cumulative revenue from January to that month)."

Requirements:

Use window function (SUM() OVER) for running total OR use subquery
Extract month from order_date
Group by month
Order chronologically
Expected Output Columns:

month_name | total_orders | monthly_revenue | cumulative_revenue

Hint: Use DATE_FORMAT() or MONTHNAME() for month names and window functions for running totals.

Deliverables
Create business_queries.sql with:

-- Query 1: Customer Purchase History
-- Business Question: [Copy the question]
-- Expected to return customers with 2+ orders and >5000 spent

SELECT
    -- Your query here

-- Query 2: Product Sales Analysis
-- Business Question: [Copy the question]
-- Expected to return categories with >10000 revenue

SELECT
    -- Your query here

-- Query 3: Monthly Sales Trend
-- Business Question: [Copy the question]
-- Expected to show monthly and cumulative revenue

SELECT
    -- Your query here

Evaluation Criteria
Query 1 (5 marks): Correct joins, aggregation, filtering
Query 2 (5 marks): Category analysis with proper grouping
Query 3 (5 marks): Correct use of window functions or subqueries
All queries must return correct results for provided sample data
Part 2: NoSQL Database Analysis (20 Marks)
Problem Statement
FlexiMart wants to expand its product catalog to include highly diverse products. You need to analyze whether MongoDB would be suitable and implement basic operations.

Task 2.1: NoSQL Justification Report (10 marks - Theory)
Create nosql_analysis.md answering these questions:

Section A: Limitations of RDBMS (4 marks - 150 words)
Explain why the current relational database would struggle with:

Products having different attributes (e.g., laptops have RAM/processor, shoes have size/color)
Frequent schema changes when adding new product types
Storing customer reviews as nested data
Section B: NoSQL Benefits (4 marks - 150 words)
Explain how MongoDB solves these problems using:

Flexible schema (document structure)
Embedded documents (reviews within products)
Horizontal scalability
Section C: Trade-offs (2 marks - 100 words)
What are two disadvantages of using MongoDB instead of MySQL for this product catalog?

Evaluation Criteria
RDBMS limitations (4 marks): Clear understanding of relational constraints
NoSQL benefits (4 marks): Correct application of MongoDB features
Trade-offs (2 marks): Realistic disadvantages identified
Task 2.2: MongoDB Implementation (10 marks - Practical)
Provided Sample Data
You will be given products_catalog.json with 10 products across 2 categories.

Example structure:

{
  "product_id": "ELEC001",
  "name": "Samsung Galaxy S21",
  "category": "Electronics",
  "price": 799.99,
  "stock": 150,
  "specs": {
    "ram": "8GB",
    "storage": "128GB"
  },
  "reviews": [
    {"user": "U001", "rating": 5, "comment": "Great!", "date": "2024-01-15"}
  ]
}

Your Tasks
Create mongodb_operations.js with these operations:

Operation 1: Load Data (1 mark)

// Import the provided JSON file into collection 'products'

Operation 2: Basic Query (2 marks)

// Find all products in "Electronics" category with price less than 50000
// Return only: name, price, stock

Operation 3: Review Analysis (2 marks)

// Find all products that have average rating >= 4.0
// Use aggregation to calculate average from reviews array

Operation 4: Update Operation (2 marks)

// Add a new review to product "ELEC001"
// Review: {user: "U999", rating: 4, comment: "Good value", date: ISODate()}

Operation 5: Complex Aggregation (3 marks)

// Calculate average price by category
// Return: category, avg_price, product_count
// Sort by avg_price descending

Deliverables
nosql_analysis.md - Theory report (3 sections)
mongodb_operations.js - 5 MongoDB operations with comments
products_catalog.json - Sample data (provided, you may modify)
Evaluation Criteria
Theory report (10 marks): Content quality, clarity, word limits
MongoDB operations (10 marks): Correct syntax, proper aggregation, comments
Part 3: Data Warehouse and Analytics (35 Marks)
Problem Statement
FlexiMart needs a data warehouse to analyze historical sales patterns. Build a star schema and generate analytical reports.

Task 3.1: Star Schema Design Documentation (10 marks) - 1 hour
Create star_schema_design.md with these sections:

Section 1: Schema Overview (4 marks)
Describe your star schema in text format (not diagram):

FACT TABLE: fact_sales
Grain: One row per product per order line item
Business Process: Sales transactions

Measures (Numeric Facts):
- quantity_sold: Number of units sold
- unit_price: Price per unit at time of sale
- discount_amount: Discount applied
- total_amount: Final amount (quantity × unit_price - discount)

Foreign Keys:
- date_key → dim_date
- product_key → dim_product
- customer_key → dim_customer

DIMENSION TABLE: dim_date
Purpose: Date dimension for time-based analysis
Type: Conformed dimension
Attributes:
- date_key (PK): Surrogate key (integer, format: YYYYMMDD)
- full_date: Actual date
- day_of_week: Monday, Tuesday, etc.
- month: 1-12
- month_name: January, February, etc.
- quarter: Q1, Q2, Q3, Q4
- year: 2023, 2024, etc.
- is_weekend: Boolean

[Continue for dim_product and dim_customer]

Section 2: Design Decisions (3 marks - 150 words)
Explain:

Why you chose this granularity (transaction line-item level)
Why surrogate keys instead of natural keys
How this design supports drill-down and roll-up operations
Section 3: Sample Data Flow (3 marks)
Show an example of how one transaction flows from source to data warehouse:

Source Transaction:
Order #101, Customer "John Doe", Product "Laptop", Qty: 2, Price: 50000

Becomes in Data Warehouse:
fact_sales: {
  date_key: 20240115,
  product_key: 5,
  customer_key: 12,
  quantity_sold: 2,
  unit_price: 50000,
  total_amount: 100000
}

dim_date: {date_key: 20240115, full_date: '2024-01-15', month: 1, quarter: 'Q1'...}
dim_product: {product_key: 5, product_name: 'Laptop', category: 'Electronics'...}
dim_customer: {customer_key: 12, customer_name: 'John Doe', city: 'Mumbai'...}

Evaluation Criteria
Schema description (4 marks): All tables clearly documented
Design justification (3 marks): Sound reasoning for choices
Sample data flow (3 marks): Clear understanding of dimensional modeling
Task 3.2: Star Schema Implementation (10 marks)
Provided Schema
Use this exact schema:

-- Database: fleximart_dw

CREATE TABLE dim_date (
    date_key INT PRIMARY KEY,
    full_date DATE NOT NULL,
    day_of_week VARCHAR(10),
    day_of_month INT,
    month INT,
    month_name VARCHAR(10),
    quarter VARCHAR(2),
    year INT,
    is_weekend BOOLEAN
);

CREATE TABLE dim_product (
    product_key INT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(20),
    product_name VARCHAR(100),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    unit_price DECIMAL(10,2)
);

CREATE TABLE dim_customer (
    customer_key INT PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(20),
    customer_name VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    customer_segment VARCHAR(20)
);

CREATE TABLE fact_sales (
    sale_key INT PRIMARY KEY AUTO_INCREMENT,
    date_key INT NOT NULL,
    product_key INT NOT NULL,
    customer_key INT NOT NULL,
    quantity_sold INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
    FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
    FOREIGN KEY (customer_key) REFERENCES dim_customer(customer_key)
);

Your Tasks
Create warehouse_data.sql with INSERT statements:

Minimum Data Requirements:

dim_date: 30 dates (January-February 2024)
dim_product: 15 products across 3 categories
dim_customer: 12 customers across 4 cities
fact_sales: 40 sales transactions
Data Guidelines:

Dates should include both weekdays and weekends
Products should have varied prices (₹100 to ₹100,000)
Customers should represent different cities/states
Sales should show realistic patterns (higher on weekends, varied quantities)
Deliverables
warehouse_schema.sql - Schema creation (provided above, copy as-is)
warehouse_data.sql - All INSERT statements
Both files must run without errors
Evaluation Criteria
Data volume (4 marks): Meets minimum requirements
Data realism (4 marks): Realistic values and distributions
Data correctness (2 marks): No foreign key violations, proper formats
Task 3.3: OLAP Analytics Queries (15 marks)
Write SQL queries for these specific analytical scenarios:

Query 1: Monthly Sales Drill-Down Analysis (5 marks)
Business Scenario: "The CEO wants to see sales performance broken down by time periods. Start with yearly total, then quarterly, then monthly sales for 2024."

Requirements:

Show: year, quarter, month, total_sales, total_quantity
Group by year, quarter, month
Order chronologically
This demonstrates drill-down (Year → Quarter → Month)
Expected Output:

year | quarter | month_name | total_sales | total_quantity
2024 | Q1      | January    | 450000      | 85
2024 | Q1      | February   | 380000      | 72

Hint: Use date dimension attributes for grouping.

Query 2: Product Performance Analysis (5 marks)
Business Scenario: "The product manager needs to identify top-performing products. Show the top 10 products by revenue, along with their category, total units sold, and revenue contribution percentage."

Requirements:

Join fact_sales with dim_product
Calculate: total revenue, total quantity per product
Calculate: percentage of total revenue (each product's revenue / overall revenue × 100)
Order by revenue descending
Limit to top 10
Expected Output:

product_name | category | units_sold | revenue | revenue_percentage
Laptop Pro   | Electronics | 45      | 225000  | 15.5%

Hint: Use window function or subquery for percentage calculation.

Query 3: Customer Segmentation Analysis (5 marks)
Business Scenario: "Marketing wants to target high-value customers. Segment customers into 'High Value' (>₹50,000 spent), 'Medium Value' (₹20,000-₹50,000), and 'Low Value' (<₹20,000). Show count of customers and total revenue in each segment."

Requirements:

Calculate total spending per customer
Use CASE statement to create segments
Group by segment
Show: segment, customer_count, total_revenue, avg_revenue_per_customer
Expected Output:

customer_segment | customer_count | total_revenue | avg_revenue
High Value       | 8              | 520000       | 65000
Medium Value     | 12             | 420000       | 35000
Low Value        | 15             | 180000       | 12000

Hint: Use CASE WHEN for segmentation, nested query or CTE recommended.

Deliverables
Create analytics_queries.sql:

-- Query 1: Monthly Sales Drill-Down
-- Business Scenario: [Copy scenario]
-- Demonstrates: Drill-down from Year to Quarter to Month

SELECT
    -- Your query here

-- Query 2: Top 10 Products by Revenue
-- Business Scenario: [Copy scenario]
-- Includes: Revenue percentage calculation

SELECT
    -- Your query here

-- Query 3: Customer Segmentation
-- Business Scenario: [Copy scenario]
-- Segments: High/Medium/Low value customers

SELECT
    -- Your query here

Evaluation Criteria
Query 1 (5 marks): Correct drill-down, proper grouping
Query 2 (5 marks): Accurate percentage calculation, top-N logic
Query 3 (5 marks): Correct segmentation with CASE, proper aggregation
Documentation and Code Quality (10 Marks)
Root README.md (5 marks)
Create a comprehensive README.md in root directory:

# FlexiMart Data Architecture Project

**Student Name:** [Your Name]
**Student ID:** [Your ID]
**Email:** [Your Email]
**Date:** [Date]

## Project Overview

[2-3 sentences describing what you built]

## Repository Structure
├── part1-database-etl/
│   ├── etl_pipeline.py
│   ├── schema_documentation.md
│   ├── business_queries.sql
│   └── data_quality_report.txt
├── part2-nosql/
│   ├── nosql_analysis.md
│   ├── mongodb_operations.js
│   └── products_catalog.json
├── part3-datawarehouse/
│   ├── star_schema_design.md
│   ├── warehouse_schema.sql
│   ├── warehouse_data.sql
│   └── analytics_queries.sql
└── README.md

## Technologies Used

- Python 3.x, pandas, mysql-connector-python
- MySQL 8.0 / PostgreSQL 14
- MongoDB 6.0

## Setup Instructions

### Database Setup

```bash
# Create databases
mysql -u root -p -e "CREATE DATABASE fleximart;"
mysql -u root -p -e "CREATE DATABASE fleximart_dw;"

# Run Part 1 - ETL Pipeline
python part1-database-etl/etl_pipeline.py

# Run Part 1 - Business Queries
mysql -u root -p fleximart < part1-database-etl/business_queries.sql

# Run Part 3 - Data Warehouse
mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_schema.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_data.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/analytics_queries.sql


### MongoDB Setup

mongosh < part2-nosql/mongodb_operations.js

## Key Learnings

[3-4 sentences on what you learned]

## Challenges Faced

1. [Challenge and solution]
2. [Challenge and solution]

GitHub Submission Guidelines
Repository Structure
studentID-fleximart-data-architecture/
│
├── README.md                           # Root documentation
├── .gitignore                          # Ignore unnecessary files
│
├── data/                               # Input data files (provided)
│   ├── customers_raw.csv
│   ├── products_raw.csv
│   └── sales_raw.csv
│
├── part1-database-etl/
│   ├── README.md                       # Part 1 overview
│   ├── etl_pipeline.py
│   ├── schema_documentation.md
│   ├── business_queries.sql
│   ├── data_quality_report.txt         # Generated by ETL script
│   └── requirements.txt                # Python dependencies
│
├── part2-nosql/
│   ├── README.md                       # Part 2 overview
│   ├── nosql_analysis.md
│   ├── mongodb_operations.js
│   └── products_catalog.json
│
└── part3-datawarehouse/
    ├── README.md                       # Part 3 overview
    ├── star_schema_design.md
    ├── warehouse_schema.sql
    ├── warehouse_data.sql
    └── analytics_queries.sql

.gitignore Template
# Python
__pycache__/
*.pyc
.env
venv/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.log

# Large files
*.zip

Commit Requirements
Minimum 6 meaningful commits
Use format: [PartX] Description
Examples:
[Part1] Complete ETL pipeline implementation
[Part1] Add business query solutions
[Part2] Complete MongoDB operations
[Part3] Add star schema documentation
[Part3] Implement OLAP queries
[Docs] Update root README
Submission Process
Create public repository: [studentID]-fleximart-data-architecture
Complete all parts
Test thoroughly
Push to GitHub
Submit URL via LMS: https://github.com/[username]/[studentID]-fleximart-data-architecture
Evaluation Rubric Summary
Component	Marks	Key Criteria
Part 1: ETL + Database	35	ETL (15), Schema Docs (5), Queries (15)
Part 2: NoSQL	20	Theory (10), MongoDB Ops (10)
Part 3: Data Warehouse	35	Design Docs (10), Implementation (10), OLAP (15)
Documentation & Code	10	Root README (5), Code Quality (5)
TOTAL	100	