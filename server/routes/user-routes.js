import { Router } from "express";
import { getAllUsers } from "../controllers/user-controllers";

const userRoughter = Router();

userRoughter.get("/", getAllUsers);

export default userRoughter;