import { Router } from "express";
import { uploadProfileImage } from "../middleware/upload.middleware.js";
import { authenticatedUser, logUserIn, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = new Router();

router.post("/auth/register", uploadProfileImage, registerUser);

router.post( '/auth/login', logUserIn );

router.get( '/auth/user', authMiddleware, authenticatedUser );

export const appRouter = router;