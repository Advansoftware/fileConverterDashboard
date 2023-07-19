const ffprobe = require('@joshyour/ffprobe-client');
module.exports = {


  friendlyName: 'File info',


  description: '',


  inputs: {
    pathDir: {
      description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      type: 'string',
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({pathDir}, exits) {
    // TODO
    try{
      let ffprobeResult = await ffprobe(pathDir, 'utf8');
      return exits.success(ffprobeResult);
    }catch(err){
      console.error(err);
      return;
    }
  }


};

