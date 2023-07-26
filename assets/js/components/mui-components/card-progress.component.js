/**
 * <card-progress>
 * -----------------------------------------------------------------------------
 * componente responsavel pela criação do grafico.
 *
 * @type {Component}
 *
 --- EVENTS EMITTED: ---
 * N/A
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('card-progress', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'value',
    'thumbnail',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {

    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div >
  <article class="small no-padding" v-if="thumbnail">
  <div class="progress left green"></div>
  <img  class="responsive medium" :src="thumbnail"  id="card-load"/>
  <img  class="responsive medium" :src="thumbnail" style="opacity: .5; position: absolute;left:0;"/>
  <div class="absolute bottom left right padding bottom-shadow white-text">
  <nav>
    <h5>Processando: {{ value }}%</h5>
    <div class="max"></div>
    <button class="circle transparent">
      <i>more_vert</i>
    </button>
  </nav>
</div>
  </article>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function(){
    //…

  },
  beforeDestroy: function() {
    //…
  },
  watch: {
    value:{
      handler(){
        this.generateGraph();
      },
      deep: true,
      immediate: true
    },
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    generateGraph: function() {
      $('#card-load').css('clip-path', 'polygon(0% 0%, 0% 100%, '+this.value+'% 100%, '+this.value+'% 0%)');

    }
  }
});
