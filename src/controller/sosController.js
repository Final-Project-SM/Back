import sosServices from "../services/sosServices.js";

const snsController = {
    sos: async (req, res) => {
        try{
            console.log(req.query.param1,req.query.param2)
            //const response = await sosServices.test2();
            //console.log(response)
            return res.json("성공");
        }catch(err){
            return err;
        }
    }
}

export default snsController;