import express from "express";
const userRouter = express.Router();
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, getActiveUsers} from "../controllers/users.controller.js";


userRouter.get("/", getAllUsers);   // get all the users
userRouter.get("/getActiveUsers", getActiveUsers);
userRouter.get("/:id", getUserById); // get user by ID

// userRouter.post("/", addUser );  // this is present in auth.router.js ans using that
userRouter.patch("/:id", updateUser);

// userRouter.get("/:id",(req, res) => { res.send({title:`Get user with ID`}) });
// userRouter.get("/:id",(req, res) => { res.send({title:`Get user with ID`}) });

userRouter.delete("/:id", deleteUser);
// userRouter.post("/addSeats", addSeats);





export default userRouter;