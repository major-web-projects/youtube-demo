import ErrorHelper from "../helpers/errorHelper.js";
import imageHelper from "../helpers/imageHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import ListingModel from "../models/ListingModel.js";
import fs from "fs/promises";

import { google } from "googleapis";
import config from "../config/index.js";
const service = google.youtube({
  version: "v3",
  auth: config.googleApiKey,
});

const search = catchAsyncErrors(async (req, res, next) => {
  const myCustomLabels = {
    totalDocs: "totalListings",
    docs: "listings",
  };

  const options = {
    page: 1,
    limit: 10,
    sort: "-updatedAt",
    customLabels: myCustomLabels,
  };

  const paginator = await ListingModel.paginate({}, options);
  const listings = paginator.listings;
  delete paginator.listings;

  res.json({
    status: "ok",
    listings,
    meta: paginator,
  });
});

function cleanObj(object) {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === "object") {
      cleanObj(v);
    }
    if (
      (v && typeof v === "object" && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v === ""
    ) {
      if (Array.isArray(object)) {
        object.splice(k, 1);
      } else {
        delete object[k];
      }
    }
  });
  return object;
}
// /api/listings/search?keyoword=i&price[gt]=1000&sort[price]=desc&sort[ratingsAverage]=asc
const list = catchAsyncErrors(async (req, res, next) => {
  const { keyword, price, sort, limit, page, status, category } = req.query;

  // query
  let queryObj = cleanObj({ ...req.query });
  let exclude = ["page", "sort", "limit", "fields"];
  exclude.forEach((el) => delete queryObj[el]);

  // replace
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // toOject
  queryObj = JSON.parse(queryStr);

  const myCustomLabels = {
    totalDocs: "totalListings",
    docs: "listings",
  };

  const options = {
    page: page || 1,
    limit: limit || 12,
    sort: sort ? sort : { updatedAt: "desc" },
    customLabels: myCustomLabels,
  };

  if (keyword) {
    // query["$text"] = { $search: keyword };
    queryObj.name = { $regex: keyword, $options: "i" };
    delete queryObj["keyword"];
  }

  // filter categories
  if (category) {
    queryObj.category = { $in: category };
  }

  // if (!status) {
  //   queryObj.status = "active";
  // }

  console.log(queryObj);
  const paginator = await ListingModel.paginate(queryObj, options);
  const listings = paginator.listings;
  delete paginator.listings;

  res.json({
    status: "ok",
    listings,
    meta: paginator,
  });
});

const create = catchAsyncErrors(async (req, res, next) => {
  const userId = req.auth._id;
  const {
    channelId,
    etag,
    name,
    description,
    publishedAt,
    thumbnails,
    country,
    viewCount,
    subscriberCount,
    hiddenSubscriberCount,
    videoCount,
    price,
    category,
  } = req.body;

  console.log(req.body);

  let listing = new ListingModel({
    channelId,
    etag,
    name,
    description,
    publishedAt,
    thumbnails,
    country,
    viewCount,
    subscriberCount,
    hiddenSubscriberCount,
    videoCount,
    price,
    category,
    user: userId,
  });

  listing = await listing.save();

  res.json({ status: "ok", listing });
});

const listingById = catchAsyncErrors(async (req, res, next) => {
  const listingId = req.params.listingId;
  const listing = await ListingModel.findById(listingId);

  if (!listing) {
    return next(new ErrorHelper("Listing not found", 404));
  }
  req.listing = listing;
  return next();
});

const listingBySlug = catchAsyncErrors(async (req, res, next) => {
  const slug = req.params.slug;
  const listing = await ListingModel.findOne({ slug });

  if (!listing) {
    return next(new ErrorHelper("Listing not found", 404));
  }
  res.json({ status: "ok", listing });
});

const read = catchAsyncErrors(async (req, res, next) => {
  const listing = req.listing;
  res.json({ status: "ok", listing });
});

const update = catchAsyncErrors(async (req, res, next) => {
  const listingId = req.params.listingId;
  const { name, description, price, category, subs, status } = req.body;

  const listingData = {
    name,
    description,
    price,
    category,
    status,
    subs,
  };

  console.log(subs);

  let listing = await ListingModel.findByIdAndUpdate(listingId, listingData, {
    new: true,
  });

  let image = await imageHelper.resizeSingleImage(req);
  console.log(image);
  if (listing.image && listing.image.url) {
    let oldAvatar = process.cwd() + "/public" + listing.image.url;
    let defaultPic =
      process.cwd() + "/public/images/defaults/missing_listing.png";
    // 'profile_pic' is the name of our file input field in the HTML form

    // Display uploaded image for user validation'
    if (oldAvatar !== defaultPic) {
      await fs.unlink(oldAvatar).catch((err) => {
        console.log("File not found");
      });
    }
  }

  if (image) {
    listing.image = image;
  }

  listing = await listing.save();

  res.json({ status: "ok", listing });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const listingId = req.params.listingId;
  const listing = await ListingModel.findByIdAndRemove(listingId);
  if (!listing) {
    return next(new ErrorHelper("Listing not found", 404));
  }
  res.json({ status: "ok", listing });
});

const upload = catchAsyncErrors(async (req, res, next) => {
  const userId = req.auth._id;
  const listingId = req.params.listingId;
  const images = await imageHelper.resizeMultipleImages(req);
  console.log(images);
  let listing = await ListingModel.findOneAndUpdate(
    { _id: listingId },
    { $push: { images: images } },
    { new: true }
  );

  res.json({ status: "ok", listing });
});

const uploadCoverImage = catchAsyncErrors(async (req, res, next) => {
  const listingId = req.params.listingId;
  let listing = await ListingModel.findOneAndUpdate(
    { _id: listingId },
    { coverimage: req.image },
    { new: true }
  );
  res.json({ status: "ok", listing });
});

const removeImage = catchAsyncErrors(async (req, res, next) => {
  const listingId = req.params.listingId;
  const image = req.image;
  console.log("Listing", req.image);
  let listing = await ListingModel.findOneAndUpdate(
    { _id: listingId },
    { $pull: { images: image._id } },
    { new: true }
  );
  return res.json({ status: "ok", listing });
});

const related = catchAsyncErrors(async (req, res, next) => {
  const listing = req.listing;
  const listings = await ListingModel.find({
    _id: { $ne: listing._id },
    category: listing.category,
  })
    .limit(4)
    .exec();

  res.json({
    status: "ok",
    listings,
  });
});

// Like a post
const like = catchAsyncErrors(async (req, res, next) => {
  const listing = req.listing;
  const user = req.auth;
  const isLiked =
    listing.likes.filter((id) => id.toString() === user._id.toString).length >
    0;

  if (isLiked) {
  }

  await listing.likes.unshift(user._id);
  await listing.save();
  res.json({
    status: "ok",
    like,
  });
});

// /api/listings/search?keyoword=i&price[gt]=1000&sort[price]=desc&sort[ratingsAverage]=asc
const currentUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.auth._id;
  const { keyword, price, sort, limit, page, subs, status } = req.query;

  // query
  let queryObj = cleanObj({ ...req.query });
  let exclude = ["page", "sort", "limit", "fields"];
  exclude.forEach((el) => delete queryObj[el]);

  // replace
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // toOject
  queryObj = JSON.parse(queryStr);

  const myCustomLabels = {
    totalDocs: "totalListings",
    docs: "listings",
  };

  const options = {
    page: page || 1,
    limit: limit || 12,
    sort: sort ? sort : { updatedAt: "desc" },
    customLabels: myCustomLabels,
  };

  if (keyword) {
    // query["$text"] = { $search: keyword };
    queryObj.name = { $regex: keyword, $options: "i" };
    delete queryObj["keyword"];
  }

  if (subs) {
    // query["$text"] = { $search: keyword };
    queryObj.subs = { $in: subs };
    // delete queryObj["subs"];
  }

  queryObj.user = userId;
  const paginator = await ListingModel.paginate(queryObj, options);
  const listings = paginator.listings;
  delete paginator.listings;

  res.json({
    status: "ok",
    listings,
    meta: paginator,
  });
});

// Like a post
const searchYouTubeChannel = catchAsyncErrors(async (req, res, next) => {
  const { keyword, channelSearchType } = req.body;

  const searchData = {
    part: "snippet, contentDetails, statistics",
  };

  if (channelSearchType === "forUsername") {
    searchData.forUsername = keyword;
  }

  if (channelSearchType === "id") {
    searchData.id = keyword;
  }
  console.log(searchData);
  service.channels.list(searchData, function (err, response) {
    if (err) {
      console.log("The API returned an error: " + err);
      return;
    }
    let channels = response.data.items;
    if (channels.length == 0) {
      console.log("No channel found.");
    } else {
      channels = channels.map((item) => ({
        channelId: item.id,
        etag: item.etag,
        customUrl: item.customUrl,
        name: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        country: item.snippet.country,
        viewCount: item.statistics.viewCount,
        subscriberCount: item.statistics.subscriberCount,
        hiddenSubscriberCount: item.statistics.hiddenSubscriberCount,
        videoCount: item.statistics.videoCount,
      }));
      res.json({
        status: "ok",
        channels,
      });
    }
  });
});

export default {
  create,
  list,
  listingById,
  listingBySlug,
  read,
  update,
  remove,
  upload,
  removeImage,
  uploadCoverImage,
  search,
  related,
  like,
  currentUser,
  searchYouTubeChannel,
};
