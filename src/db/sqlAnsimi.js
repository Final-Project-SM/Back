import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Ansimis } from "./models/ansimi.js";
//변경전 
const sqlAnsimis = {
    inserAnsimis: async (info) => {
        const ansimi = await Ansimis.create(info);
        return ansimi;
    },

    deleteAnsimis: async (uid) => {
        const ansimi = await Ansimis.update({expired_at:Sequelize.literal("NOW()")},{where:{id:uid}})
        return ansimi;
    },

    ansimi: async (uid) => {
        const ansimi = await Ansimis.findAll({where:{id:uid,expired_at:null},raw:true})
        return ansimi 
    }

};

export default sqlAnsimis;