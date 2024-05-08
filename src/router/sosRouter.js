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

router.post(
    "/change",
    sosController.changeSos
)

router.post(
    "/sns",
    sosController.sns
)
export default router;