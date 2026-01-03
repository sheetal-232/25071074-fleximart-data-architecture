// Use database
use fleximart_nosql;

// Operation 1: Load Data
// Insert product catalog data into products collection
db.products.insertMany([
  {
    product_id: "ELEC001",
    name: "Samsung Galaxy S21 Ultra",
    category: "Electronics",
    price: 79999,
    stock: 150,
    specs: { ram: "12GB", storage: "256GB" },
    reviews: [
      { user: "U001", rating: 5, comment: "Excellent phone", date: ISODate("2024-01-15") },
      { user: "U002", rating: 4, comment: "Very good", date: ISODate("2024-01-18") }
    ]
  },
  {
    product_id: "ELEC002",
    name: "Apple MacBook Pro 14-inch",
    category: "Electronics",
    price: 189999,
    stock: 45,
    specs: { ram: "16GB", storage: "512GB" },
    reviews: [
      { user: "U003", rating: 5, comment: "Powerful laptop", date: ISODate("2024-02-10") }
    ]
  }
]);

// Operation 2: Basic Query
// Find Electronics products with price < 50000
db.products.find(
  { category: "Electronics", price: { $lt: 50000 } },
  { name: 1, price: 1, stock: 1, _id: 0 }
);

// Operation 3: Review Analysis
// Products with average rating >= 4.0
db.products.aggregate([
  { $unwind: "$reviews" },
  {
    $group: {
      _id: "$name",
      avg_rating: { $avg: "$reviews.rating" }
    }
  },
  { $match: { avg_rating: { $gte: 4 } } }
]);

// Operation 4: Update Operation
// Add new review to product ELEC001
db.products.updateOne(
  { product_id: "ELEC001" },
  {
    $push: {
      reviews: {
        user: "U999",
        rating: 4,
        comment: "Good value",
        date: new Date()
      }
    }
  }
);

// Operation 5: Complex Aggregation
// Average price by category
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avg_price: { $avg: "$price" },
      product_count: { $sum: 1 }
    }
  },
  { $sort: { avg_price: -1 } }
]);
