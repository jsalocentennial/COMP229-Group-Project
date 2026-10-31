

import express from 'express';
import { createUser, getAllUsers, getUserById, deleteUser, updateUser, logInUser,  } from '../controllers/user-controller.js';


const router = express.Router();

// REST API routes for user management
//READs
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/login", logInUser);

//CREATE
router.post("/", createUser);

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

export default router;