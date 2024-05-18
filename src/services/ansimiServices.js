import sqlUser from "../db/sqlUser.js"
import sqlAnsimis from "../db/sqlAnsimi.js"
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const ansimiService = {
    ansimi: async(body) => {
        const kakao = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?y=${body.lat}&x=${body.lon}&input_coord=WGS84`, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO}`,
            },
            });
            const locationData = kakao.data.documents[0].road_address? kakao.data.documents[0].road_address : kakao.data.documents[0].address
            body.location = locationData.address_name
            const response = await sqlAnsimis.inserAnsimis(body)
        if (response){
            return {sc:200}
        }else{
            return {sc:400}
        }
    },
    ansimiHistory: async(body) => {
        const response = await sqlAnsimis.getDate(body.id)
        for(let i = 0;i<response.length;i++){
            const history = await sqlAnsimis.history(response[i].date,body.id)
            response[i] = {...response[i],locations:history}
        }
        return response
    }
    
}
export default ansimiService;