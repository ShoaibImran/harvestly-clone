import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
    default:
      "https://ik.imagekit.io/kirtanchandak/portfolio_website/empty-profile.webp?updatedAt=1704464858894",
  },
  stock: {
    type: Number,
    default: null,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  profilePicture: {
    type: String,
    default:
      "https://ik.imagekit.io/kirtanchandak/portfolio_website/empty-profile.webp?updatedAt=1704464858894",
  },
  farmName: {
    type: String,
    default: "",
  },
  aboutFarm: {
    type: String,
    default: "",
  },
  contactDetails: {
    type: String,
    default: "",
  },
  products: [productSchema],
  role: {
    type: String,
    enum: ["farmer", "user"],
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shippingAddress: {
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    phoneNo: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
