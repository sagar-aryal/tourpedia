import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  tags: [String],
  image: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: new Date().toString(),
  },
});

export default mongoose.model("Tour", tourSchema);
