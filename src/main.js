// Load the basics
var optimist = require('optimist'),
    ini      = require('node-ini');


// Parse the command line options
var argv = optimist
       .demand('c')
       .alias('c', 'config')
       .describe('Configuration file to use')
       .argv;


// Parse the config file
var config = ini.parseSync(argv.config);


// Start the system up
var server = require('./server');
server.start(config.server, function() {
   console.log('ready to go');
});