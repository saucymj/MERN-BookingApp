import { application, Router } from "express";
import { getAllUsers } from "../controllers/user-controllers";

const userRouter = Router();

userRouter.get("/getUsers", getAllUsers);

export default userRouter;

