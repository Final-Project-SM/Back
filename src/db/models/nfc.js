import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Nfcs extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

Nfcs.init(
    {
        seq : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },

        id : {
            type: DataTypes.STRING(60),
            allowNull : false
        },

        nfcid : {
            type: DataTypes.STRING(45),
            allowNull:true
        },
        nfcname : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        create_at : {
            type : 'TIMESTAMP',
            defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull : false
        },

        expired_at : {
            type : 'TIMESTAMP',
            allowNull : true
        }

    },

    {
        sequelize,
        modelName : "Nfcs",
        tableName : "nfc",
        timestamps : false
    }
)