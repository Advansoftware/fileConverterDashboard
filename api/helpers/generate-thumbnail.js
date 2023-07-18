const ffmpeg = require ('fluent-ffmpeg');
const ffmpeg_static = require ('ffmpeg-static');
module.exports = {


  friendlyName: 'Generate thumbnail',


  description: '',


  inputs: {
    videoPath: {
      description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      type: 'string',
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({videoPath}, exits) {
  const thumbnail_path = "thumbnail.png";
    console.log(videoPath)
    ffmpeg.setFfmpegPath (ffmpeg_static);
    // Criar uma miniatura no segundo 10 do vídeo
    ffmpeg ('./S01E01.avi')
    .on ('end', function () {
    return exits.success('Miniatura criada com sucesso'); 
    })
    .on ('error', function (err) {
      console.error(err);
    })
    .screenshots ({
    timestamps: [10],
    filename: thumbnail_path,
    folder: process.cwd()+'/'
    });

    
  }


};

