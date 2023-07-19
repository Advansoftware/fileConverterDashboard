const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
module.exports = {


  friendlyName: 'Ffproble',


  description: 'Ffproble something.',


  inputs: {

  },


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
    let secret = this.req.param('secret');
  try{
    let listToConverter = await FileStatus.find({ where: { status: 0 }, limit: 1});
    let isRunning = await sails.helpers.verifyFfmpeg();
    
   
    if(!isRunning){
     
    }

   /*  FileStatus.subscribe(this.req,[listToConverter.id]);

    FileStatus.publish([listToConverter.id], {
      progress: pr.progress,
      thumbnail: generateThumbnail,
      theSecret: secret,
    }) */
    exits.success();
  }catch(err){
    console.error(err)
  }
  return;
  }
};
