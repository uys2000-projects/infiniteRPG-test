import { Router } from "express";

import get from "./image/get.mjs";
import post from "./image/post.mjs";

const router = Router();

router.get("/", get);
router.post("/", post);

export default router;
