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

    updateLocation: async (id,location) => {
        const user = await Users.update({location:location},{where:{id:id}})
        return user;
    },

    findByAndroidId: async (uuid) => {
        const user = await Users.findOne({attributes:['id'],where:{pid:uuid},raw:true});
        return user;
    },

    deletePhone: async (info) => {
        return ; 
    }

};

export default sqlUser;