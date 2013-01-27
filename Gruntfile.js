/*jshint debug:true, node:true */

var path       = require('path'),
    Handlebars = require('handlebars'),
    _          = require('underscore');


function expandFiles(grunt, root, paths) {
   var expanded = paths.map(function(item) {
      if (item.indexOf('*') !== -1) {
         return _.sortBy(grunt.file.expandFiles(item), function(item) {return item; });
      }
      return item;
   });

   expanded = _.flatten(expanded);

   expanded = expanded.map(function(item) {
      return item.replace(root, '');
   });

   return expanded;
}

function compileHtml(grunt) {
   var config = this,
       js_files, css_files,
       template = grunt.file.read(config.data.src);

   js_files  = expandFiles(grunt, config.data.root, config.data.js);
   css_files = expandFiles(grunt, config.data.root, config.data.css);

   // Read the file
   var compiled = Handlebars.compile(template)({css: css_files, js: js_files});
   grunt.file.write(config.data.dest, compiled);
   console.log('Template updated:', config.data.dest, js_files);
}


function configureJsHint(config) {
   config.jshint = {
      options: {
         // Code complexity
         maxparams: 8,
         maxdepth: 4,
         maxstatements: 100,

         // environments
         browser: true,
         devel:   true
      },
      globals: {
         p5:       true,
         Backbone: false,
         _:        true,
         JST:      false,
         $:        false
      }
   };
}


module.exports = function(grunt) {
   // --- ADD GRUNT EXTENSIONS --- //
   grunt.loadNpmTasks('grunt-contrib');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   // -- Add our custom tasks
   grunt.registerMultiTask('compile_html', 'Fills in the html templates source paths',
                           compileHtml.bind(grunt));

   var config = {};

   //{ Configuration for tools
   configureJsHint(config);
   //}

   // Set the files for each application
   config.apps = {};

   config.clean = {
      all: ['build/*']
   };

   // ------ LINT ----------
   config.lint = {
      build: ['grunt.js'],
      src: ['src/**/*.js']
   };

   // --------- JS templates ---------
   config.handlebars = {
      options: {
         wrapped: true,
         processName: function(name) {
            return path.basename(name, '.jst');
         }
      },
      all: {
         files: {
            'build/templates.js': 'src/templates/*.jst'
         }
      }
   };

   config.copy = {
      deps: {
         files: {
            'build/dev/deps/handlebars.js': 'node_modules/handlebars/handlebars.js',
            'build/dev/deps/jquery.js':     'node_modules/jquery/jquery.js',
            'build/dev/deps/underscore.js': 'node_modules/underscore/underscore.js',
            'build/dev/deps/backbone.js':   'node_modules/backbone/backbone.js'
         }
      },
      src: {
         files: {'build/app/': 'src/**/*.js'}
      }
   };

   config.uglify = {
      deps: {
         'build/prod/deps.js': 'build/dev/deps/*.js'
      },

      src: {
         'build/prod/app.js': 'build/dev/app/*.js'
      }
   };

   // -------------- Watcher -------------
   config.watch = {
      build: {
         files: ['grunt.js'],
         tasks: ['<config:lint.build>']
      },
      js: {
         files: ['<config:lint.src>'],
         tasks: 'lint copy compile_html'
      },
      js_templates: {
         files: ['src/admin/templates/*.jst'],
         tasks: 'handlebars'
      }
/*,
      css: {
         files: ['resources/scss/**.scss'],
         tasks: 'compass compile_html'
      }*/
   };

   // Configure Grunt
   grunt.initConfig(config);
   grunt.registerTask('full', ['clean', 'lint', 'copy', 'handlebars', 'compile_html']);
   grunt.registerTask('default', ['full']);
};
