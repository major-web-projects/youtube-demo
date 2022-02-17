import faker from "faker";
import User from "../UserModel.js";
import config from "../../config/index.js";
config.mongodbConnect(config.mongoURI);

const usersData = Array.from({ length: 20 }, (x, i) => i).map((id) => ({
  name: faker.name.firstName(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: `majorars${id}@gmail.com`,
  password: "majorars",
  avatar: {
    url: faker.image.imageUrl(),
  },
}));

Promise.all(
  usersData.map(async (item) => {
    await User.create(item).catch((err) => console.log(err.message));
  })
).then(() => {
  process.exit(1);
});
