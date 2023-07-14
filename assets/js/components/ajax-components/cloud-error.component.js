/**
 * <cloud-error>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 *
 * --- SLOTS: ---
 * @slot default
 *
 * --- EVENTS EMITTED: ---
 * N/A
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('cloud-error', {

  //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝║ ║╠╩╗║  ║║    ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'withoutMargins',
    'error',
    'updateCloudError',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      beWithoutMargins: undefined,
      internalError: '',
      time: undefined,
    };
  },

  beforeMount: function() {
    if (this.withoutMargins !== undefined && typeof this.withoutMargins !== 'boolean') {
      throw new Error('<cloud-error> received an invalid `withoutMargins`.  If provided, this prop should be precisely true or false.');
    }
    this.beWithoutMargins = this.withoutMargins||false;
    
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div  class="toast error top" :class="[internalError!=='' ? 'active' : '']" @click="closeToast">
    <div :class="{ 'm-0': beWithoutMargins }"  class="max" ><slot name="default">An error occured while processing your request. Please check your information and try again, or <a href="/contact">contact support</a> if the error persists.</slot></div>
    <a class="inverse-link" >Fechar</a>
    </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  mounted: async function () {
    
    
  },

  watch: {
    withoutMargins: function(unused) { throw new Error('Changes to `withoutMargins` are not currently supported in <cloud-error>!'); },
    error:{
      handler(){
        this.setError();
      },
      deep: true,
      immediate: true
    },
  },

  beforeDestroy: function() {

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝║║║╠═╣║    ║╣ ╚╗╔╝║╣ ║║║ ║   ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╚═╝ ╚╝ ╚═╝╝╚╝ ╩   ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝

    //…

    //  ╔═╗╦ ╦╔╗ ╦  ╦╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ╠═╝║ ║╠╩╗║  ║║    ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩  ╚═╝╚═╝╩═╝╩╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    // > Public methods are rarely exposed by Vue components, but sometimes they
    // > are an important escape hatch.  They are callable via something like
    // > `this.$refs.componentNameInCamelCase.doSomething())`, and, by convention,
    // > are always prefixed with "do".
    // N/A

    //  ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝

    //…
    valid: function (err){
      if(this.getError(err))  {
        this.internalError = this.error;
        this.time = setTimeout(()=>{
          this.closeToast();
        },8000);
      }
    },
    getError: function(close=false){
      if(this.error !== '' && !close) return true;
      return false;
    }, 
    setError: function(close){ 
      this.valid(close);
      this.$emit('update:updateCloudError', this.internalError);
    },
    closeToast: function(){
      this.internalError ='';
      this.setError(true);
      clearTimeout(this.time);
    },
    
  }

});
