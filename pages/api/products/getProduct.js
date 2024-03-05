import User from "@/models/userModel";
import { db } from "@/helpers/connectMongo";

export default async function getProduct(req, res) {
  try {
    await db.connect();
    const { userId, productId } = req.query;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = user.products.find(
      (prod) => prod._id.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    // Handle error appropriately
    return res.status(500).json({ message: "Internal server error" });
  }
}
