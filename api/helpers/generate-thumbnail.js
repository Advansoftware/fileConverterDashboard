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
    filepath: {
      description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      type: 'string',
      required: true
    },
    thumbnailPath: {
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


  fn: async function ({videoPath, filepath, thumbnailPath}, exits) {
    ffmpeg (videoPath)
    .on ('end', () => {
      return exits.success(thumbnailPath);
    })
    .on ('error', (err) => {
      console.error(err);
    })
    .screenshots ({
      timestamps: [20],
      filename: thumbnailPath,
      folder: filepath
    });
    return {};

  }


};

