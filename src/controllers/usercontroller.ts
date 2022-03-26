import * as express from "express";
import { User } from "../entity/User";

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const {
      firstName: firstName,
      lastName: lastName,
      age: age,
      addres: addres,
    } = req.body;
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
      addres: addres,
    });
    await user.save();
    return res.status(201).json({
      message: "created user succesfully",
      data: [user],
    });
  } catch (error) {
    next(error);
  }
};

// get all data
export const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const user = await User.find();
    return res.status(200).json({
      message: "get user succesfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// get user by id
export const show = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id: id } = req.params;

    const UserById = await User.findOne(id);
    if (!UserById) {
      throw new Error("it not id");
    }

    return res
      .status(200)
      .json({ message: "get user by id is succesfully", data: UserById });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update user
export const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const {
      firstName: firstName,
      lastName: lastName,
      age: age,
      addres: addres,
    } = req.body;
    const { id: id } = req.params;

    await User.update(id, {
      firstName: firstName,
      lastName: lastName,
      age: age,
      addres: addres,
    });
    const user = await User.find({
      id: id,
    });

    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({
      message: "update user succesfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// delete user
export const destroy = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id: id } = req.params;
    const user = await User.find({
      id: id,
    });

    if (!user) {
      throw new Error("User not found");
    }
    const userId = await User.remove(user);
    return res.status(200).json({
      message: `delete user ${id} succesfully`,
      data: userId,
    });
  } catch (error) {
    next(error);
  }
};
