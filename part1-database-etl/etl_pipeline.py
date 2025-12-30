import pandas as pd

# Load CSV files
customers_df = pd.read_csv("data/customers_raw.csv")
products_df = pd.read_csv("data/products_raw.csv")
sales_df = pd.read_csv("data/sales_raw.csv")

print("===== BEFORE DEDUPLICATION =====")
print("Customers:", len(customers_df))
print("Products:", len(products_df))
print("Sales:", len(sales_df))

# Remove duplicates
customers_df = customers_df.drop_duplicates()
products_df = products_df.drop_duplicates()
sales_df = sales_df.drop_duplicates()

print("\n===== AFTER DEDUPLICATION =====")
print("Customers:", len(customers_df))
print("Products:", len(products_df))
print("Sales:", len(sales_df))

# Handle missing emails (customers)
customers_df = customers_df.dropna(subset=["email"])

# Standardize phone numbers
def clean_phone(phone):
    phone = str(phone)
    phone = phone.replace("-", "").replace(" ", "")
    if phone.startswith("0"):
        phone = phone[1:]
    if not phone.startswith("+91"):
        phone = "+91" + phone
    return phone

customers_df["phone"] = customers_df["phone"].apply(clean_phone)

# Handle missing values in products
print("\n===== PRODUCTS MISSING VALUES (BEFORE) =====")
print(products_df.isna().sum())

products_df["price"] = products_df["price"].fillna(0)
products_df["stock_quantity"] = products_df["stock_quantity"].fillna(0)

print("\n===== PRODUCTS MISSING VALUES (AFTER) =====")
print(products_df.isna().sum())

# Standardize product categories
products_df["category"] = products_df["category"].str.strip().str.lower()
products_df["category"] = products_df["category"].replace({
    "electronics": "Electronics",
    "fashion": "Fashion",
    "groceries": "Groceries"
})

print("\n===== PRODUCT CATEGORIES (AFTER STANDARDIZATION) =====")
print(products_df["category"].value_counts())

print("\n===== SALES MISSING VALUES (BEFORE) =====")
print(sales_df[["customer_id", "product_id"]].isnull().sum())

# Drop sales with missing customer_id or product_id
sales_df = sales_df.dropna(subset=["customer_id", "product_id"])

print("\n===== SALES MISSING VALUES (AFTER) =====")
print(sales_df[["customer_id", "product_id"]].isnull().sum())

print("\nSales records after cleaning:", len(sales_df))

# Standardize registration_date to YYYY-MM-DD
customers_df["registration_date"] = pd.to_datetime(
    customers_df["registration_date"], 
    errors="coerce", 
    infer_datetime_format=True
)

print("\n===== CUSTOMER REGISTRATION DATE (AFTER STANDARDIZATION) =====")
print(customers_df["registration_date"].head())

# Standardize sales transaction dates
sales_df["transaction_date"] = pd.to_datetime(
    sales_df["transaction_date"], 
    errors="coerce", 
    infer_datetime_format=True
)

print("\n===== SALES TRANSACTION DATE (AFTER STANDARDIZATION) =====")
print(sales_df["transaction_date"].head())

# Drop records where date conversion failed
customers_df = customers_df.dropna(subset=["registration_date"])
sales_df = sales_df.dropna(subset=["transaction_date"])

print("\n===== FINAL COUNTS AFTER DATE CLEANING =====")
print("Customers:", len(customers_df))
print("Products:", len(products_df))
print("Sales:", len(sales_df))

# Save cleaned data to new CSV files
customers_df.to_csv("data/customers_cleaned.csv", index=False)
products_df.to_csv("data/products_cleaned.csv", index=False)
sales_df.to_csv("data/sales_cleaned.csv", index=False)

print("\n===== CLEANED FILES SAVED =====")
print("customers_cleaned.csv")
print("products_cleaned.csv")
print("sales_cleaned.csv")
