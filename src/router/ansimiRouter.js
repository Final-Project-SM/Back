import  express  from "express"; 
import ansimiController from "../controller/ansimiController.js"

const router = express.Router();

router.post(
    "/",
    ansimiController.ansimi
)

router.post(
    "/history",
    ansimiController.ansimiHistory
)


export default router;