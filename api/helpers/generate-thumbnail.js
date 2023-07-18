const ffmpeg = require ('fluent-ffmpeg');
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
    ffmpeg (videoPath)
    .on ('end', function () {
      return exits.success(thumbnail_path); 
    })
    .on ('error', function (err) {
      console.error(err);
    })
    .screenshots ({
    timestamps: [20],
    filename: thumbnail_path,
    folder: process.cwd()+'/'
    });
    return {}; 
    
  }


};

