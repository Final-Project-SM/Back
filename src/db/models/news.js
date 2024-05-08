import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class News extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

News.init(
    {
        seq : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },

        title : {
            type: DataTypes.TEXT,
            allowNull : true
        },

        url : {
            type: DataTypes.TEXT,
            allowNull:true
        },
        create_at : {
            type : 'TIMESTAMP',
            defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull : false
        },


    },

    {
        sequelize,
        modelName : "News",
        tableName : "news",
        timestamps : false
    }
)