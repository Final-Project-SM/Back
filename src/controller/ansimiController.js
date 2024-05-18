import ansimiService from "../services/ansimiServices.js";

const ansimiController = {
    ansimi: async (req,res) => {
        try{
            console.log(req.body)
            const response = await ansimiService.ansimi(req.body)
            return res.json({sc:200});
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    ansimiHistory: async (req,res) => {
        try{
            const response = await ansimiService.ansimiHistory(req.body)
            return res.json({sc:200})
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    }
}
export default ansimiController;