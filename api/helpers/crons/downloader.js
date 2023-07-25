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
  
    let verify = await InsertFiles.count({status: 'downloading'});
    let verifyFFmpeg = await FileStatus.count({status:'converting'});
    let verifyDone = await InsertFiles.count({status: 'done'});
    let verifyConverted = await InsertFiles.count({status: 'converted'});
    let verifyUploading = await InsertFiles.count({status: 'uploading'});
    let files = await sails.helpers.searchFiles.with({
      dir: 'download/',
    });

    if(verify===0 && verifyFFmpeg===0 && verifyConverted === 0 && verifyUploading ===0  && verifyDone ===0 && files.length===0){
      
    for( let fileDonwload of await InsertFiles.find({status: 'new'}).limit(1)){

          let newName = fileDonwload.name.replace(/\s/g, '_');
          await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
          status: 'downloading',
          });

          client.trackProgress(async(info) => {
            let progressDownload =  ((100 * info.bytesOverall) / fileDonwload.bytes).toFixed(2);
            await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
              bytesDowloaded: info.bytesOverall,
              progressDownload
              });
          })

          await client.downloadTo('download/'+newName, fileDonwload.dir+'/'+fileDonwload.name)
      

      client.trackProgress()
      
      await InsertFiles.updateOne({name:fileDonwload.name, dir:  fileDonwload.dir}).set({
        status: 'done'
      });
      let moutdir = 'download/'+newName;

      let format = newName.split('.');
      let thumbnailFormat =  newName.replace(format[format.length - 1], 'png');

      let info = await sails.helpers.fileInfo.with({
        pathDir: 'download/'+newName,
      });
      let thumbnail = await sails.helpers.generateThumbnail.with({
        videoPath: moutdir,
        filepath: 'download/',
        thumbnailPath: thumbnailFormat
      });
      await FileStatus.findOrCreate({ name: moutdir }, {
        name: moutdir,
        dir: 'download/',
        status: 'done',
        progress: 0,
        info,
        thumbnail
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

