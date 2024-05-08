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
    test: async (id) => { //문자메세징
        const sos = await sqlSos.listSos(id)
        console.log(sos)
        for (let i=0 ; i<sos.length ;i++){
            console.log(sos[i].phone)
            //test(sos[i].phone)
        }
        try{
            const mysms = coolsms.default;
            const messageService = new mysms(process.env.COOL1,process.env.COOL2);
            // const result = await messageService.sendOne({
            //     to: phone,
            //     from : process.env.PHONE,
            //     text : `카톡으로 알려주세용`
            // })
            //console.log(result);
            return "성공";
        }catch(err){
            console.log(err)
            return " 에러"
        }
        
    },
    test2: async (lat,lon,uid) => { //카카오 위치정보 
        try{ //id location region1 region2 region3 lat lon   address_name  region_1depth_name
            const apiKey = 'YOUR_KAKAO_API_KEY'; // 발급 받은 Kakao API 키 입력

            // 좌표 (위도와 경도)
            const latitude = 37.16308;
            const longitude = 127.0620; 
            // const response = await axios.get(`http://dapi.kakao.com/v2/local/search/keyword.json?y=37.14596&x=127.0672&radius=2000&query=%EC%86%8C%EB%B0%A9%EC%84%9C`, {
            // headers: {
            //     Authorization: `KakaoAK ${process.env.KAKAO}`,
            // },
            // });
            const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?y=${lat}&x=${lon}`, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO}`,
            },
            });
            const log = {
                id:uid,
                location:response.data.documents[0].address_name,
                region1:response.data.documents[0].region_1depth_name,
                region2:response.data.documents[0].region_2depth_name,
                region3:response.data.documents[0].region_3depth_name,
                lat:lat,
                lon:lon
            }
            await sqlLog.insertLog(log)
            return "성공"
        }catch(err){
            console.log(err)
            return "에러"
        }
    },
    test3: async (id) => { //nfc 메세지
        console.log(process.env.FCM)
        const token = await sqlFcm.findByFcm(id)
        if(token){
            let message = {
                notification: {
                    title: "nfc",
                    body: "Tag!",
                },
                token: token.fcm
            }
            try{
                await admin.messaging().send(message);
                return {sc:200}
            }catch(err){
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
    sos: async (param1,param2,lat,lon) => {
        //p1 nfc 이름 p2 안드로이드 id 
        const nfc = await sqlNfc.findByNfc(param1)
        console.log(nfc)
        if(nfc){
            const uid = await sqlUser.findByAndroidId(param2)
            if(uid.id == nfc.id){
                
                await snsServices.test(uid.id)
                
                console.log(lat,lon,uid.id)
                await snsServices.test2(lat,lon,uid.id)
                await snsServices.test3(uid.id)
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
