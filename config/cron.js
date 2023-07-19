// ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']
module.exports.cron = {
    converter: {
        schedule: '00 */2 * * * *',
        onTick: async function () {
            await sails.helpers.crons.converter();
            sails.log.info('Converter Cron');
        },
        start: true, // Start task immediately
        timezone: 'America/Sao_Paulo', // Custom timezone
        context: undefined, // Custom context for onTick callback
        runOnInit: true // Will fire your onTick function as soon as the request initialization has happened.
    },

};