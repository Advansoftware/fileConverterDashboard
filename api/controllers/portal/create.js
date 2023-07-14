module.exports = {


  friendlyName: 'Create',


  description: 'Create portal.',


  inputs: {
    name:{
      type: 'string',
      required:true
    },
    url:{
      type: 'string',
      required:true
    },
    emailsToCall:{
      type:'string',
      required:true
    },
    cellphonesToCall:{
      type:'string'
    }

  },


  exits: {

  },


  fn: async function ({name, url, emailsToCall, cellphonesToCall}, exits) {

    try {
      await Portal.create({name, url, emailsToCall, cellphonesToCall});
    } catch (error) {
      
    }

    // All done.
    return exits.success();

  }


};
