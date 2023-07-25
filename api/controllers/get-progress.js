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
      let thumbFile = '';
      let generateThumbnail = '';
      let listToConverter = await FileStatus.findOne({ status: 'converting' });
      let listAllFilesInsert = await InsertFiles.find();
      let listAllConverted = await FileStatus.find();
      let listDownload = await InsertFiles.findOne({ status: 'downloading' });
      let listUpload = await InsertFiles.findOne({ status: 'uploading' });
      /* if(listToConverter){
         thumbFile = listToConverter.dir + listToConverter.thumbnail;
          generateThumbnail = await fs.readFileSync(thumbFile, 'base64');
      } */
      return exits.success({
       /*  listToConverter,
        listDownload, 
        listUpload,  */
        /* generateThumbnail,  */
        listAllFilesInsert, 
        listAllConverted
      });

    }catch(err){
      console.error(err)
    }
  }


};
