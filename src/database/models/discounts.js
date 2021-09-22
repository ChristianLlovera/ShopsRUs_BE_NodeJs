import {DataTypes} from  'sequelize'
import sequelize from './index'

const discounts = sequelize.define("discounts", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    percent: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

},{timestamps: false})

export default discounts
