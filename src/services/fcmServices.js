import sqlUser from "../db/sqlUser.js"
const fcmService = {
    updateFcm: async(body) => {
        const user = await sqlUser.checkId(body.id)
        if(user){
            try{
                const updateToken = await sqlUser.updateFcm(body.id,body.fcm);
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