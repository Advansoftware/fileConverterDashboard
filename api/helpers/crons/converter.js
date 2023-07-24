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
      let listToConverter = await FileStatus.find({ where: { status: 'done' }}).limit(1);
      let isRunning = await sails.helpers.verifyFfmpeg();

      if(!isRunning){
        await FileStatus.update({status:'converting'})
        .set({status:'done', progress: 0}).fetch();
      }
      for(let fileConverter of await listToConverter){

        let verifyProgress = await FileStatus.count({ where: { status: 'converting' }});
        let downloaded = await InsertFiles.count({ status: 'done' });

        if(verifyProgress===0 && !isRunning && downloaded>0){
          let format = fileConverter.name.split('.');
          let videoFormat = fileConverter.name.replace(format[format.length - 1], 'mp4');

          let info = await sails.helpers.fileInfo.with({
            pathDir: fileConverter.name,
          });
          console.log('cheguei aqui meu link sera: ', fileConverter.name)
          ffmpeg(fileConverter.name).format('mp4').videoCodec('libx264').audioCodec('aac').output(videoFormat).on('end', async() => {
            await FileStatus.updateOne({ name: fileConverter.name })
                .set({
                  status: 'converted',
                  newName: videoFormat,
                  progress: 100,
                  info
                });
                await InsertFiles.updateOne({status: 'done'}).set({
                  status: 'converted'
                  });
          }).on('error', async(err) => {
            await FileStatus.updateOne({ name: fileConverter.name })
                .set({
                  status: 'error',
                  errorMenssage: err,
                });
            console.error('errr', err);
          }).on('progress',async (progress) => {
            total = progress.percent ? progress.percent.toFixed(2) : 0;
            await FileStatus.updateOne({ name: fileConverter.name })
                .set({status: 'converting', progress: total});
            await InsertFiles.updateOne({name: fileConverter.name, dir:  fileConverter.dir}).set({
              status: 'converting'
              });
          }).run();
        }
      }
      return exits.success();
    }catch(err){
      console.error(err)
    }
  }
};

