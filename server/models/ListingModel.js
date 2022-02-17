import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
import mongoosePaginate from "mongoose-paginate-v2";
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const ListingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      text: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      text: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
    },

    channelId: {
      type: String,
      trim: true,
    },
    etag: {
      type: String,
      trim: true,
    },
    publishedAt: {
      type: String,
      trim: true,
    },
    thumbnails: {},
    country: {
      type: String,
      trim: true,
    },
    viewCount: {
      type: String,
      trim: true,
    },
    subscriberCount: {
      type: String,
      trim: true,
    },
    hiddenSubscriberCount: {
      type: Boolean,
      default: false,
    },
    videoCount: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    status: {
      type: String,
      enum: ["active", "pending", "expired", "archived"],
      default: "pending",
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

ListingSchema.index({ name: "text" });
ListingSchema.plugin(mongoosePaginate);

ListingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    model: "User",
    select: "name slug avatar email contacts createdAt",
  }).populate({
    path: "category",
    model: "Category",
    select: "name slug",
  });

  next();
});

export default mongoose.model("Listing", ListingSchema);
