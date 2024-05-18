import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Keywords } from "./models/keyword.js";
//변경전 
const sqlKeyword = {
    inserKeyword: async (info) => {
        const keyword = await Keywords.create(info);
        return keyword;
    },

    deleteKeyword: async (uid) => {
        const keyword = await Keywords.update({expired_at:Sequelize.literal("NOW()")},{where:{id:uid}})
        return keyword;
    },

    listKeyword: async (uid) => {
        const keyword = await Keywords.findAll({where:{id:uid,expired_at:null},raw:true})
        return keyword 
    }

};

export default sqlKeyword;