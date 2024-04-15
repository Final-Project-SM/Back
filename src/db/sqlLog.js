import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Logs } from "./models/log.js";

const Log = {
    insertLog: async (info) => {
        const log = await Logs.create(info);
        return log;
    },
    listLog: async (uid) => {
        const log = await Logs.findAll({where:{id:uid},raw:true})
        return log;
    }
};

export default Log;