import pandas as pd
import mysql.connector

# =============================
# LOAD CSV FILES
# =============================
customers_df = pd.read_csv("data/customers_raw.csv")
products_df = pd.read_csv("data/products_raw.csv")
sales_df = pd.read_csv("data/sales_raw.csv")

# =============================
# BASIC CLEANING
# =============================
customers_df = customers_df.drop_duplicates()
products_df = products_df.drop_duplicates()
sales_df = sales_df.drop_duplicates()

customers_df = customers_df.dropna(subset=["email"])

def clean_phone(phone):
    phone = str(phone).replace("-", "").replace(" ", "")
    if phone.startswith("0"):
        phone = phone[1:]
    if not phone.startswith("+91"):
        phone = "+91" + phone
    return phone

customers_df["phone"] = customers_df["phone"].apply(clean_phone)

products_df["price"] = products_df["price"].fillna(0)
products_df["stock_quantity"] = products_df["stock_quantity"].fillna(0)

products_df["category"] = (
    products_df["category"]
    .str.strip()
    .str.lower()
    .replace({
        "electronics": "Electronics",
        "fashion": "Fashion",
        "groceries": "Groceries"
    })
)

sales_df = sales_df.dropna(subset=["customer_id", "product_id"])

customers_df["registration_date"] = pd.to_datetime(
    customers_df["registration_date"], errors="coerce"
)
sales_df["transaction_date"] = pd.to_datetime(
    sales_df["transaction_date"], errors="coerce"
)

customers_df = customers_df.dropna(subset=["registration_date"])
sales_df = sales_df.dropna(subset=["transaction_date"])

# =============================
# SAVE CLEANED FILES
# =============================
customers_df.to_csv("data/customers_cleaned.csv", index=False)
products_df.to_csv("data/products_cleaned.csv", index=False)
sales_df.to_csv("data/sales_cleaned.csv", index=False)

print("Cleaned CSV files saved ")

# =============================
# MYSQL CONNECTION
# =============================
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Sheetal@23",
    database="fleximart"
)
cursor = conn.cursor()

print("MySQL connected ")

# =============================
# INSERT CUSTOMERS
# =============================
print("Inserting customers...")

for _, row in customers_df.iterrows():
    cursor.execute("""
        INSERT IGNORE INTO customers
        (first_name, last_name, email, phone, city, registration_date)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        row["first_name"],
        row["last_name"],
        row["email"],
        row["phone"],
        row["city"],
        row["registration_date"].strftime("%Y-%m-%d")
    ))

conn.commit()
print("Customers inserted")

# =============================
# INSERT PRODUCTS
# =============================
print("Inserting products...")

for _, row in products_df.iterrows():
    cursor.execute("""
        INSERT IGNORE INTO products
        (product_name, category, price, stock_quantity)
        VALUES (%s, %s, %s, %s)
    """, (
        row["product_name"],
        row["category"],
        float(row["price"]),
        int(row["stock_quantity"])
    ))

conn.commit()
print("Products inserted")

# =============================
# CREATE CUSTOMER ID MAP
# =============================
cursor.execute("SELECT customer_id, email FROM customers")
customer_map = {email: cid for cid, email in cursor.fetchall()}

# Map C001 → email → INT id
sales_df["customer_id"] = sales_df["customer_id"].map(
    customers_df.set_index("customer_id")["email"].map(customer_map)
)

sales_df = sales_df.dropna(subset=["customer_id"])

# =============================
# INSERT ORDERS
# =============================
print("Inserting orders...")

for _, row in sales_df.iterrows():
    cursor.execute("""
        INSERT INTO orders (customer_id, order_date, total_amount, status)
        VALUES (%s, %s, %s, %s)
    """, (
        int(row["customer_id"]),
        row["transaction_date"].strftime("%Y-%m-%d"),
        float(row["quantity"] * row["unit_price"]),
        row["status"]
    ))

conn.commit()
print("Orders inserted successfully")

# =============================
# CLOSE CONNECTION
# =============================
cursor.close()
conn.close()
print("ETL completed successfully")
