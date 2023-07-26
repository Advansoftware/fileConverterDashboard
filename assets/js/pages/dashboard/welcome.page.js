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
    totalDownload: 0,
    totalUpload: 0,
    totalFiles: 0,
    statisticsItems: [],
    fileProcess: [],
    thumbnail: '',
    activeGraph: false,
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
        this.sync = false;
        thie.getData();
      }catch(err){
        console.error(err)
      }
      
    },
    getData: async function () {
      let getFile = await Cloud.ffproble();
      let data = await Cloud.getProgress();
      this.listAllFilesInsert = data.listAllFilesInsert;
      this.listAllConverted = data.listAllConverted;
      this.totalDownload = data.totalDownload;
      this.totalUpload = data.totalUpload;
      this.totalFiles = data.totalFiles;
      this.statisticsItems = [this.totalDownload,  this.totalUpload, this.totalFiles];
      this.activeGraph = true;
      this.thumbnail = getFile.thumbnail;
      this.fileProcess = getFile.listToConverter;
      if(typeof this.fileProcess !== 'undefined'){
        this.progressConversion = (this.fileProcess.progress/100).toFixed(3)
      }
      setTimeout(() => this.getData(), 6000)
    },
     
  }
});
