const Devices = require('../Models/device')
const snmp = require ("net-snmp");
const getIndividualDeviceDatabase = require('../Models/individualDeviceData');
const { Op } = require("sequelize");

const PMVController = {
  getLiveData: async (ctx) => {
    try {
      const { id } = ctx.params;
      const device = await Devices.findByPk(id);
      if(!device) throw new Error('PMV NOT FOUND IN DATABASE')
      data = await getSNMP(device.dataValues.ip, device.dataValues.port, device.dataValues.community);
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'PMV liveData acquired successfully',
        data: data,
      }
    } catch (error) {
      console.log('ERROR at getLiveData PMV Controller : ', error);
      if (error.message === 'PMV NOT FOUND IN DATABASE') {
        ctx.status = 404;
        ctx.body = {
          error: true,
          message: 'Cant find device',
          data: null,
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Internal error',
          data: null,
        }
      }
    }
  },
  getPastData: async (ctx) => {
    try {
      const { id, date } = ctx.params;
      const deviceData = getIndividualDeviceDatabase(id, 'pmv')
      if(!deviceData) throw new Error('PMV PAST DATA NOT FOUND IN DATABASE')
      const data = await deviceData.findAll({
        where: {
          createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(new Date() - Number(date) * 24 * 60 * 60 * 1000)
          }
        }
      })
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'PMV past Data acquired successfully',
        data: data,
      }
    } catch (error) {
      console.log('ERROR at getLiveData PMV Controller : ', error);
      if (error.message === 'PMV PAST DATA NOT FOUND IN DATABASE') {
        ctx.status = 404;
        ctx.body = {
          error: true,
          message: 'Cant find device data database',
          data: null,
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Internal error',
          data: null,
        }
      }
    }
  }
}

async function getSNMP (ip, port, community) {
  return new Promise((resolve, reject) => {
    const options = {
      port: port,
      retries: 1,
      timeout: 5000,
      backoff: 1.0,
      transport: "udp4",
      trapPort: 162,
      version: snmp.Version1,
      backwardsGetNexts: true,
      reportOidMismatchErrors: false,
      idBitsSize: 32
    };

    const pmvData = {
      voltage: '',
      photocell: '',
      message: '',
    }
    const obj = {
      '1.3.6.1.4.1.1206.4.2.3.9.8.1.0': '',
      '1.3.6.1.4.1.1206.4.2.3.7.3.0': '',
      '1.3.6.1.4.1.1206.4.2.3.5.8.1.3.3.1': '',
    }


  // PMV OIDS :
  // 1.3.6.1.4.1.1206.4.2.3.9.8.1.0 = VOLTAGE
  // 1.3.6.1.4.1.1206.4.2.3.7.3.0 = PHOTOCELL RESISTANCE (LED INTENSITY)
  // 1.3.6.1.4.1.1206.4.2.3.5.8.1.3.3.1 = MESSAGE DISPLAYED

    const session = snmp.createSession (ip, community, options);
    var oids = [ "1.3.6.1.4.1.1206.4.2.3.9.8.1.0", "1.3.6.1.4.1.1206.4.2.3.7.3.0", "1.3.6.1.4.1.1206.4.2.3.5.8.1.3.3.1"];

    session.get (oids, function (error, varbinds) {
      if (error) {
        return reject(error)
      } else {
        for (var i = 0; i < varbinds.length; i++) {
          if (snmp.isVarbindError (varbinds[i])) {
            console.error (snmp.varbindError (varbinds[i]));
          } else {
            obj[varbinds[i].oid] = varbinds[i].value.toString();
          }
        }
      }
      session.close ();
      pmvData.voltage = obj['1.3.6.1.4.1.1206.4.2.3.9.8.1.0'].slice(0, -2) + '.' + obj['1.3.6.1.4.1.1206.4.2.3.9.8.1.0'].slice(-2);
      pmvData.photocell = obj['1.3.6.1.4.1.1206.4.2.3.7.3.0'];
      pmvData.message = obj['1.3.6.1.4.1.1206.4.2.3.5.8.1.3.3.1'].slice(28);
      return resolve(pmvData)
    })
    session.trap (snmp.TrapType.LinkDown, function (error) {
      if (error) {
        console.error (error);
      }
    });
  })
}

module.exports = PMVController;