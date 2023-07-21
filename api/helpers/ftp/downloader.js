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
    console.log('entrou aqui')
    const client = new ftp.Client();
    try{
      //client.ftp.verbose = true;
      await client.access({
        host: "app.advansoftware.shop",
        user: "admin",
        password: "278663",
        secure: false
    });


    let fileDonwload  = await InsertFiles.findOne({status: 0});

    let newName = fileDonwload.name.replace(/\s/g, '_');
    await client.cd(fileDonwload.dir);
    client.trackProgress(info => console.log(info.bytesOverall))
    await client.downloadTo(newName, fileDonwload.name)
    
    
    client.trackProgress()
    client.close()
    return exits.success(fileDonwload);

    }catch(err){
      console.log(err)
    }
  }


};

