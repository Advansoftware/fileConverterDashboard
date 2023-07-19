parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: '',
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
  },
  mounted: async function() {
    //…
    io.socket.get('/api/v1/ffproble');

    await Cloud.on('filestatus', (msg) => {
      this.progressConversion = (msg.progress/100).toFixed(3);
      this.progress = (this.progressConversion.substr(2)/10).toFixed(2)
      this.thumbnail = 'data:image/png;base64,'+msg.thumbnail;
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
          io.socket.get('/api/v1/ffproble');
        }
        this.sync = false;
      }catch(err){
        console.error(err)
      }
     
    }
  }
});
