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
    let listToConverter = await FileStatus.find({ where: { status: 0 }});
    let isRunning = await sails.helpers.verifyFfmpeg();
    
   
    if(!isRunning){
      await FileStatus.update({status:2})
      .set({status:0, progress: 0}).fetch();
    }

    for(let fileConverter of await listToConverter){
      
      let verifyProgress = await FileStatus.count({ where: { status: 2 }});

      let pr = fileConverter;
      FileStatus.subscribe(this.req,[pr.id]);

      if(verifyProgress===0 && !isRunning){

        let thumbFile = fileConverter.dir+fileConverter.thumbnail;
        let format = fileConverter.name.split('.');
        let videoFormat = fileConverter.name.replace(format[format.length - 1], 'mp4');

        let generateThumbnail = await fs.readFileSync(thumbFile, 'base64');
      ffmpeg(fileConverter.name).format('mp4').output(videoFormat).on('end', async() => {
        pr = await FileStatus.updateOne({ name: fileConverter.name })
            .set({
              status: 1,
              newName: output,
              progress: 100,
              thumbnail: ''
            });
      }).on('error', async(err) => {
        pr = await FileStatus.updateOne({ name: fileConverter.name })
            .set({
              status: 3,
              errorMenssage: err,
            });
        console.log('errr', err);
      }).on('progress',async (progress) => {
        total = progress.percent ? progress.percent.toFixed(2) : 0;
        pr = await FileStatus.updateOne({ name: fileConverter.name })
            .set({status: 2, progress: total});
        //envia dados atraves do websocket
        FileStatus.publish([pr.id], {
          progress: pr.progress,
          thumbnail: generateThumbnail,
          theSecret: secret,
        });
      }).run();
      //registra o usuario na sala do websocket
      
    }

  }
  }catch(err){
    console.error(err)
  }
  return;
  }
};
