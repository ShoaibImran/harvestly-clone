import { db } from "@/helpers/connectMongo";
import User from "@/models/userModel";

export default async function handler(req, res) {
  try {
    db.connect();
    const farmers = await User.find({ role: "farmer" });

    if (!farmers) {
      return res
        .status(404)
        .json({ success: false, message: "Farmers not found" });
    }

    let allProducts = [];

    // Extract products from each farmer and add farmer's name to each product
    farmers.forEach((farmer) => {
      farmer.products.forEach((product) => {
        const productWithFarmerName = {
          ...product.toObject(),
          farmerName: farmer.farmName,
        };
        allProducts.push(productWithFarmerName);
      });
    });

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
