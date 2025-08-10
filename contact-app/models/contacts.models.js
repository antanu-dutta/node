import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const contactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

contactSchema.plugin(mongoosePaginate);

export const Contact = mongoose.model("Contact", contactSchema);
