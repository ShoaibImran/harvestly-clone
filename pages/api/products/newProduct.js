import User from "@/models/userModel";
import { db } from "@/helpers/connectMongo";

export default async function handler(req, res) {
  try {
    db.connect();
    const {
      userId,
      productName,
      productDescription,
      productPrice,
      productStock,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    // Create a new product
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      stock: productStock,
    };

    // Push the new product to the user's products array
    user.products.push(newProduct);

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
