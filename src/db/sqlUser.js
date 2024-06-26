import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Users } from "./models/user.js";
//변경전 
const sqlUser = {
    login: async (info) => {
        const user = await Users.findOne({where:{id: `${info}`,expired_at: null},raw:true});
        return user;
    },
    signUp: async (info) => {
        const user = await Users.create(info);
        return user;
    },

    checkId: async (info) => {
        const user = await Users.findOne({attributes:['id'],where:{id: `${info}`},raw:true});
        return user;
    },

    updateFcm: async (id,token) => {
        const user = await Users.update({fcm:token},{where:{id:id}})
        return user;
    },
    changeUser: async (info) => {
        const user = await Users.update({name:info.name,password:info.password},{where:{id:info.id},raw:true})
        return user
    },
    updateLocation: async (id,location) => {
        const user = await Users.update({location:location},{where:{id:id}})
        return user;
    },

    findByAndroidId: async (uuid,uid) => {
        const user = await Users.findOne({attributes:['id'],where:{pid:uuid,id:uid},raw:true});
        return user;
    },

    deletePhone: async (info) => {
        return ; 
    },

    getName: async (id) => {
        const user = await Users.findOne({attributes:['name'],where:{id:id},raw:true})
        return user;
    },

    getPhone: async (id) => {
        const user = await Users.findOne({attributes:['phone'],where:{id:id},raw:true})
        return user;
    },

    findFollowerInfo: async (id) => {
        const user = await Users.findOne({attributes:['id','name','phone'],where:{id:id},raw:true})
        return user;
    },

    getUserInfo: async (id) => {
        const user = await Users.findOne({attributes:['name','gender','phone',[Sequelize.literal(`YEAR(CURDATE()) - YEAR(age) - (RIGHT(CURDATE(), 5) < RIGHT(age, 5))`), 'age']],where:{id:id},raw:true})
        return user;
    }

};

export default sqlUser;