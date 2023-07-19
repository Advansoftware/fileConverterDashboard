const fs = require('fs');
module.exports = {


  friendlyName: 'Search files',


  description: '',


  inputs: {
    dir: {
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


  fn: async function ({dir}, exits) {
    // TODO
    try{

      let data = [];
      fs.readdir(dir, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach((file) => {
          if (file.endsWith('.avi')) {
            data.push({dir, name: file});
          }
        });
      }); 
      return exits.success({data})
    }catch(err){
      console.error(err)
    }
  
  }


};

