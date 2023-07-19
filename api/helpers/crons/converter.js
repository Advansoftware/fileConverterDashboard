const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
module.exports = {

  friendlyName: 'Converter',


  description: 'Converter something.',


  inputs: {

  },

  exits: {
    success: {
      description: 'All done.',
    },
    internalServerError: {
      description: 'Internal server error.'
    },

  },

  fn: async function (inputs, exits) {
    // TODO
    try{
      let listToConverter = await FileStatus.find({ where: { status: 0 }}).limit(1);
      let isRunning = await sails.helpers.verifyFfmpeg();
      
      if(!isRunning){
        await FileStatus.update({status:2})
        .set({status:0, progress: 0}).fetch();
      }
      for(let fileConverter of await listToConverter){

        let verifyProgress = await FileStatus.count({ where: { status: 2 }});
        if(verifyProgress===0 && !isRunning){
          let format = fileConverter.name.split('.');
          let videoFormat = fileConverter.name.replace(format[format.length - 1], 'mp4');

          ffmpeg(fileConverter.name).format('mp4').output(videoFormat).on('end', async() => {
            await FileStatus.updateOne({ name: fileConverter.name })
                .set({
                  status: 1,
                  newName: output,
                  progress: 100,
                  
                });
          }).on('error', async(err) => {
            await FileStatus.updateOne({ name: fileConverter.name })
                .set({
                  status: 3,
                  errorMenssage: err,
                });
            console.error('errr', err);
          }).on('progress',async (progress) => {
            total = progress.percent ? progress.percent.toFixed(2) : 0;
            await FileStatus.updateOne({ name: fileConverter.name })
                .set({status: 2, progress: total});
                console.log(total)
          }).run();
        }
      }
      return exits.success();
    }catch(err){
      console.error(err)
    }
  }
};

