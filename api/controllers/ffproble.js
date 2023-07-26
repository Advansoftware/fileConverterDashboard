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
    let thumbnail = '';
  try{
    let listToConverter = await FileStatus.findOne({ status: 'converting' });
    
    if(listToConverter){
      let thumbFile = listToConverter.dir + listToConverter.thumbnail;
      let generateThumbnail = await fs.readFileSync(thumbFile, 'base64');
  
     /*  FileStatus.subscribe(this.req, [listToConverter.id]);
      FileStatus.publish(([listToConverter.id]), {
        progress: listToConverter.progress,
        thumbnail: generateThumbnail,
      }) */
      thumbnail = 'data:image/png;base64,'+generateThumbnail;
    }
   
   
    exits.success({listToConverter, thumbnail});
  }catch(err){
    console.error(err)
  }
  return;
  }
};
