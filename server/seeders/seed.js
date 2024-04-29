const db = require('../config/connection');
const { User } = require('../models');
const Fountain = require('../models/Fountain')
const fountainSeeds = require('./demoFountain.json')
const userSeeds = require('./userSeeds.json')

db.once('open', async () => {
  await Fountain.deleteMany({});
  await User.deleteMany({});

  await User.create(userSeeds);
  const technologies = await Fountain.insertMany(fountainSeeds);

  console.log('Technologies seeded!');
  process.exit(0);
});
