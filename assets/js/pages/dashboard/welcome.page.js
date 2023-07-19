parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: '',
    FileStatus: [],
    pageLoadedAt: Date.now(),
    progressConversion: 0,
    progress: 0,
    thumbnail: '',
    sync:false,
    thumbnailRequest: [],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
    _.extend(this, window.SAILS_LOCALS);
  },
  mounted: async function() {
    //…
    io.socket.get('/api/v1/ffproble');
    await Cloud.on('filestatus', (msg) => {
      this.progressConversion = (msg.progress/100).toFixed(3);
      this.progress = (this.progressConversion.substr(2)/10).toFixed(2)
      this.thumbnail = 'data:image/png;base64,'+msg.thumbnail;
      io.socket.get('/api/v1/ffproble');
    });
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
      }catch(err){
        console.error(err)
      }
      
    },
     
  }
});
