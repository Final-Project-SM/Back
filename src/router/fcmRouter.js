import  express  from "express"; 
import fcmController from "../controller/fcmController.js"

const router = express.Router();

router.post(
    "/update",
    fcmController.updateFcm
)


export default router;