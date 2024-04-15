import coolsms from 'coolsms-node-sdk'
import admin from "firebase-admin"
import axios from 'axios';
import dotenv from "dotenv";
import serviceAccount from "../admin.json" assert { type: "json" }
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
dotenv.config();

const snsServices = {
    test: async (body) => { //문자메세징
        try{
            const mysms = coolsms.default;
            const messageService = new mysms(process.env.COOL1,process.env.COOL2);
            const result = await messageService.sendOne({
                to: `010-7756-9490`,
                from : process.env.PHONE,
                text : `카톡으로 알려주세용`
            })

            console.log(result);
            return "성공";
        }catch(err){
            console.log(err)
            return " 에러"
        }
        
    },
    test2: async (body) => { //카카오 위치정보 
        try{
            const apiKey = 'YOUR_KAKAO_API_KEY'; // 발급 받은 Kakao API 키 입력

            // 좌표 (위도와 경도)
            const latitude = 37.16308;
            const longitude = 127.0620; 
            // const response = await axios.get(`http://dapi.kakao.com/v2/local/search/keyword.json?y=37.14596&x=127.0672&radius=2000&query=%EC%86%8C%EB%B0%A9%EC%84%9C`, {
            // headers: {
            //     Authorization: `KakaoAK ${process.env.KAKAO}`,
            // },
            // });
            const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?y=37.14596&x=127.0672`, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO}`,
            },
            });
            console.log(response.data)
            return "성공"
        }catch(err){
            console.log(err)
            return "에러"
        }
    },
    test3: async (body) => { //nfc 메세지
        console.log(process.env.FCM)
        let message = {
            notification: {
                title: "사용자",
                body: "test",
            },
            token: process.env.FCM
        }
        try{
            await admin.messaging().send(message);
            return {sc:200}
        }catch(err){
            return {sc:400}
        }
    }
    
}

export default snsServices;
