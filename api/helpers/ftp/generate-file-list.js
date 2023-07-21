const ftp = require('basic-ftp');
module.exports = {


  friendlyName: 'Generate file list',


  description: '',


  inputs: {
    configDir: {
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


  fn: async function ({configDir}, exits) {
    // TODO
    const client = new ftp.Client();
    await client.access({
      host: "app.advansoftware.shop",
      user: "admin",
      password: "278663",
      secure: false
  });
    let newFileArray = [];
    for(let files of await sails.helpers.ftp.listDir(configDir)){
      
      let primaryList = await client.list(files.dir);
      let filesList = primaryList.filter((list)=> list.type === ftp.FileType.File);
      for(let returnFile of filesList){
        let fileSize = await sails.helpers.bytesToSize(returnFile.size);
        let getExtension = returnFile.name.split('.');
        newFileArray.push({dir:files.dir, name: returnFile.name,fileSize, extension: getExtension[getExtension.length - 1].toLocaleLowerCase()})
      }
    }
    return exits.success(newFileArray);
  }


};

