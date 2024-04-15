import express from "express";
import sosController from "../controller/sosController.js"
const router = express.Router();

router.get(
    "/",
    sosController.sos
)

export default router;