import * as express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../../controllers/usercontroller";

const router = express.Router();

router.get("/user", getUser);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
