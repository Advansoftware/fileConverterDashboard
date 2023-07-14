module.exports = {


  friendlyName: 'Get list',


  description: '',


  inputs: {
    limit:{
      type: 'number',
    },
    offset:{
      type: 'number',
    }

  },


  exits: {
    error:{
      statusCode: 500
    }

  },


  fn: async function ({limit, offset},exits) {
    try {
      const list = await Portal.find({limit,skip:offset}).sort('name ASC');
      return exits.success(list);
    } catch (error) {
      return exits.error(error)
    }

    // All done.
    

  }


};
