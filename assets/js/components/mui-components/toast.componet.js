/**
 * <toast>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('toast', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'label',
    'color',
    'active',
    'top'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      activeInternal: '',
      time: undefined,
      align: '',
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="toast" :class="
      [
        align,
        color !== undefined ? color : '',
        activeInternal !=='' ? 'active' : ''
      ]"
      @click="closeToast"
    >
      <div class="max">
        <slot name="default">{{ label }}</slot>
      </div>
      <a class="inverse-link">Fechar</a>
    </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: async function() {
      if(typeof(this.top)!=='undefined') this.align = 'top';
  },  
  beforeDestroy: function() {

  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  watch:{
    active:{
      handler(){
        this.setActive();
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    valid: function (err){
      if(this.getActive(err))  {
        this.activeInternal = this.active;
        this.time = setTimeout(()=>{
          this.closeToast();
        },8000);
      }
    },
    getActive: function(close=false){
      if(this.active && !close) return true;
      return false;
    }, 
    setActive: function(close){ 
      this.valid(close);
      this.$emit('update:active', this.activeInternal);
    },
    closeToast: function(){
      this.activeInternal ='';
      this.setActive(true);
      clearTimeout(this.time);
    },
  }

});
