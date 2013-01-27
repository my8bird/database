function splitInput(input) {
   var splitter = input.indexOf(' ');

   if (splitter === -1) {
      return {key: input, value: undefined};
   }

   return {key:   input.substring(0, splitter),
           value: input.substring(splitter + 1)};
}


exports.get = function(data, inputStr) {
   var input = splitInput(inputStr);

   if (! data.hasOwnProperty(input.key)) {
      if (input.value !== undefined) {
         return input.value;
      }
      throw 'Unknown Key';
   }

   return data[input.key];
};

exports.set = function(data, inputStr) {
   var input = splitInput(inputStr);
   data[input.key] = input.value;

   return input.value;
};


exports.exists = function(data, input) {
   return data.hasOwnProperty(input) ? 1 : 0;
};


exports.delete = function(data, input) {
   if (! data.hasOwnProperty(input)) {
      throw 'Unknown Key';
   }

   delete data[input];
};

exports.delete_safe = function(data, input) {
   delete data[input];
};
