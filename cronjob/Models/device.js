const { DataTypes } = require('sequelize');
const sequelize = require('./model');

const Device = sequelize.define('Devices', {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    defaultValue: 'defaultUser',
  },
  battery: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  community: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now,
  }
});

module.exports = Device;