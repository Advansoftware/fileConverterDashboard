/**
 * FileStatus.js
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

    status: {
      type: 'string',
      example: 'progress'
    },

    newName: {
      type: 'string',
      description: 'The confirmation status of the user\'s email address.',
    },
    thumbnail: {
      type: 'string',
      description: 'A still-unconfirmed email address that this user wants to change to (if relevant).'
    },
    progress: {
      type: 'string',
      description: 'A still-unconfirmed email address that this user wants to change to (if relevant).'
    },
    errorMenssage: {
      type: 'string',
      description: 'A still-unconfirmed email address that this user wants to change to (if relevant).'
    },
    dir: {
      type: 'string',
      description: 'A still-unconfirmed email address that this user wants to change to (if relevant).'
    },
    info: {
      type: 'ref',
      description: 'A still-unconfirmed email address that this user wants to change to (if relevant).'
    },

  },

};

