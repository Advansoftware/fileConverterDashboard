const ftp = require('basic-ftp');
module.exports = {


  friendlyName: 'List dir',


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


  fn: async function ({configDir},exits) {
    // TODO
    try{
      const client = new ftp.Client();
      //client.ftp.verbose = true;
      await client.access({
        host: "app.advansoftware.shop",
        user: "admin",
        password: "278663",
        secure: false
    });
   

      let result = '';
      let list =[];
      //verifica dir
      let primaryList = await client.list(configDir);
      let filterPrimary = primaryList.filter(list => list.type=== ftp.FileType.Directory);

      //percorre todo os diretorios
      for(let dirName of filterPrimary){
        result = configDir+'/'+dirName.name;
          await client.cd(result);
          let secundaryList = await client.list();
          let filterSecundary = secundaryList.filter(list => list.type=== ftp.FileType.Directory);

          for(let teste of filterSecundary){
            list.push({dir: result+'/'+teste.name});
            await client.cdup();
          }
          await client.cdup();
      }
      client.close()
      return exits.success(list);
    }catch(err){
      console.error(err)
    }
    
     
  }


};

