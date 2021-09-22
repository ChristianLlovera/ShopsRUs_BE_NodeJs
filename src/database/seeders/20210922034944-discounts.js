export default {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('discounts', [
      {
        type: 'affiliate',
        percent: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'employee',
        percent:30,
        createdAt: new Date(),
        updatedAt: new Date()
      }

  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('discounts', null, {});
  }

};
