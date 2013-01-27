var _ = require('underscore');

module.exports = _.defaults({},
                            require('./system'),
                            require('./basic'));
