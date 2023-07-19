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
    try {

      let files = await sails.helpers.searchFiles.with({
        dir: './',
      });
      
      for(let file of await files.data){

        let moutdir = file.dir + file.name;

        let thumbnail = await sails.helpers.generateThumbnail.with({
          videoPath: file.name,
        });
        let info = await sails.helpers.fileInfo.with({
          path: file.dir,
          file: file.name,
        });
        
        let item =  await FileStatus.findOrCreate({ name: moutdir }, { 
          name: moutdir,
          status: 0,
          progress: 0,
          thumbnail,
          info,
        });

        let pr = item;
        let generateThumbnail = await fs.readFileSync(item.thumbnail, 'base64');
        
        if(item) {
          
          let format = moutdir.split('.');
          let output = moutdir.replace(format[format.length - 1], "mp4");

          ffmpeg(moutdir).format('mp4').output(output).on('end', async() => {
            pr = await FileStatus.updateOne({ name: item.name })
            .set({
              status: 1,
              newName: output,
              progress: 100,
              thumbnail: ''
            });
            console.log(pr);
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
  
            FileStatus.publish([pr.id], {
              progress: pr.progress,
              thumbnail: generateThumbnail,
              theSecret: secret,
            });
          }).run();
  
          FileStatus.subscribe(this.req,[pr.id]);
      }
      }

   
      let getThumb = await fs.readFileSync(item.thumbnail, 'base64');
      let roomName = `conversion`;
      sails.sockets.join(this.req, roomName);
    
     
      
      return exits.success('start conversion');
    } catch (err) {
      console.error(err);
    }
    // All done.


  }


};
