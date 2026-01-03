# FlexiMart Data Architecture Project

Student Name: Sheetal Sharma  
Student ID: 25071074  
Email: sheetallsharma23@gmail.com  
Date: 04 January 2026  

## Project Overview

This project implements a complete data engineering pipeline for an e-commerce platform called FlexiMart. It covers data cleaning, relational and NoSQL database design, data warehousing using a star schema, and analytical reporting to support business decision-making.

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

- Python 3.x (pandas, mysql-connector-python)
- MySQL 8.x
- MongoDB
- Git and GitHub
- VS Code

## Setup Instructions

### MySQL Setup

Create databases:

mysql -u root -p -e "CREATE DATABASE fleximart;"
mysql -u root -p -e "CREATE DATABASE fleximart_dw;"

Run ETL pipeline:

python part1-database-etl/etl_pipeline.py

Run business queries:

mysql -u root -p fleximart < part1-database-etl/business_queries.sql

Run data warehouse scripts:

mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_schema.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_data.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/analytics_queries.sql

### MongoDB Setup

Open MongoDB shell and run:

mongosh < part2-nosql/mongodb_operations.js

## Key Learnings

This project helped in understanding end-to-end data engineering workflows including ETL design, relational modeling, NoSQL document modeling, and dimensional data warehousing. It also improved skills in writing analytical SQL queries and working with both structured and semi-structured data.

## Challenges Faced

1. Handling inconsistent and missing data across multiple CSV files was resolved using appropriate data cleaning strategies in Pandas.
2. Designing a star schema that supports analytical queries efficiently required careful selection of grain and surrogate keys.
