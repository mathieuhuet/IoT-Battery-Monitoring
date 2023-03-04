const Devices = require('../Models/device')

const devicesController = {

  //POST REQUEST /device
  postDevice: async (ctx) => {
    try {
      const { data } = ctx.request.body;
      if (!data) throw new Error('Data is required but not provided');
      const newDevice = await Devices.create(data);
      ctx.status = 201;
      ctx.body = { error: false, message: 'Device created successfully', data: newDevice};
    } catch (error) {
      console.log('Error at Devices controller (POST)', error);
      if (error.message === 'Data is required but not provided') {
        ctx.status = 400;
        ctx.body = {
          error: true,
          message: error.message,
          data: null,
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Internal server error',
          data: null,
        }
      }
    }
  },

  //GET REQUEST /device
  getAllDevices: async (ctx) => {
    try {
      const devices = await Devices.findAll();
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'Devices retrieved succesfully',
        data: devices,
      }
    } catch (error) {
      console.log('ERROR AT getAllDevices Controller : '. error)
      ctx.status = 500;
      ctx.body = {
        error: true,
        message: 'Internal server error',
        data: null,
      }
    }
  },

  getSingleDevice: async (ctx) => {
    try {
      const { id } = ctx.params;
      const device = await Devices.findByPk(id);
      if (!device) throw new Error('Device not found');
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'Devices retrieved succesfully',
        data: device,
      }
    } catch (error) {
      console.log('ERROR AT getAllDevices Controller : '. error)
      if (error.message === 'Device not found') {
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
          message: 'Internal Server error',
          data: null,
        }
      }
    }
  },

  //PUT REQUEST aka UPDATE /device/:id/
  updateDevice: async (ctx) => {
    try {
      const { id } = ctx.params;
      const deviceToUpdate = await Devices.findByPk(id); //find by PrimaryKey
      if (!deviceToUpdate) throw new Error('Device not found');
      const updatedDevice = await deviceToUpdate.increment({ score }); //WORK ON THIS LINE MATHIEU TO UPDATE DEVICES
      if (!updatedDevice.dataValues) throw new Error('Device not updated');
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'Device updated successfully',
        data: updatedDevice.dataValues,
      }
    } catch (error) {
      console.log('ERROR at updateDevice Controller : ', error);
      if (error.message === 'Device not found') {
        ctx.status = 404;
        ctx.body = {
          error: true,
          message: 'Cant find device',
          data: null,
        }
      } else if (error.message === 'Device not updated') {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'cant update device',
          data: null,
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Internal Server error',
          data: null,
        }
      }
    }
  },

  //DELETE /device/:id
  deleteDevice: async (ctx) => {
    try {
      const { id } = ctx.params;
      const confirm = await Devices.destroy({
        where: { id } //KEY = id & VALUE = value.of.id
      });
      if (!confirm) throw new Error('No device found to delete.') //confirm = the number of element deleted
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: `${confirm} device(s) deleted`,
        data: null,
      };
    } catch (error) {
      console.log('ERROR at deleteDevice on Controller : ', error);
      if (error.message === 'No device found to delete') {
        ctx.status = 404;
        ctx.body = {
          error: true,
          message: error.message,
          data: null,
        }
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Internal Server error',
          data: null,
        }
      }
    }
  }
}



module.exports = devicesController;
