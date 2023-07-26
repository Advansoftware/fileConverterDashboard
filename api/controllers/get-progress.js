module.exports = {


  friendlyName: 'Get progress',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      description: 'All done.'
    },
  },


  fn: async function (inputs, exits) {

    try{
      let listAllFilesInsert = await InsertFiles.find();
      let listAllConverted = await FileStatus.find();
      let totalDownload = await InsertFiles.count({ status: 'new' });
      let totalUpload = await InsertFiles.count({ status: 'uploaded' });
      let totalFiles = await InsertFiles.count({});
      /* if(listToConverter){
         thumbFile = listToConverter.dir + listToConverter.thumbnail;
          generateThumbnail = await fs.readFileSync(thumbFile, 'base64');
      } */
      return exits.success({
        totalDownload,
        totalUpload, 
        totalFiles, 
        statisticsItems: [totalDownload,totalUpload,totalFiles],
        listAllFilesInsert, 
        listAllConverted
      });

    }catch(err){
      console.error(err)
    }
  }


};
