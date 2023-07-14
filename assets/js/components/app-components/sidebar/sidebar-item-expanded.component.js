/**
 * <sidebar-item-expanded>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('sidebar-item-expanded', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'icon',
    'name',
    'action',
    'route',
    'description',
    'item',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      active: false,
      location: '',
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
      <a v-if="icon!==undefined" :href="action" class="row round" :class="[active ? 'active' : '']">
          <i>{{icon}}</i>
          <div>{{name}}</div>
      </a>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    this.location = window.location.pathname.split('/')[1].toString();
  },
  mounted: async function() {
    this.isActive();
  },
  beforeDestroy: function() {

  },

  watch: {
    location:{
      handler(){
        this.isActive();
      },
      deep: true,
      immediate: true,
    }
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    isActive: function (){
      if(this.location === this.action.toString()){
        this.active = true;
        this.$emit('update:route',this.name);
        this.$emit('update:description', this.item);
      }
      else{
        this.active = false;
      }

    }
  }

});
