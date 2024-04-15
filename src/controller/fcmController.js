import fcmService from "../services/fcmServices.js";

const fcmController = {
    updateFcm: async (req,res) => {
        try{
            const response = await fcmService.updateFcm(req.body);
            return res.json(response);
        }catch(err){
            return res.json({sc:400})
        }
    }
}
export default fcmController;