import next from "next";
import server from "./app.js";
import config from "./config/index.js";
import { globalErrors } from "./middlewares/errorMiddleware.js";

// initialize the server
// app config
const port = config.port;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// mongodb
config.mongodbConnect(config.mongoURI);

// start app
app
  .prepare()
  .then(() => {
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.use(globalErrors);

    server.listen(config.port, (err) => {
      if (err) throw err;
      console.log(
        `> Ready at port:${port} as ${
          dev ? "development" : process.env.NODE_ENV
        }`
      );
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
