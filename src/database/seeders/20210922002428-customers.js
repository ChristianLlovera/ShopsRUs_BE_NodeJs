export default {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('customers', [
      {
        name: 'Jhon Doe',
        discounts: JSON.stringify(["employee"]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dalma Shimaru',
        discounts: JSON.stringify(["affiliate","employee"]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jesus Llovera',
        discounts: JSON.stringify(["affiliate"]),
        createdAt: '2019-09-21 21:40:52.821-04',
        updatedAt: '2019-09-21 21:40:52.821-04'
      },
      {
        name: 'Engel Rojas',
        discounts: JSON.stringify([]),
        createdAt: '2019-09-21 21:40:52.821-04',
        updatedAt: '2019-09-21 21:40:52.821-04'
      },
      {
        name: 'Nicole Moreno',
        discounts: JSON.stringify([]),
        createdAt: '2021-09-21 21:40:52.821-04',
        updatedAt: '2021-09-21 21:40:52.821-04'
      }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  }

};
