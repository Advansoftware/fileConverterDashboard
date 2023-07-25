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
     
  
    let verify = await InsertFiles.count({status: 'uploading'});
    let verifyFFmpeg = await FileStatus.count({status:'converting'});
    let verifyConverted = await InsertFiles.count({status: 'done'});
    let files = await sails.helpers.searchFiles.with({
      dir: 'download/',
    });
    if(verify===0 && verifyFFmpeg===0 && verifyConverted === 0){
      await client.access({
        host: "app.advansoftware.shop",
        user: "admin",
        password: "278663",
        secure: false
      });
    for( let fileUpload of await InsertFiles.find({status: 'converted'}).limit(1)){
          
          let newName = fileUpload.name.replace(/\s/g, '_');
          let moutdir = 'download/'+newName;
          
          let format = moutdir.split('.');
          
          let thumbnailFormat =  moutdir.replace(format[format.length - 1], 'png');
          let outputFormat =  moutdir.replace(format[format.length - 1], 'mp4');
          
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
          await client.uploadFrom(outputFormat, fileUpload.dir+'/'+fileUpload.name.replace(format[format.length - 1], 'mp4'))

      client.trackProgress()
      
      await InsertFiles.updateOne({name:fileUpload.name, dir: fileUpload.dir}).set({
        status: 'uploaded',
        progressUpload: 100
      });
      
      await FileStatus.updateOne({ name: moutdir }, {
        status: 'uploaded',
      });
      

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

