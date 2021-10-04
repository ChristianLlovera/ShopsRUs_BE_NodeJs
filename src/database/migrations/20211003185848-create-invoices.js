export default {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'customers'
          },
          key: 'id'
        },
        allowNull: false
      },
      items:{
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoices');
  }

}