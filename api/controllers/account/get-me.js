module.exports = {

  friendlyName: 'Get me',

  description: '',

  inputs: {},

  exits: {
    success: {
      description: 'All done.'
    },
    internalServerError: {
      description: 'Internal server error.'
    },
    userNotFound: {
      description: 'User not found'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const { userId } = this.req.session;
      
      let userAdmin = await User.findOne({ id: userId });
      if (!userAdmin) {
        return {error: 'User not Found'};
      }

      return exits.success(userAdmin);

    } catch (error) {
      exits.internalServerError(error);
    }

  }
};
