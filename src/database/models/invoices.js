import {DataTypes} from  'sequelize'
import sequelize from './index'
import customers from './customers'

const invoices = sequelize.define("invoices", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      references:{
        model:customers,
        key:'id'
      }
    },
    items: DataTypes.JSON,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

},{timestamps: false})

export default invoices