const ps = require('ps-node');
module.exports = {


  friendlyName: 'Verify ffmpeg',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    // TODO


    // Importar o módulo ps-node


// Definir o nome do processo que queremos verificar
const processName = 'ffmpeg';

// Procurar pelo processo usando uma expressão regular
ps.lookup({ command: new RegExp(processName) }, function(err, resultList) {
  if (err) {
    throw new Error(err);
  }
 /*  console.log(resultList) */
  // Verificar se encontramos algum resultado
  if (resultList.length > 0) {
    // Mostrar os detalhes do primeiro resultado
    let process = resultList[0];
    /* console.log('Processo encontrado!');
    console.log('PID: ', process.pid);
    console.log('Comando: ', process.command);
    console.log('Argumentos: ', process.arguments);
    console.log('CPU: ', process.cpu);
    console.log('Memória: ', process.mem); */
    return exits.success(true);
  } else {
    // Não encontramos nenhum processo com esse nome
   /*  console.log('Processo não encontrado!'); */
    return exits.success(false);
  }
});
  }


};

