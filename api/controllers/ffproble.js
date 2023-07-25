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
    let listToConverter = await FileStatus.findOne({ status: 'converting' });
    
    if(listToConverter){
      let thumbFile = listToConverter.dir + listToConverter.thumbnail;
      let generateThumbnail = await fs.readFileSync(thumbFile, 'base64');
  
      FileStatus.subscribe(this.req, [listToConverter.id]);
      FileStatus.publish(([listToConverter.id]), {
        progress: listToConverter.progress,
        thumbnail: generateThumbnail,
      })
    }
   
   
    exits.success(FileStatus);
  }catch(err){
    console.error(err)
  }
  return;
  }
};
