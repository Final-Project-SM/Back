import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Soss } from "./models/sos.js";
//변경전 
const sqlSos = {
    inserSos: async (info) => {
        const sos = await Soss.create(info);
        return sos;
    },
    updateSos: async (uid,sos) => {
        //const user = await Users.update({fcm:token},{where:{id:`${uid}`}});
        return user;
    },
    deleteSos: async (uid) => {
        const sos = await Soss.update({expired_at:Sequelize.literal("NOW()")},{where:{id:uid}})
        return sos;
    },
    listSos: async (uid) => {
        const sos = await Soss.findAll({where:{id:uid,expired_at: null},raw:true})
        return sos;
    },
    findFollower: async (phone) => {
        const sos = await Soss.findAll({attributes:['id'],where:{phone:phone,expired_at:null},raw:true})
        return sos
    }
};

export default sqlSos;