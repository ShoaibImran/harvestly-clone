import User from "@/models/userModel";
import { db } from "@/helpers/connectMongo";

export default async function postRating(req, res) {
  try {
    await db.connect();
    const { userId, targetUserId, rating, comment } = req.body; // Add targetUserId for the user being reviewed
    const user = await User.findById(targetUserId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const reviewer = await User.findById(userId); // Find the user posting the review

    if (!reviewer) {
      return res
        .status(404)
        .json({ success: false, message: "Reviewer not found" });
    }

    const newReview = {
      user: userId, // Store the ID of the user posting the review
      targetUser: targetUserId, // Store the ID of the user being reviewed
      rating,
      comment,
      createdAt: new Date(),
    };

    user.reviews.push(newReview);

    // Save the user document with the new review
    await user.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
