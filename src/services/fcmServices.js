import sqlFcm from "../db/sqlFcm.js"
import sqlUser from "../db/sqlUser.js";
const fcmService = {
    updateFcm: async(body) => {
        const user = await sqlUser.checkId(body.id)
        if(user){
            try{
                const updateToken = await sqlFcm.updateFcm(body.id,body.fcm,body.pid);
                return{sc:"200"}
            }catch{
                return {sc:"400"}
            }
        }else{
            return {sc:"400"}
        }
    }
}
export default fcmService;