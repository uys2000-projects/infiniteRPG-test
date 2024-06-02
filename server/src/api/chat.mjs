import { Router } from "express";

import get from "./chat/get.mjs";
import post from "./chat/post.mjs";

const router = Router();

router.get("/", get);
router.post("/", post);

export default router;
