var net    = require('net'),
    assert = require('assert'),
    _      = require('underscore'),

    datastore = require('./datastore'),

    EventEmitter = require('events').EventEmitter;


var server = null;

exports.start = function(config, callback) {
   assert(server === null, 'The server is already active');

   _.defaults(config, {
      host: 'localhost',
      port: 8080});

   server = net.createServer(function(conn) {
      var data = "",
          protocol = new Protocol(conn);

      datastore.addProtocol(protocol);

      conn.on('data', function(buffer) {
         data += buffer.toString();

         var lines = data.split(/[\n\r]+/);
         for (var i = 0; i < lines.length-1; i++) {
            conn.emit('line', lines[i]);
         }

         data = lines[lines.length - 1];
      });

      conn.on('end', function() {
         console.log('end', arguments);
      });
   });

   server.listen(config.port, config.host, function() {
      callback();
   });

   return server;
};


function Protocol(connection) {
   _.bindAll(this, '_onLine');

   this.conn = connection;

   this._command = null;
   this._input   = null;

   connection.on('line', this._onLine);
};

_.extend(Protocol.prototype, EventEmitter.prototype, {
   _onLine: function(line) {
      if (this._command === null) {
         this._command = line;
      }
      else {
         this._input = line;

         this.emit('command', this, this);

         this._command = null;
         this._input   = null;
      }
   }
});
