const ftp = require('basic-ftp');
let fs = require('fs');
module.exports = {


  friendlyName: 'Uploader',


  description: 'Uploader ftp.',


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
  
    let verify = await InsertFiles.count({status: 'uploading'});
    let verifyFFmpeg = await FileStatus.count({status:'converting'});
    let verifyConverted = await InsertFiles.count({status: 'done'});
    let files = await sails.helpers.searchFiles.with({
      dir: 'download/',
    });
    if(verify===0 && verifyFFmpeg===0 && verifyConverted === 0 && files.length>0){
      
    for( let fileUpload of await InsertFiles.find({status: 'converted'}).limit(1)){

          let newName = fileUpload.name.replace(/\s/g, '_');
          await InsertFiles.updateOne({name:fileUpload.name, dir:  fileUpload.dir}).set({
          status: 'uploading',
          });

          client.trackProgress(async(info) => {
            let progressUpload =  ((100 * info.bytesOverall) / fileUpload.bytes).toFixed(2);
            await InsertFiles.updateOne({name:fileUpload.name, dir:  fileUpload.dir}).set({
              bytesUploaded: info.bytesOverall,
              progressUpload
              });
          })
          await client.uploadFrom('download/'+newName, fileUpload.dir+'/'+fileUpload.name)

      client.trackProgress()
      
      await InsertFiles.updateOne({name:fileUpload.name, dir: fileUpload.dir}).set({
        status: 'uploaded'
      });
      let moutdir = 'download/'+newName;
      await FileStatus.updateOne({ name: moutdir }, {
        status: 'uploaded',
      });
      
      let format = moutdir.split('.');
      let thumbnailFormat =  moutdir.name.replace(format[format.length - 1], 'png');
      let outputFormat =  moutdir.name.replace(format[format.length - 1], 'mp4');

      let filesDeletation = [thumbnailFormat,outputFormat,moutdir];

      filesDeletation.forEach(file=>{
        fs.rm(file, (err) => {
          if(err){
              // File deletion failed
              console.error(err.message);
              return;
          }
          console.log("File deleted successfully");
            
      })
      })
      
      
    }
    }
    client.close()
    return exits.success();

    }catch(err){
      console.log(err)
    }
  }


};

