/**
 * <app>
 * -----------------------------------------------------------------------------
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('app', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'id',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      fullname: '',
      route: '',
      description: '',
      routesData: [],
      menubar: false,
      theme: 'light',
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div>
    <sidebar-menu :username="fullname" :route="route" :description="description" :show-menu='menubar'>
      <template v-for="layout in routesData">
        <template v-for="item in layout.item">
          <sidebar-item
            :icon="item.icon"
            :name="item.name"
            :item="item.description"
            :action="item.action"
            :description.sync="description"
            :route.sync="route"
          >
        </sidebar-item>
        </template>
      </template>
    </sidebar-menu>
    <navbar :update.sync="fullname" :show-menu.sync='menubar' :handle-theme.sync="theme"></navbar>
    <div class="small-blur overlay" id="dialog-expanded-overlay"></div>
    <dialog class="left small" id="dialog-expanded">
      <header class="fixed">
        <nav>
          <button class="transparent circle large" @click="closeExpanded()">
            <i>menu</i>
          </button>
          <a>
          <img :src="[theme==='light'? '/images/monitor.png':'/images/monitor.png']" style="width: 60px">
          </a>
        </nav>
      </header>
      <template v-for="layout in routesData">
      <template v-for="item in layout.item">
        <sidebar-item-expanded
          :icon="item.icon"
          :name="item.nameExpanded"
          :item="item.description"
          :action="item.action"
          :description.sync="description"
          :route.sync="route"
        >
        </sidebar-item-expanded>
      </template>
      </template>
    </dialog>
    <main class="responsive" slot="content">
      <div class="small-space"></div>
      <slot name="default"></slot>
    </main>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    this.routesData = routes_data;
  },
  mounted: async function() {

  },
  beforeDestroy: function() {

  },

  watch: {

  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    closeExpanded: function (){
      this.showMenu = false;
      document.querySelector('#dialog-expanded').close();
      $("#dialog-expanded-overlay").removeClass('active');
    }
  }

});
