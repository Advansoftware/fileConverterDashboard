/**
 * <grid>
 * -----------------------------------------------------------------------------
 * Componente responsavel pela adaptação responsiva da tela
 *
 * @type {Component}
 *
 * @slot default                     [conteudo do site a ser colocado dentro da grade]
 *
  --- EVENTS EMITTED: ---
 * N/A
 */

parasails.registerComponent('grid', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'spacing',
    'sm',
    'md',
    'lg',
    'item',
    'container',
    'fullWidth'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      space: 1,
      gridSize: '',
      type: 'grid'
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <main v-if="container!==undefined" class="responsive" :class="[fullWidth!==undefined ? 'max': '']" style="min-height: max-content!important;">
      <div class="grid"  :class="[space]" >
        <slot name="default"></slot>
      </div>
    </main>
    <div  v-else :class="[gridSize]">
      <slot name="default"></slot>
    </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    this.getSpaceItem();
    this.getClassItem();
  },
  mounted: async function() {
    
  },
  beforeDestroy: function() {

  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  watch:{
    
  },
  methods: {
    getClassItem: function(){
      let mountGrid = '';
      let s = ['s1','s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12'];
      let m = ['m1','m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12'];
      let l = ['l1','l1','l2','l3','l4','l5','l6','l7','l8','l9','l10','l11','l12'];
      if(this.sm) mountGrid = `${mountGrid} ${s[this.sm]}`;
      if(this.md) mountGrid = `${mountGrid} ${m[this.md]}`;
      if(this.lg) mountGrid = `${mountGrid} ${l[this.lg]}`;
      this.gridSize = mountGrid;
    },
    getSpaceItem: function(){
      let defineSpace = ['no-space', 'small-space', 'medium-space', 'large-space'];
      if(!this.spacing) return;
      this.space = defineSpace[this.spacing]
    },
  }

});
