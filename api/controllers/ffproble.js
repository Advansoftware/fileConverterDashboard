const ffprobe = require('@joshyour/ffprobe-client');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const command = ffmpeg();
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
    let name = './S01E01.avi';
    let output = './S01E01.mp4';
    var secret = this.req.param('secret');
    try {
     let item =  await FileStatus.findOrCreate({ name: name }, { 
        name,
        status: 0,
        progress: 0,
      });
     let teste = await sails.helpers.generateThumbnail.with({
        videoPath: item.name,
      });
      sails.log('teste',teste)
      return;
      let roomName = `conversion`;
      sails.sockets.join(this.req, roomName);
      let pr = item;
      if(item) {
        
        ffmpeg(item.name).format('mp4').output(output).on('end', async() => {
          pr = await FileStatus.updateOne({ name: item.name })
          .set({
            status: 1,
            newName: output,
            progress: 100
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
          .set({
            progress: total
          });
          FileStatus.publish([pr.id], {
            progress: pr.progress,
            theSecret: secret,
          });
        }).run();
        
        
        FileStatus.subscribe(this.req,[pr.id]);
        
    }
    return exits.success('start conversion');
    return;
      
      
      return exits.success('start conversion');
      /* let data = [];
      fs.readdir('../Animes/Dragon Ball Z/Season 01/', (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach(async(file) => {
          if (file.endsWith('.avi')) {
            let ffprobeResult = await ffprobe('../Animes/Dragon Ball Z/Season 01/'+file, 'utf8');
            data.push({[file]: ffprobeResult});
          }
        });
      }); */
     // await corvertAviToMp4();

      // make sure you set the correct path to your input and output files

      function corvertAviToMp4 (){
        
        
        sails.log('entrou');
        return new Promise((resolve,reject)=>{
         
        });
      }
      
      return exits.success('start conversion');
    } catch (err) {
      console.error(err);
    }
    // All done.


  }


};
