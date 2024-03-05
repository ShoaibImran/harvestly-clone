import { db } from "@/helpers/connectMongo";
import User from "@/models/userModel";

export default async function (req, res) {
  try {
    await db.connect();

    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
