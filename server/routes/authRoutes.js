import express from 'express';

import { signUp,logIn,logOut,allUsers } from '../controllers/authControllers.js';

import {auth , authAdmin} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/signup",signUp);
router.post("/login",logIn);
router.post("/logout",logOut);
router.get("/all-users",auth,authAdmin,allUsers);


export default router;