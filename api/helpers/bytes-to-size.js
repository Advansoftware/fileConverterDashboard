/* eslint-disable no-restricted-properties */
const bytesToSize = (bytes, decimals = 2) => {
 
};

const ffprobe = require('@joshyour/ffprobe-client');
module.exports = {


  friendlyName: 'Bytes To Size',


  description: '',


  inputs: {
    bytes: {
      description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      type: 'string',
      required: true
    },
    decimals: {
      description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      type: 'number',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({bytes, decimals = 2}, exits) {
    // TODO
    if (bytes === 0) {
      return '0 Bytes';
    }
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return exits.success(`${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`);
  }


};

