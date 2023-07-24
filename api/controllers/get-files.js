module.exports = {


  friendlyName: 'Get files',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      description: 'All done.'
    },
  },


  fn: async function (inputs,exits) {

    // All done.

    try {

      let data = await sails.helpers.searchFiles('./download');

      return exits.success(data);
    } catch (error) {
      console.log(error)
    }
    

  }


};
