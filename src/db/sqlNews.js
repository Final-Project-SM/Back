import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";
import { News } from "./models/news.js";

const news = {
    listNews: async () => {
        const news = await News.findAll({
            attributes:['title','url'],
            limit: 5, // 최신순으로 2개 제한
            order: [['create_at', 'DESC']], // createdAt 필드를 기준으로 내림차순 정렬
            raw:true});
        return news;
    },

};

export default news;