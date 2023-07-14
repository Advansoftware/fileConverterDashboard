/**
 * <navbar>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('navbar', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'update',
    'showMenu',
    'handleTheme'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      me:null,
      fullName: '',
      email: '',
      theme: null,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <nav class="top">
      <button class="transparent circle large" @click="showExpandedMenu()">
        <i>menu</i>
      </button>
      <img :src="[theme==='light'? '/images/monitor.png':'/images/monitor.png']" style="width: 60px">
      <div class="max"></div>
      <button class="transparent circle" @click="setTheme()">
        <i class="page top" :class="[theme==='light'? 'active': '']">dark_mode</i>
        <i class="page top" :class="[theme==='dark'? 'active': '']">light_mode</i>
      </button>
      <button class="circle large small-margin transparent" @click="getlogoutClick()">
        <img class="responsive" src="/images/avatar.png">
        <menu class="left no-wrap" id="menu-add" data-ui="#menu-add">
          <a class="row" href="settings">
            <div class="min">
              <i>account_circle</i>
            </div>
            <div class="min">Minha Conta</div>
          </a>
          <a class="row" id="bnt-logout">
            <div class="min">
              <i>logout</i>
            </div>
            <div class="min">Sair</div>
          </a>
        </menu>
      </button>

    </nav>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {


  },
  mounted: async function() {
    if(!localStorage.fullname||localStorage.me==='undefined') {
      this.me = {fullName:'teste', email:'teste@teste.com'}//await Cloud.getMe();
      localStorage.me = JSON.stringify(this.me);
      let parseJson = JSON.parse(localStorage.me);
      localStorage.email = parseJson.email;
      localStorage.fullName = parseJson.fullName;
      this.fullName = localStorage.fullName;
      this.email = localStorage.email;
    }
    this.initTheme();
  },
  beforeDestroy: function() {

  },

  watch: {
    fullName:{
      handler(){
        this.setName();
      },
      deep: true,
      immediate: true
    },
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    showNotification: function (){
      var $trigger = $('.header-notification');
      $trigger.find('.show-notification').slideToggle(500);
      $trigger.toggleClass('active');
      if($trigger !== event.target && !$trigger.has(event.target).length){
        $('.show-notification').slideUp(300);
        $('.header-notification').removeClass('active');
      }
    },
    setName: async function() {
      this.fullName = localStorage.fullName;
      this.$emit('update:update', this.fullName);
    },
    getlogoutClick: function (){
      $("#bnt-logout").on('mousedown', function() {
        localStorage.clear();
        sessionStorage.clear()
        window.location.href = "/logout";
      });
    },
    showExpandedMenu: function (){
      let value = this.showMenu;
      this.$emit('update:showMenu', !value);
    },
    initTheme: function (){
      if(!this.theme && !sessionStorage.getItem('theme'))  {
        sessionStorage.setItem('theme', 'light');
        this.theme = sessionStorage.getItem('theme');
      }else {
        this.theme = sessionStorage.getItem('theme');
       $('body').addClass(this.theme);
        this.$emit('update:handleTheme', this.theme)
      }
    },
    setTheme: function (){
        if(this.theme === 'light'){
          sessionStorage.setItem('theme', 'dark');
          if($('body').hasClass("light")) $('body').removeClass('light');
          $('body').addClass('dark');
        }else{
          sessionStorage.setItem('theme', 'light');
          if($('body').hasClass("dark")) $('body').removeClass('dark');
          $('body').addClass('light');
        }
        this.theme = sessionStorage.getItem('theme');
        if(this.theme!==undefined) {
          $('body').addClass(this.theme);
          this.$emit('update:handleTheme', this.theme)
        }
    }
  }

});
