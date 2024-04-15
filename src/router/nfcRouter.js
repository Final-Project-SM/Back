import  express  from "express"; 
import nfcController from "../controller/nfcController.js"

const router = express.Router();

router.post(
    "/insert",
    nfcController.insertNfc
);

router.post(
    "/update",
    nfcController.updateNfc
);

router.post(
    "/delete",
    nfcController.deleteNfc
);


export default router;