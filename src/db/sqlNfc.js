import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { Nfcs } from "./models/nfc.js";
//변경전 
const sqlnfc = {
    inserNfc: async (info) => {
        const nfc = await Nfcs.create(info);
        return nfc;
    },
    updateNfc: async (uid,nfc) => {
        //const user = await Users.update({fcm:token},{where:{id:`${uid}`}});
        return user;
    },
    deleteNfc: async (uid) => {
        const nfc = await Nfcs.update({expired_at:Sequelize.literal("NOW()")},{where:{id:uid}})
        return nfc;
    },
    listNfc: async (uid) => {
        const nfc = await Nfcs.findAll({where:{id:uid,expired_at: null},raw:true})
        return nfc;
    },
    findByNfc: async (nfcid) => {
        const nfc = await Nfcs.findOne({attributes:['id'],where:{nfcid:nfcid},raw:true})
        return nfc
    }
};

export default sqlnfc;