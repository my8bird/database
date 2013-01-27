var commands = require('./commands');

var data = {};


exports.addProtocol = function(proto) {
   proto.on('command', function() {
      var command = proto._command.toLowerCase(),
          input   = proto._input;

      if (! commands.hasOwnProperty(command)) {
         proto.conn.write('Err Unknown command\n');
         return;
      }

      try {
         var res = commands[command](data, input, proto);
      } catch (err) {
         return proto.conn.write('Err ' + err + '\n');
      }

      if (res === undefined) {
         res = '';
      }
      proto.conn.write('OK ' + res + '\n');
   });
};
