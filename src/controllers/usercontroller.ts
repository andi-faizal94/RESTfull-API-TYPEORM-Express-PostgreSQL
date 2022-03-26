import * as express from "express";
import { User } from "../entity/User";

export const createUser = async (
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
    const user = User.create({
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

export const getUser = async (
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

export const getUserById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id: id } = req.params;

    const UserById = await User.findOne(Number(id));
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

export const updateUser = async (
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

    await User.update(Number(id), {
      firstName: firstName,
      lastName: lastName,
      age: age,
      addres: addres,
    });
    const user = await User.find({
      id: Number(id),
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
export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id: id } = req.params;
    const user = await User.find({
      id: Number(id),
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
