import nfcService from "../services/nfcServices.js"
const nfcController = {
    insertNfc: async (req,res) => {
        try{
            const response = await nfcService.insertNfc(req.body);
            return res.json(response)
        }catch(err){
            return res.json()
        }
    },
    updateNfc: async (req,res) => {
        try{
            const response = await nfcService.updateNfc(req.body);
            return res.json(response)
        }catch(err){
            return res.json()
        }
    }, 
    deleteNfc: async (req,res) => {
        try{
            const response = await nfcService.deleteNfc(req.body);
            return res.json(response)
        }catch(err){
            return res.json()
        }
    },
}
export default nfcController;