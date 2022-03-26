import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import index from "../src/routes/index";

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", index);

    app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.status(404).json({ status: 404, message: "Page not found" });
    });

    app.listen(8080, () => {
      console.log("Server started on port 8080!");
    });
  })
  .catch((error) => console.log(error));
