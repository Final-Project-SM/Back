import sosServices from "../services/sosServices.js";
import sqlNews from "../db/sqlNews.js"
const snsController = {
    sos: async (req, res) => {
        try{
            //p1 nfc 이름 p2 안드로이드 id 
            console.log(req.query)
            const response = await sosServices.sos(req.query.param1,req.query.param2,req.query.lat,req.query.lon,req.query.type);
            console.log(response)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400});
        }
    },
    //112 119 신고 
    emergency: async (req,res) => {
        try{
            const response = await sosServices.emergency(req.body.id)
            return res.json({sc:200})
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    //비상 연락망 변경 
    changeSos: async (req,res) => { //json 배열형식으로 들어올듯? 리턴도 
        try{
            const response = await sosServices.changeSos(req.body)
            return res.json({sc:200})
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    //비상연락망 리스트 
    listSos: async (req,res) => {
        try{
            const response = await sosServices.listSos(req.body)
            return res.json(response)
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    sns: async (req,res) => {
        try{
            //console.log(req.body)
            const response = await sosServices.sosMessaging(req.body.id,req.body.lat,req.body.lon,req.body.text)
            return res.json(response)
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    


}

export default snsController;