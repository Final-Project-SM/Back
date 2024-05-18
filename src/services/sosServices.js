import coolsms from 'coolsms-node-sdk'
import sqlSos from "../db/sqlSos.js"
import sqlUser from '../db/sqlUser.js';
import sqlLog from "../db/sqlLog.js"
import sqlNfc from '../db/sqlNfc.js';
import sqlFcm from "../db/sqlFcm.js"
import admin from "firebase-admin"
import axios from 'axios';
import dotenv from "dotenv";
import serviceAccount from "../admin.json" assert { type: "json" }
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
dotenv.config();

const snsServices = {
    sosMessaging: async (id,lat,lon,text) => { //문자메세징
        const sos = await sqlSos.listSos(id)
        console.log(id,lat,lon)
        const name = await sqlUser.getName(sos[0].id)
        const msg = text? `${name.name}님이 보낸 메세지 \n ` + text : `${name.name} 님의 도움 요청 메세지에요 연락주세요 \n https://www.google.com/maps?q=${lat},${lon}`;
        console.log(msg)
        for (let i=0 ; i<sos.length ;i++){ //qr찍어 
            console.log(sos[i].phone)

        
            try{
                // const mysms = coolsms.default;
                // const messageService = new mysms(process.env.COOL1,process.env.COOL2);
                // const result = await messageService.sendOne({
                //     to: sos[i].phone,
                //     from : process.env.PHONE,
                //     text : msg
                // })
                // console.log(result);
            }catch(err){
                console.log(err)
                return {sc:400}
            }
        }
        return {sc:200}
        
    },
    locationInfo: async (lat,lon,uid) => { //카카오 위치정보 
        try{ //id location region1 region2 region3 lat lon   address_name  region_1depth_name

            const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?y=${lat}&x=${lon}&input_coord=WGS84`, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO}`,
            },
            });
            console.log(response.data.documents[0])
            const locationData = response.data.documents[0].road_address? response.data.documents[0].road_address : response.data.documents[0].address
            const log = {
                id:uid,
                location:locationData.address_name,
                region1:locationData.region_1depth_name,
                region2:locationData.region_2depth_name,
                region3:locationData.region_3depth_name,
                lat:lat,
                lon:lon
            }
            await sqlLog.insertLog(log)
            return response.data
        }catch(err){
            console.log(err)
            return "에러"
        }
    },
    fcmMessaging: async (id,type) => { //nfc 메세지
        console.log(process.env.FCM)
        console.log("타입 : ",type)
        const token = await sqlFcm.findByFcm(id)
        if(token){
            let message = {
                notification: {
                    title: "nfc",
                    body: "Tag!",
                    
                },
                data:{
                    type:String(type)
                },
                token: token.fcm
            }
        
            try{
                await admin.messaging().send(message);
                return {sc:200}
            }catch(err){
                console.log(err)
                return {sc:400}
            }
        }
        
    },
    changeSos: async (body) => {
        await sqlSos.deleteSos(body.id)
        for (let i = 0; i< body.sos.length; i++){
            console.log(typeof(body.sos[i]))
            body.sos[i].id = body.id
            console.log(body.sos[i])
            await sqlSos.inserSos(body.sos[i])

        }
    },
    listSos: async (body) => {
        const list = await sqlSos.listSos(body.id)
        console.log(list)
        if(list.length != 0 ){
            return {sc:200,data:list}
        }else{
            return {sc:400}
        }
    },
    sos: async (param1,param2,lat,lon,type) => {
        //p1 nfc 이름 p2 안드로이드 id 
        const nfc = await sqlNfc.findByNfc(param1)

        if(nfc){
            const uid = await sqlUser.findByAndroidId(param2,nfc.id)
            console.log(uid)
            if(uid){
                
                await snsServices.sosMessaging(uid.id,lat,lon)
                console.log(lat,lon,uid.id)
                await snsServices.locationInfo(lat,lon,uid.id)
                await snsServices.fcmMessaging(uid.id,type)
                return {sc:200}
            }else{
                return {sc:400}
            }
            
        }else{
            return {sc:400}
        }
    }
    
}

export default snsServices;
