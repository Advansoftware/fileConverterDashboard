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
  <article class="small no-padding">
  <div class="progress left green" id="card-load"></div>
  <img  class="responsive medium" :src="thumbnail" style="opacity: .5"/>
  <div class="absolute bottom left right padding bottom-shadow white-text">
  <nav>
    <h5>Processando: {{ (value*100).toFixed(2) }}%</h5>
    <div class="max"></div>
    <button class="circle transparent">
      <i>more_vert</i>
    </button>
  </nav>
</div>
  </article>
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
    $('#card-load').css('clip-path', "polygon(0% 0%, 0% 100%, "+this.value*100+"% 100%, "+this.value*100+"% 0%)")
      
   }
  }
});
