const db = require('./connection');
const { Fountain, User } = require('../models');

db.once('open', async () => {
  await Fountain.deleteMany();

  const fountains = await Fountain.insertMany([
    { address: "6001 Menchaca Rd, Austin, TX 78745",
      },
  ]);
})