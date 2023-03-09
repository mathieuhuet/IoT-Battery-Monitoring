const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, //Log every INSERT into the console (turn off before production)
});

async function bootstrap () {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Problem connecting to the DB: ', error);
  }
}

bootstrap();

module.exports = sequelize;
