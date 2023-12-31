/**
 * InsertFiles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    name: {
      type: 'string',
      required: true,
      example: 'teste'
    },
    dir: {
      type: 'string',
      required: true,
      example: 'teste'
    },
    fileSize: {
      type: 'string',
      example: 'teste'
    },
    extension: {
      type: 'string',
      required: true,
      example: 'teste'
    },
    status: {
      type: 'string',
      example: 'progress'
    },
    bytes: {
      type: 'number',
      example: 1
    },
    bytesDowloaded: {
      type: 'number',
      example: 1
    },
    bytesUploaded: {
      type: 'number',
      example: 1
    },
    progressUpload: {
      type: 'number',
      example: 1
    },
    progressDownload: {
      type: 'number',
      example: 1
    },
  },

};

