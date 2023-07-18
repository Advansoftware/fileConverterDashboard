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
    try {
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
      await corvertAviToMp4();

      // make sure you set the correct path to your input and output files

      function corvertAviToMp4 (){
        let input = '../Animes/Dragon Ball Z/Season 01/S01E01.avi';
        let output = '../Animes/Dragon Ball Z/Season 01/S01E01.mp4';
        sails.log('entrou');
        return new Promise((resolve,reject)=>{
          ffmpeg(input).format('mp4').output(output).on('end', () => {
            return resolve();
          }).on('error', (err) => {
            return reject(err);
          }).on('progress', (progress) => {
            sails.log(progress.percent.toFixed(2));
            /*  let roomName = `conversion${_.deburr(this.req.sessionID)}`;
        sails.sockets.join(this.req, roomName);

        sails.sockets.broadcast(roomName, {porcent: progresstotal}); */
          });
        });
      }
      return exits.success('start conversion');
    } catch (err) {
      console.error(err);
    }
    // All done.


  }


};
