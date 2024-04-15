import bcrypt from "bcrypt";
import sqlUser from "../db/sqlUser.js"
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
                return {msg: "회원가입 실패"}
            }
        }catch(err){
            console.log(err)
            return {sc:400};
        }
        
    },
    changeUser: async (body) => {
        return {sc:200};
    },
    changeSos: async (body) => {
        return {sc:200};
    },
};

export default userService;