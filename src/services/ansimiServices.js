import sqlUser from "../db/sqlUser.js"
import sqlAnsimis from "../db/sqlAnsimi.js"
import axios from "axios";
import sqlLog from "../db/sqlLog.js"
import dotenv from "dotenv";
import snsServices from "./sosServices.js";
dotenv.config();
const ansimiService = {
    ansimi: async(body) => { //위험지역들가면 보내는거랑 그 문자메세지 하는것도 추가해야함 
        const kakao = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?y=${body.lat}&x=${body.lon}&input_coord=WGS84`, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO}`,
            },
            });
            const locationData = kakao.data.documents[0].road_address? kakao.data.documents[0].road_address : kakao.data.documents[0].address
            body.location = await locationData.address_name
            const response = await sqlAnsimis.inserAnsimis(body)
            const total = await sqlLog.findByLocation(locationData.address_name)

            console.log(total)
            if(total){
                console.log(body,"안심이")
                await snsServices.sosMessaging(body.id,body.lat,body.lon,`현재 위치 https://www.google.com/maps?q=${body.lat},${body.lon}`)
                return {sc:200,total: total[0]?total[0].total:0}
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