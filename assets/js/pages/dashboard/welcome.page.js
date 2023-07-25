parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: '',
    FileStatus: [],
    pageLoadedAt: Date.now(),
    progressConversion: 0,
    listAllFilesInsert: [],
    listAllConverted: [],
    thumbnail: '',
    sync:false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    _.extend(this, window.SAILS_LOCALS);
  },
  mounted: async function() {
    await this.getData();
    //…
    /* io.socket.get('/api/v1/ffproble');
    await Cloud.on('filestatus', (msg) => {
      this.progressConversion = (msg.progress/100).toFixed(3);
      this.progress = (this.progressConversion.substr(2)/10).toFixed(2)
      this.thumbnail = 'data:image/png;base64,'+msg.thumbnail;
      io.socket.get('/api/v1/ffproble');
    }); */
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    startConversion: async function(){
      try{
        this.sync = true;
        let data =  await Cloud.activeProcess();
        if(data){
          this.thumbnailRequest = data;
        }
        console.log(this.FileStatus)
        this.sync = false;
        thie.getData();
      }catch(err){
        console.error(err)
      }
      
    },
    getData: async function () {
      let data = await Cloud.getProgress();
      this.listAllFilesInsert = data.listAllFilesInsert;
      this.listAllConverted = data.listAllConverted;
      setTimeout(() => this.getData(), 6000)
    },
     
  }
});
