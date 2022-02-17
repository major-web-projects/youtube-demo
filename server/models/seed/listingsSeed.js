import Category from "../CategoryModel.js";
import User from "../UserModel.js";
import Listing from "../ListingModel.js";
import faker from "faker";
import config from "../../config/index.js";
config.mongodbConnect(config.mongoURI);

const generateUsers = async () => {
  await Listing.deleteMany();
  let categories = await Category.find();
  let user = await User.findOne({ email: "majorars@gmail.com" });

  if (!user) {
    user = await User.create({
      name: faker.name.firstName(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: `majorars@gmail.com`,
      password: "majorars",
      avatar: {
        url: faker.image.imageUrl(),
      },
    }).catch((err) => console.log(err.message));
  }

  let status = ["active", "pending", "expired", "archived"];
  const listings = [...Array(100).keys()].map(() => {
    let category = categories[Math.floor(Math.random() * categories.length)];

    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: category._id,
      user,
      status: status[Math.floor(Math.random() * status.length)],
      channelId: faker.random.uuid(),
      etag: faker.random.uuid(),
      publishedAt: faker.date.past(2),
      thumbnails: {
        medium: { url: "/images/defaults/missing_listing.png" },
      },
      country: "US",
      viewCount: Math.floor(Math.random() * 10000),
      subscriberCount: Math.floor(Math.random() * 10000),
      videoCount: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 10000),
    };
  });

  return listings;
};

let listingData = await generateUsers();

Promise.all(
  listingData.map(async (item) => {
    await Listing.create(item).catch((err) => console.log(err.message));
  })
).then(() => {
  process.exit(1);
});
