module.exports = {


  friendlyName: 'Delete',


  description: 'Delete portal.',


  inputs: {
    id: {
      type: 'string',
      required: true
    }

  },


  exits: {
    error: {
      statusCode: 500,
    },
    notFound: {
      statusCode: 404
    }
  },


  fn: async function ({ id }, exits) {

    try {
      const portalUpdate = await Portal.findOne({ id });
      if (!portalUpdate) {
        return exits.notFound();
      }

      portalUpdate.active ? await Portal.update({ id }).set({ active: false }) : await Portal.update({ id }).set({ active: true });
      return exits.success();
    } catch (error) {
      return exits.error(error)
    }

    // All done.
    return;

  }


};
