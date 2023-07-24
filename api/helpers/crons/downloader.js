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
  
    let verify = await InsertFiles.count({status: 'progress'});
    let verifyFFmpeg = await FileStatus.count({status:'converting'});
    let verifyConverted = await InsertFiles.count({status: 'done'});
    let files = await sails.helpers.searchFiles.with({
      dir: 'download/',
    });
    
    if(verify===0 && verifyFFmpeg===0 && verifyConverted === 0 && files.length===0){
      
    for( let fileDonwload of await InsertFiles.find({status: 'new'}).limit(1)){

          let newName = fileDonwload.name.replace(/\s/g, '_');
          //await client.cd();
          await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
          status: 2
          });

          client.trackProgress(async(info) => {
            await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
              bytesDowloaded: info.bytesOverall
              });
          })

          await client.downloadTo('download/'+newName, fileDonwload.dir+'/'+fileDonwload.name)
      

      client.trackProgress()
      
      await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
        status: 'done'
      });
    }
    }
    client.close()
    return exits.success();

    }catch(err){
      console.log(err)
    }
  }


};

