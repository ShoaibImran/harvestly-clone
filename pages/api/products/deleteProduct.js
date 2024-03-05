import User from "@/models/userModel";
import { db } from "@/helpers/connectMongo";

export default async function handler(req, res) {
  try {
    db.connect();
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the index of the product to be deleted
    const productIndex = user.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Remove the product from the array
    user.products.splice(productIndex, 1);

    // Save the updated user document (with the product removed)
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
