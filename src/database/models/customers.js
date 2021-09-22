import {DataTypes} from  'sequelize'
import sequelize from './index'

const customers = sequelize.define("customers", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    discounts: DataTypes.JSON,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

},{timestamps: false})

export default customers
