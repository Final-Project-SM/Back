import sosServices from "../services/sosServices.js";

const snsController = {
    sos: async (req, res) => {
        try{
            console.log(req.query.param1,req.query.param2)
            const response = await sosServices.test2();
            return res.json("성공");
        }catch(err){
            return res.json({sc:400});
        }
    },

    emergency: async (req,res) => {
        try{
            console.log("")
            return res.json({sc:200})
        }catch(err){
            return res.json({sc:400})
        }
    },

    insertSos: async (req,res) => { //json 배열형식으로 들어올듯? 리턴도 
        try{
            console.log("")
            return res.json({sc:200})
        }catch(err){
            return res.json({sc:400})
        }
    },

    listSos: async (req,res) => {
        try{
            console.log("")
            return res.json({sc:200})
        }catch(err){
            return res.json({sc:400})
        }
    }
}

export default snsController;