USE fleximart_warehouse;

SELECT
d.year,
CONCAT('Q', QUARTER(d.full_date)) AS quarter,
d.month_name,
SUM(f.total_amount) AS total_sales,
SUM(f.quantity) AS total_quantity
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
WHERE d.year = 2024
GROUP BY d.year, QUARTER(d.full_date), d.month, d.month_name
ORDER BY d.year, QUARTER(d.full_date), d.month;

SELECT
p.product_name,
p.category,
SUM(f.quantity) AS units_sold,
SUM(f.total_amount) AS revenue,
ROUND(
SUM(f.total_amount) / (SELECT SUM(total_amount) FROM fact_sales) * 100,
2
) AS revenue_percentage
FROM fact_sales f
JOIN dim_product p ON f.product_key = p.product_key
GROUP BY p.product_name, p.category
ORDER BY revenue DESC
LIMIT 10;

SELECT
CASE
WHEN SUM(f.total_amount) > 50000 THEN 'High Value'
WHEN SUM(f.total_amount) BETWEEN 20000 AND 50000 THEN 'Medium Value'
ELSE 'Low Value'
END AS customer_segment,
COUNT(DISTINCT f.customer_key) AS customer_count,
SUM(f.total_amount) AS total_revenue,
ROUND(AVG(f.total_amount), 2) AS avg_revenue
FROM fact_sales f
GROUP BY customer_segment;
