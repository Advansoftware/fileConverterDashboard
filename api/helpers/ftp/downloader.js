const ftp = require('basic-ftp');
module.exports = {


  friendlyName: 'Downloader',


  description: 'Downloader ftp.',


  inputs: {

  },

  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs, exits) {
    const client = new ftp.Client();
    try{
      //client.ftp.verbose = true;
      await client.access({
        host: "app.advansoftware.shop",
        user: "admin",
        password: "278663",
        secure: false
    });

    for( let fileDonwload of await InsertFiles.find({status: 0})){
      let verify = await InsertFiles.count({status: 1});
      if(verify===0){
          let newName = fileDonwload.name.replace(/\s/g, '_');
          await client.cd(fileDonwload.dir);
          await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
          status: 1
          });
          client.trackProgress(info => console.log(info.bytesOverall))
          await client.downloadTo(newName, fileDonwload.name)
      }
      client.trackProgress()
      
      await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
        status: 2
      });
    }
    client.close()
    return exits.success();

    }catch(err){
      console.log(err)
    }
  }


};

