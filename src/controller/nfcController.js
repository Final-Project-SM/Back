import nfcService from "../services/nfcServices.js"
const nfcController = {
    insertNfc: async (req,res) => {
        try{
            const response = await nfcService.insertNfc(req.body);
            return res.json(response)
        }catch(err){
            return res.json({sc:400})
        }
    },
    updateNfc: async (req,res) => {
        try{
            const response = await nfcService.updateNfc(req.body);
            return res.json(response)
        }catch(err){
            return res.json({sc:400})
        }
    }, 
    deleteNfc: async (req,res) => {
        try{
            const response = await nfcService.deleteNfc(req.body);
            return res.json(response)
        }catch(err){
            return res.json({sc:400})
        }
    },
    listNfc: async (req,res) => {
        try{
            const response = await nfcService.listNfc(req.body);
            return res.json(response)
        }catch(err){
            return res.json({sc:400})
        }
    },
}
export default nfcController;