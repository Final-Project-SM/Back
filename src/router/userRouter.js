import express from "express";
import { check } from "express-validator";
import userController from "../controller/userController.js";
const router = express.Router();

router.post(
    "/login",
    userController.login
);

router.post(
    "/signUp",
    userController.signUp
);

router.post(
    "/update",
    userController.changeUser
);

router.post(
    "/changeSos",
    userController.changeSos
);

router.post(
    "/log",
    userController.listLog
);

router.post(
    "/main",
    userController.main
)

router.post(
    "/graph",
    userController.graph
)

router.post(
    "/map",
    userController.map
)

router.post(
    "/keyword",
    userController.keyword
)

router.post(
    "/keyword/list",
    userController.keywordList
)

router.post(
    '/follower',
    userController.follower
)

export default router;