const Devices = require('../Models/device')
var snmp = require ("net-snmp");

const EMCController = {
  getLiveData: async (ctx) => {
    try {
      const { id } = ctx.params;
      const device = await Devices.findByPk(id);
      if(!device) throw new Error('EMC NOT FOUND IN DATABASE')
      data = await getSNMP(device.dataValues.ip, device.dataValues.port, device.dataValues.community);
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'EMC liveData acquired successfully',
        data: data,
      }
    } catch (error) {
      console.log('ERROR at getLiveData EMC Controller : ', error);
      if (error.message === 'EMC NOT FOUND IN DATABASE') {
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

    const emcData = {
      voltage: '',
      temperature: '',
      load: '',
      charge: '',
    }
    const obj = {
      '1.3.6.1.4.1.33333.5.36.0': '',
      '1.3.6.1.4.1.33333.5.40.0': '',
      '1.3.6.1.4.1.33333.5.34.0': '',
      '1.3.6.1.4.1.33333.5.33.0': '',
    }


    // EMC OIDS :
    // 1.3.6.1.4.1.33333.5.36.0 = VOLTAGE
    // 1.3.6.1.4.1.33333.5.40.0 = TEMPERATURE
    // 1.3.6.1.4.1.33333.5.34.0 = LOAD (AMP)
    // 1.3.6.1.4.1.33333.5.33.0 = CHARGE (AMP)

    const session = snmp.createSession (ip, community, options);
    var oids = [ "1.3.6.1.4.1.33333.5.36.0", "1.3.6.1.4.1.33333.5.40.0", "1.3.6.1.4.1.33333.5.34.0", "1.3.6.1.4.1.33333.5.33.0"];

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
      emcData.voltage = obj['1.3.6.1.4.1.33333.5.36.0'];
      emcData.temperature = obj['1.3.6.1.4.1.33333.5.40.0'];
      emcData.load = obj['1.3.6.1.4.1.33333.5.34.0'];
      emcData.charge = obj['1.3.6.1.4.1.33333.5.33.0'];
      return resolve(emcData)
    })
    session.trap (snmp.TrapType.LinkDown, function (error) {
      if (error) {
        console.error (error);
      }
    });
  })
}

module.exports = EMCController;