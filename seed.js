require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Location = require("./models/Location");


const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campus_navigation";

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB at:", MONGO_URI.replace(/:([^:@]{1,})@/, ":****@"));
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully!");

    const dataPath = path.join(__dirname, "data", "locations.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const locations = JSON.parse(rawData);

    // Sanitize and format data
    const formatted = locations.map(item => {
      const doc = { ...item };
      if (doc._id && doc._id.$oid) {
        doc._id = new mongoose.Types.ObjectId(doc._id.$oid);
      }
      return doc;
    });

    console.log(`Clearing existing locations...`);
    await Location.deleteMany({});

    console.log(`Inserting ${formatted.length} locations...`);
    await Location.insertMany(formatted);

    console.log(`✅ Successfully seeded ${formatted.length} locations!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
}

seedDatabase();
