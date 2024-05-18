import { Sequelize,Op  } from "sequelize";
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
    },

    getDate: async (id) => {
        const ansimi = await Ansimis.findAll({
            attributes: [
              [sequelize.fn('DATE', sequelize.col('create_at')), 'date']
            ],
            where: {
              id: id
            },
            group: [sequelize.fn('DATE', sequelize.col('create_at'))]
            ,raw:true});
        return ansimi 
    },
    history: async (date,id) => {
        const ansimi = await Ansimis.findAll({
            attributes: ['seq', 'lat', 'lon'],
            where: {
              id:id,
              [Op.and]: [
                sequelize.where(sequelize.fn('DATE', sequelize.col('create_at')), date)
              ]
            }
            ,raw:true});
        return ansimi
    }

};

export default sqlAnsimis;