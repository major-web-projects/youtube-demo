import Category from "../CategoryModel.js";
import categoryData from "./category.data.js";
import config from "../../config/index.js";

config.mongodbConnect(config.mongoURI);

Promise.all(
  categoryData.map(async (item) => {
    await Category.create(item).catch((err) => console.log(err.message));
  })
).then(() => {
  console.log("Finished");
  process.exit(1);
});
