import { Sequelize,Op} from "sequelize";
import sequelize from "./models/index.js";
import { Logs } from "./models/log.js";

const Log = {
    insertLog: async (info) => {
        const log = await Logs.create(info);
        return log;
    },
    listLog: async (uid) => {
        const log = await Logs.findAll({limit: 10,where:{id:uid},order: [['create_at', 'DESC']] ,raw:true})
        return log;
    },
    graph: async (location) => {
        const log = await Logs.findAll({
            attributes:[
                'region2',
                [Sequelize.fn('COUNT', Sequelize.col('region2')), 'region2_count']
            ],
            where: {
                region1: location,  // 'region1'이 '충청남도'인 경우
            },
            group: 'region2',
            raw:true
        })  
        console.log(log)
        return log; 
    },
    map: async (re1,re2,re3) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const log = await Logs.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('location')), 'seq'],'location','lat', 'lon'], // 조회할 필드 지정
            where: {
                region1: re1,
                region2: re2,
                create_at: {
                    [Op.gte]: oneMonthAgo
                }
            },
            group: ['location']
        ,raw:true});
        return log;
    },
    findByLocation: async (location) => {
        const log = await Logs.findAll({
            attributes: [
              [Sequelize.fn('COUNT', Sequelize.col('location')), 'total']
            ],
            where: {
              location: location
            },
            group: 'location',
            raw: true
          });
      
        return log
    },
    reportInfo: async (id) => {
        const log = await Logs.findOne({attributes:['seq','location','lat','lon','stt','create_at'],where:{id:id},order: [['create_at', 'DESC']],raw:true})
        return log
    }
};

export default Log;