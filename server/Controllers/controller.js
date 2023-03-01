const Topics = require('../Models/emc')

const topicsController = {

  //POST REQUEST /topic
  postTopic: async (ctx) => {
    try {
      const { content } = ctx.request.body;
      if (!content) throw new Error('Content is required but not provided');
      const newTopic = await Topics.create({ content });
      ctx.status = 201;
      ctx.body = { error: false, message: 'Topic created successfully', data: newTopic};
    } catch (error) {
      console.log('BIG ERROR AT CONTROLLER BRO', error);
      if (error.message === 'Content is required but not provided') {
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

  //GET REQUEST /topic
  getAllTopics: async (ctx) => {
    try {
      const topics = await Topics.findAll();
      // if (!topics.length) {
      //   throw new Error ('No Topics were found');
      // }
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'Topics retrieved succesfully',
        data: topics,
      }
    } catch (error) {
      console.log('ERROR AT getAllTopics on Controller : '. error)
      ctx.status = 500;
      ctx.body = {
        error: true,
        message: 'Internal server error',
        data: null,
      }
    }
  },

  //PUT REQUEST aka UPDATE /topic/:id/:direction
  updateTopic: async (ctx) => {
    try {
      const { id, direction } = ctx.params;
      const score = direction === 'up' ? 1 : -1;
      const topicToUpdate = await Topics.findByPk(id); //find by PrimaryKey
      if (!topicToUpdate) throw new Error('Topic not found');
      const updatedTopic = await topicToUpdate.increment({ score });
      if (!updatedTopic.dataValues) throw new Error('Topic not updated');
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'Topic updated successfully',
        data: updatedTopic.dataValues,
      }
    } catch (error) {
      console.log('ERROR at updateTopic on Controller : ', error);
      if (error.message === 'Topic not found') {
        ctx.status = 404;
        ctx.body = {
          error: true,
          message: 'Cant find topic',
          data: null,
        }
      } else if (error.message === 'Topic not updated') {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'cant update topic',
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

  //DELETE /topic/:id
  deleteTopic: async (ctx) => {
    try {
      const { id } = ctx.params;
      const confirm = await Topics.destroy({
        where: { id } //KEY = id & VALUE = value.of.id
      });
      if (!confirm) throw new Error('No topic found to delete.') //confirm = the number of element deleted
      ctx.status = 200;
      ctx.body = {
        error: false,
        message: `${confirm} topic(s) deleted`,
        data: null,
      };
    } catch (error) {
      console.log('ERROR at deleteTopic on Controller : ', error);
      if (error.message === 'No topic found to delete') {
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
          message: 'Internal error',
          data: null,
        }
      }
    }
  }
}



module.exports = topicsController;
