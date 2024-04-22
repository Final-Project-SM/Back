import sqlUser from "../db/sqlUser.js"
import sqlNfc from "../db/sqlNfc.js"
const nfcService = {
    insertNfc: async(body) => {
        const response = await sqlNfc.inserNfc(body)
        if (response){
            return {sc:200}
        }else{
            return {sc:400}
        }
    },
    updateNfc: async(body) => {
        
    },
    deleteNfc: async(body) => {
        const response = await sqlNfc.deleteNfc(body.id)
        if (response){
            return {sc:200}
        }else{
            return {sc:400}
        }
    },
    listNfc: async(body) => {
        const response = await sqlNfc.listNfc(body.id);
        console.log(response)
        if (response){
            return {response,sc:200}
        }else{
            return {sc:400}
        }
    }
}
export default nfcService;