import bcrypt from "bcrypt";
import User from "@/models/userModel";
import { db } from "@/helpers/connectMongo";

export default async function handler(req, res) {
  try {
    await db.connect();
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email or password is missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    console.log(newUser);

    return res.status(200).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
