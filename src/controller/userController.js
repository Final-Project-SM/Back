import userService from "../services/userServices.js";
const userController = {
    login: async (req,res) => {
        try{
            const response = await userService.login(req.body);
            return res.json(response)
        }catch(err){
            return res.json({sc:400})
        }
    },

    signUp: async (req,res) => {
        try{
            const response = await userService.signUp(req.body);
            return res.json(response)
        }catch(err){
            return res.json({sc:400})
        }
    },

    updateLocation: async (req,res) => {
        try{

        }catch(err){
            return res.json({sc:400})
        }
    },
    changeUser: async (req,res) => {
        try{
            const response = await userService.changeUser(req.body);
            return res.json("성공")
        }catch(err){
            return res.json({sc:400})
        }
    },

    changeSos: async (req,res) => {
        try{
            const response = await userService.changeSos(req.body);
            return res.json("성공")
        }catch(err){
            return res.json({sc:400})
        }
    }
};

export default userController;