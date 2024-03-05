import { db } from "@/helpers/connectMongo";
import User from "@/models/userModel";

export default async function (req, res) {
  try {
    await db.connect();
    const { userId, farmName, aboutFarm, contactDetails, profilePicture } =
      req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!farmName || !aboutFarm || !contactDetails || !profilePicture) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const userToUpdate = User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedFields = {};

    if (farmName) {
      updatedFields.farmName = farmName;
    }
    if (aboutFarm) {
      updatedFields.aboutFarm = aboutFarm;
    }
    if (contactDetails) {
      updatedFields.contactDetails = contactDetails;
    }
    if (profilePicture) {
      updatedFields.profilePicture = profilePicture;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User updated:", updatedUser);

    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
