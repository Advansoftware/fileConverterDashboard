// ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']
module.exports.cron = {
    converter: {
        schedule: '*/20 * * * * *',
        onTick: async function () {
            await sails.helpers.crons.converter();
            sails.log.info('Start FFMPEG');
        },
        start: true, 
        timezone: 'America/Sao_Paulo',
        context: undefined, 
        runOnInit: true 
    },
    downloader: {
        schedule: '*/20 * * * * *',
        onTick: async function () {
            await sails.helpers.crons.downloader();
            sails.log.info('Start Download');
        },
        start: true, 
        timezone: 'America/Sao_Paulo',
        context: undefined, 
        runOnInit: true 
    },
    downloader: {
        schedule: '*/20 * * * * *',
        onTick: async function () {
            await sails.helpers.crons.downloader();
            sails.log.info('Start Download');
        },
        start: true, 
        timezone: 'America/Sao_Paulo',
        context: undefined,
        runOnInit: true 
    },
    uploader: {
        schedule: '*/20 * * * * *',
        onTick: async function () {
            await sails.helpers.crons.uploader();
            sails.log.info('Start Upload');
        },
        start: true, // Start task immediately
        timezone: 'America/Sao_Paulo', // Custom timezone
        context: undefined, // Custom context for onTick callback
        runOnInit: true // Will fire your onTick function as soon as the request initialization has happened.
    },

};