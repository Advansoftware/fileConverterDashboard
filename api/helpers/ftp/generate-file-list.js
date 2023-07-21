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
    action: {
      description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      type: 'string',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({configDir, action='create'}, exits) {
    // TODO
    const client = new ftp.Client();
    await client.access({
      host: "app.advansoftware.shop",
      user: "admin",
      password: "278663",
      secure: false
  });
    if(action!=='create'){
      await InsertFiles.destroy({});
    }
    let newFileArray = [];
    for(let files of await sails.helpers.ftp.listDir(configDir)){
      let primaryList = await client.list(files.dir);
      let filesList = primaryList.filter((list)=> list.type === ftp.FileType.File);
      for(let returnFile of filesList){
        let fileSize = await sails.helpers.bytesToSize(returnFile.size);
        let getExtension = returnFile.name.split('.');
        let data = await InsertFiles.findOrCreate({ name: returnFile.name, dir:files.dir }, {
          name: returnFile.name,
          dir:files.dir,
          extension: getExtension[getExtension.length - 1].toLocaleLowerCase(),
          fileSize,
          bytes: returnFile.size,
          status: 0,
        });
       
        newFileArray.push(data)
        return;
      }
    }
    client.close()
    return exits.success(newFileArray);
  }


};

