import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import index from "../src/routes/index";

async function main() {
  try {
    const connection = await createConnection();
    const app = express();

    app.use(cors());
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
  } catch (e) {
    console.log(e);
  }
}
main();
