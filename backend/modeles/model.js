const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  category: { type: String, required: true }, // ✅ added
  shortDescription: { type: String, required: true },
  imageUrl: { type: String, required: true },
  route: { type: String, required: true },
  technicalSpecs: { type: [String], required: true },
  models: [
    {
      model: { type: String, required: true },
      capacity: { type: String, required: true },
      mechanicalSpeed: { type: String },
      moulds: { type: String },
      power: {
        mainConveyor: { type: String },
        auxiliaryConveyor: { type: String },
        brinePump: { type: String },
        thawingTankHeater: { type: String },
        washingTankHeater: { type: String }
      },
      compressedAir: { type: String },
      dimensions: { type: String },
      features: { type: [String] }
    }
  ]
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
