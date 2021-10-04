export default {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('invoices', [
      {
        customerId: 1,
        items: JSON.stringify([
        {
          id:1,
          name:'pizza',
          quantity:3,
          price:20,
          type:'edible'
        },{
          id:2,
          name:'camisa',
          quantity:1,
          price:30,
          type:'normal'
        },{
          id:3,
          name:'laptop',
          quantity:1,
          price:700,
          type:'normal'
        }]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: 2,
        items: JSON.stringify([
        {
          id:4,
          name:'hamburguesa',
          quantity:2,
          price:15,
          type:'edible'
        },{
          id:2,
          name:'camisa',
          quantity:3,
          price:30,
          type:'normal'
        },{
          id:3,
          name:'laptop',
          quantity:1,
          price:700,
          type:'normal'
        }]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: 3,
        items: JSON.stringify([
        {
          id:4,
          name:'hamburguesa',
          quantity:2,
          price:15,
          type:'edible'
        },{
          id:7,
          name:'pantalon',
          quantity:3,
          price:34,
          type:'normal'
        },{
          id:5,
          name:'telefono',
          quantity:1,
          price:320,
          type:'normal'
        }]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: 4,
        items: JSON.stringify([
        {
          id:4,
          name:'hamburguesa',
          quantity:2,
          price:15,
          type:'edible'
        },{
          id:7,
          name:'pantalon',
          quantity:3,
          price:34,
          type:'normal'
        },{
          id:5,
          name:'telefono',
          quantity:1,
          price:320,
          type:'normal'
        }]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customerId: 5,
        items: JSON.stringify([
        {
          id:8,
          name:'hotdog',
          quantity:1,
          price:15,
          type:'edible'
        },{
          id:2,
          name:'camisa',
          quantity:2,
          price:30,
          type:'normal'
        }]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoices', null, {});
  }

}

