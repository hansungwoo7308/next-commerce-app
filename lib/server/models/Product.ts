import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      // required: true,
      // enum: {
      //   values: ["electronics", "fashion", "food"],
      //   message: "Please select correct category",
      // },
    },
    name: {
      type: String,
      required: true,
      trim: true, // 좌우 공백 제거
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    // not required
    ratings: {
      type: Number,
      default: 0,
    },
    images: {
      type: [
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
      // required: true,
    },
    // images: {
    //   type: Array,
    //   required: true,
    // },
    reviews: {
      type: [
        {
          User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          images: {
            type: [
              {
                url: {
                  type: String,
                },
              },
            ],
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // Below is Old Properties
    // content: {
    //   type: String,
    //   required: true,
    // },
    // checked: {
    //   type: Boolean,
    //   default: false,
    // },
    // inStock: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true }
);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
