import User from "@/models/userModel";

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const { userId } = query;

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
          return res
            .status(404)
            .json({ success: false, error: "User not found" });
        }

        // Return the user's shipping addresses
        return res
          .status(200)
          .json({ success: true, data: user.shippingAddress });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    default:
      return res
        .status(405)
        .json({ success: false, error: `Method ${method} Not Allowed` });
  }
}
