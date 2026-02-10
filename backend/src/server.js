// Express Server with MongoDB Integration (ES Modules)
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { chatAI } from "./aiAgent.js";



dotenv.config();

/* -------------------- FIX __dirname (ESM) -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------- APP SETUP -------------------- */
const app = express();
const PORT = process.env.PORT;

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: "https://www.smarteins.in",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With"
    ]
  })
);

// ⚠️ IMPORTANT: use "/*", NOT "*"
app.options("/", cors());

app.use(express.json());

// Serve frontend static files safely
app.use(
  express.static(
    path.join(__dirname, "..", "..", "frontend","src","App.jsx")
  )
);

/* -------------------- MONGODB -------------------- */
let db;
const mongoUrl =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/smarteinsDB";

MongoClient.connect(mongoUrl)
  .then(client => {
    console.log("Connected to MongoDB");
    db = client.db("smarteinsDB");

    initializeData();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

/* -------------------- INIT DATA -------------------- */
async function initializeData() {
  try {
    const productsCount = await db
      .collection("products")
      .countDocuments();

    if (productsCount === 0) {
      await db.collection("products").insertMany([
        {
          name: "iPhone 15 Pro",
          category: "smartphones",
          price: 134900,
          originalPrice: 144900,
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
          trending: false,
          bestDeal: false,
          brand: "Apple",
          specifications: {
            processor: "A17 Pro",
            camera: "48MP",
            storage: "128GB",
            display: "6.1-inch Super Retina XDR"
          },
          createdAt: new Date()
        },
        {
          name: "Samsung Galaxy S24 Ultra",
          category: "smartphones",
          price: 129900,
          originalPrice: 139900,
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
          trending: false,
          bestDeal: false,
          brand: "Samsung",
          specifications: {
            processor: "Snapdragon 8 Gen 3",
            camera: "200MP",
            storage: "256GB",
            display: "6.8-inch Dynamic AMOLED 2X"
          },
          createdAt: new Date()
        }
      ]);

      console.log("Sample data initialized");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}

/* -------------------- API ROUTES -------------------- */
app.get("/api/products", async (req, res) => {
  try {
    const { category, limit = 20 } = req.query;
    const filter =
      category && category !== "all" ? { category } : {};

    const products = await db
      .collection("products")
      .find(filter)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = {
      ...req.body,
      createdAt: new Date()
    };

    const result = await db
      .collection("products")
      .insertOne(product);

    res.json({
      success: true,
      productId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/* -------------------- FRONTEND FALLBACK -------------------- */
// ⚠️ MUST BE LAST
app.get("/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "frontend",
      "index.html"
    )
  );
});


app.get("/api/products/search", async (req, res) => {
  try {
    const q = (req.query.q || "").toLowerCase();

    const products = await db
      .collection("products")
      .find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
          { brand: { $regex: q, $options: "i" } }
        ]
      })
      .limit(5)
      .toArray();

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


app.post("/api/chat", async (req, res) => {
  const { message, products } = req.body;
  const reply = await chatAI(message, products);
  res.json({ success: true, reply });
});