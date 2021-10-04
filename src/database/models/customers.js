import {DataTypes} from  'sequelize'
import sequelize from './index'
import invoices from './invoices'

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

customers.hasMany(invoices, {foreingKey:'customerId',sourceKey:'id'})
invoices.belongsTo(customers, {foreignKey: 'customerId', targetKey: 'id'})

export default customers
