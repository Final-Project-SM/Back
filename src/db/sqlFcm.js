import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Users } from "./models/user.js";

const Fcm = {
    updateFcm: async (uid,token,pid) => {
        const user = await Users.update({fcm:token,pid:pid},{where:{id:uid}})
        return user;
    },
    findByFcm: async (uid) => {
        const user = await Users.findOne({attributes:['fcm'],where:{id: uid},raw:true})
        return user;
    }
};

export default Fcm;