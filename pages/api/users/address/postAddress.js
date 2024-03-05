import User from "@/models/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId, street, city, state, phoneNo, zipCode } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "shippingAddress.street": street,
          "shippingAddress.city": city,
          "shippingAddress.state": state,
          "shippingAddress.phoneNo": phoneNo,
          "shippingAddress.zipCode": zipCode,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Address updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
