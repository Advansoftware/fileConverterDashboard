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
      const ffmpeg = require('fluent-ffmpeg');


      // make sure you set the correct path to your input and output files
      let input = '../Animes/Dragon Ball Z/Season 01/S01E01.avi';
      let output = '../Animes/Dragon Ball Z/Season 01/S01E01.mp4';

      // create a new ffmpeg process
      let proc = await ffmpeg(input)
  // set the output format to mp4
  .format('mp4')
  // set the output file name
  .output(output)
  // handle events
  .on('end', () => {
    console.log('Conversion done');
    return exits.success('Conversion done');
  })
  .on('error', (err) => {
    console.error('Error: ' + err.message);
  }).on('progress', (progress) => {
    // log the progress percentage

    let roomName = `conversion${_.deburr(this.req.sessionID)}`;
    sails.sockets.join(this.req, roomName);
    let progresstotal = progress.percent.toFixed(2);
    sails.sockets.broadcast(roomName, {porcent: progresstotal});
  })
  // run the process
  .run();
      return exits.success('start conversion');
    } catch (err) {
      console.error(err);
    }
    // All done.


  }


};
