const { DataTypes } = require('sequelize');
const sequelize = require('./model');

function getIndividualDeviceDatabase (id, type) {
  if (type === 'pmv') {
    return sequelize.define('DeviceN' + id, {
      voltage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      photocell: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      }
    });
  } else {
    return sequelize.define('DeviceN' + id, {
      voltage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      charge: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      load: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      }
    });
  }
}

module.exports = getIndividualDeviceDatabase;