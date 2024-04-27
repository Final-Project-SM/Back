import express from "express";
import sosController from "../controller/sosController.js"
const router = express.Router();

router.get(
    "/",
    sosController.sos
)

router.post(
    "/help",
    sosController.emergency
)

router.post(
    "/list",
    sosController.listSos
)
export default router;