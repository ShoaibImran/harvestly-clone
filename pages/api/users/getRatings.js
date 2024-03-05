import User from "@/models/userModel";
import { db } from "@/helpers/connectMongo";

export default async function getRatings(req, res) {
  try {
    await db.connect();
    const { userId } = req.query;

    const user = await User.findById(userId).populate("reviews");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const formattedReviews = [];

    for (const review of user.reviews) {
      const reviewer = await User.findById(
        review.user,
        "farmName profilePicture"
      );

      formattedReviews.push({
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        reviewer: {
          name: reviewer.farmName,
          profilePicture: reviewer.profilePicture,
        },
      });
    }

    res.status(200).json({
      success: true,
      userId: userId,
      reviews: formattedReviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
