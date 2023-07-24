module.exports = {


  friendlyName: 'Active process',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      description: 'All done.'
    },
  },


  fn: async function (inputs, exits) {
    try {
      let configDirName = 'Animes'
      await sails.helpers.ftp.generateFileList(configDirName);
  
      let getAll = await FileStatus.find();

      return exits.success(getAll);
    }catch(err){
      console.error(err);
    }
  }
};
