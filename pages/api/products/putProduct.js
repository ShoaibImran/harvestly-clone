import User from "@/models/userModel";
import { db } from "@/helpers/connectMongo";

export default async function handler(req, res) {
  try {
    db.connect();
    const {
      userId,
      productId,
      productName,
      productDescription,
      productPrice,
      productImage,
      productStock,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the index of the product to be updated
    const productIndex = user.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update the product details
    user.products[productIndex].name = productName;
    user.products[productIndex].description = productDescription;
    user.products[productIndex].price = productPrice;
    user.products[productIndex].image = productImage;
    user.products[productIndex].stock = productStock;

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: user.products[productIndex],
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
