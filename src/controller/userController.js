import userService from "../services/userServices.js";
const userController = {
    login: async (req,res) => {
        try{
            const response = await userService.login(req.body);
            return res.json(response)
        }catch(err){
            return res.json("실패")
        }
    },

    signUp: async (req,res) => {
        try{
            const response = await userService.signUp(req.body);
            return res.json(response)
        }catch(err){
            return res.json("실패")
        }
    },

    changeUser: async (req,res) => {
        try{
            const response = await userService.changeUser(req.body);
            return res.json("성공")
        }catch(err){
            return res.json("실패")
        }
    },

    changeSos: async (req,res) => {
        try{
            const response = await userService.changeSos(req.body);
            return res.json("성공")
        }catch(err){
            return res.json("실패")
        }
    }
};

export default userController;