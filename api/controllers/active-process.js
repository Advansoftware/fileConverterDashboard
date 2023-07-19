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
      let files = await sails.helpers.searchFiles.with({
        dir: './',
      });

      for(let file of await files){

        let moutdir = file.dir + file.name;

        let info = await sails.helpers.fileInfo.with({
          pathDir: moutdir,
        });

        await FileStatus.findOrCreate({ name: moutdir }, {
          name: moutdir,
          dir: file.dir,
          status: 0,
          progress: 0,
          info,
        });
      }
      let getAll = await FileStatus.find();

      return exits.success(getAll);
    }catch(err){
      console.error(err);
    }
  }
};
