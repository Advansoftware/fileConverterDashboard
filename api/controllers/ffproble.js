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
    return;
    if(item) {
      let pr = item;
      let generateThumbnail = await fs.readFileSync(item.thumbnail, 'base64');
      ffmpeg(moutdir).format('mp4').output(videoFormat).on('end', async() => {
        pr = await FileStatus.updateOne({ name: item.name })
            .set({
              status: 1,
              newName: output,
              progress: 100,
              thumbnail: ''
            });
      }).on('error', async(err) => {
        pr = await FileStatus.updateOne({ name: item.name })
            .set({
              status: 2,
              errorMenssage: err,
            });
        console.log('errr', err);
      }).on('progress',async (progress) => {
        total = progress.percent ? progress.percent.toFixed(2) : 0;
        pr = await FileStatus.updateOne({ name: item.name })
            .set({progress: total});
        //envia dados atraves do websocket
        FileStatus.publish([pr.id], {
          progress: pr.progress,
          thumbnail: generateThumbnail,
          theSecret: secret,
        });
      }).run();
      //registra o usuario na sala do websocket
      FileStatus.subscribe(this.req,[pr.id]);
    }
  }
};
