
exports.exit = function(data, inputStr, proto) {
   proto.conn.end();
};


exports.info = function(data, inputStr) {
   // XXX read from a better place
   return {
      version: '0.0.1'
   };
};
