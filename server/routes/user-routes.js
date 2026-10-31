

import express from 'express';
import { createUser, getAllUsers, getUserById, deleteUser, updateUser, logInUser,  } from '../controllers/user-controller.js';
import authorizationMiddleware from '../middlewares/auth.js';

const router = express.Router();

// REST API routes for user management
//READs
router.get("/", authorizationMiddleware, getAllUsers);            
router.get("/:id", authorizationMiddleware, getUserById);
router.post("/login", logInUser);              //Public route for user login

//CREATE
router.post("/", createUser);                  //Public route for creating a new user

//UPDATE
router.put("/:id", authorizationMiddleware, updateUser);

//DELETE
router.delete("/:id", authorizationMiddleware, deleteUser);

export default router;