import bcrypt from "bcrypt";
import sqlUser from "../db/sqlUser.js"
import sqlLog from "../db/sqlLog.js"
import sqlNews from "../db/sqlNews.js"
import sqlSos from "../db/sqlSos.js";
import sqlKeyword from "../db/sqlKeyword.js";
import sqlAnsimis from "../db/sqlAnsimi.js";
const userService = {
    login: async (body) => {
        try{
            console.log("6")
            const login = await sqlUser.login(body.id);
            if(login){
                console.log(login)
                if(await bcrypt.compare(body.password, login.password)){
                    return {sc:200, user:login} //해당유저있음
                }else{
                    return {sc:201} //비밀번호틀림 
                } 
            }else{
                return {sc:202} // 해당유저없음 
            }        
        }catch(err){
            console.log(err)
            return {sc:400};
        };
        
    },
    signUp: async (body) => {
        
        const check = await sqlUser.checkId(body.id);
        console.log(check)
        if(check){
            return {sc:201}
        }
        try{
            const bcryptPassword = await bcrypt.hash(body.password, 10);
            body.password = bcryptPassword; 
            const user = await sqlUser.signUp(body);
            if(user){
                return {sc:200};
            }else{
                return {sc:400}
            }
        }catch(err){
            console.log(err)
            return {sc:400};
        }
        
    },
    updateLocation: async (body) => {
        const user = await sqlUser.checkId(body.id)
        if(user){
            try{
                const updateLocation = await sqlUser.updateFcm(body.id,body.fcm);
                return{sc:"200"}
            }catch{
                return {sc:"400"}
            }
        }else{
            return {sc:"400"}
        }
    },
    changeUser: async (body) => {
        try{
            const bcryptPassword = await bcrypt.hash(body.password, 10);
            body.password = bcryptPassword; 
            await sqlUser.changeUser(body);
            return {sc:200};
        }catch(err){
            return {sc:400}
        }
        
    },
    changeSos: async (body) => {
        return {sc:200};
    },
    listLog: async (body) => {
        const log = await sqlLog.listLog(body.id)
        console.log(log)
        if(log){
            return{sc:200,log:log}
        }else{
            return{sc:400}
        }
    },
    main: async (body) => {
        const news = await sqlNews.listNews();
        const list = await sqlSos.listSos(body.id)
        return {sc:200,news,list}
    },
    graph: async (body) => {
        // 데이터형식 
            // {
            //     labels: ['강남','은평' ]
            //     datasets: [
            //         {
            //             data; [7,10]
            //         }
            //     ]
            // }
        const response = await sqlLog.graph(body.location)
        const labels = []
        const data = []
        if(response.length > 0){
            for(let i = 0; i<response.length;i++){
                labels.push(response[i].region2)
                data.push(response[i].region2_count)
            }
        }else{
            console.log("업센용")
        }
        
        return {sc:200,labels:labels,datasets:[{data:data}]}
    },
    map: async (body) => {
        console.log(body)
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        console.log(formattedDate)
        const response = await sqlLog.map(body.region1,body.region2,body.region3)
        const locations = await sqlAnsimis.history(formattedDate,body.id)
        if(response.length > 0){
            return {sc:200,response,locations}
        }else{
            return {sc:400}
        }
    },
    keyword: async(body) => {
        await sqlKeyword.deleteKeyword(body.id)
        for (let i = 0; i< body.keyword.length; i++){
            await sqlKeyword.inserKeyword({id:body.id,keyword:body.keyword[i]})

        }
    },
    keywordList: async (body) => {
        const keyword = await sqlKeyword.listKeyword(body.id)
        const newKeywords = [] 
        if(keyword){
            
            for (let i = 0 ; i <keyword.length ; i ++ ){
                newKeywords.push(keyword[i].keyword)
            }
            return {sc:200,keyword:newKeywords}
        }
        return {sc:400}
    },
    follower: async (body) => {
        const data = await sqlUser.getPhone(body.id)
        const follower = await sqlSos.findFollower(data.phone)
        const list = []
        for(let i = 0; i< follower.length; i++){
            const followerInfo = await sqlUser.findFollowerInfo(follower[i].id)
            list.push(followerInfo)
            
        }
        return list
    }
};

export default userService;