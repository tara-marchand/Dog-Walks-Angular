// adapted from https://github.com/angular-app/angular-app/blob/master/client/gruntFile.js
module.exports = function (grunt) {

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-html2js");

  // Default task.
  grunt.registerTask("default", ["jshint","build","karma:unit"]);
  grunt.registerTask("build", ["clean","html2js","concat"]);
  grunt.registerTask("release", ["clean","html2js","uglify","jshint","karma:unit","concat:index"]);
  grunt.registerTask("test-watch", ["karma:watch"]);

  // Print a timestamp (useful for when watching)
  grunt.registerTask("timestamp", function() {
    grunt.log.subhead(Date());
  });

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    return grunt.util._.extend(options, customOptions);
  };

  // Project configuration.
  grunt.initConfig({
    distdir: "dist",
    pkg: grunt.file.readJSON("package.json"),
    src: {
      js: ["app/scripts/*.js", "app/scripts/common/*.js"],
      specs: ["test/**/*-spec.js"],
      html: ["app/index.html"],
      tpl: {
        app: ["app/**/*-view.html"]
      }
    },
    clean: ["<%= distdir %>/*"],
    karma: {
      unit: { options: karmaConfig("test/unit/config.js") },
      watch: { options: karmaConfig("test/unit/config.js", { singleRun:false, autoWatch: true}) }
    },
    html2js: {
      app: {
        options: {
          base: "src/app"
        },
        src: ["<%= src.tpl.app %>"],
        dest: "<%= distdir %>/templates/app.js",
        module: "templates.app"
      }
    },
    concat:{
      dist:{
        src:["<%= src.js %>"],
        dest:"<%= distdir %>/<%= pkg.name %>.js"
      },
      index: {
        src: ["app/index.html"],
        dest: "<%= distdir %>/index.html",
        options: {
          process: true
        }
      }
    },
    uglify: {
      dist:{
        options: {
          // banner: "<%= banner %>"
        },
        src:["<%= src.js %>"],
        dest:"<%= distdir %>/<%= pkg.name %>.js"
      }
    },
    watch:{
      all: {
        files:["<%= src.js %>", "<%= src.specs %>", "<%= src.less =>", "<%= src.tpl.app %>", "<%= src.tpl.common %>", "<%= src.html %>"],
        tasks:["default","timestamp"]
      },
      build: {
        files:["<%= src.js %>", "<%= src.specs %>", "<%= src.less =>", "<%= src.tpl.app %>", "<%= src.tpl.common %>", "<%= src.html %>"],
        tasks:["build","timestamp"]
      }
    },
    jshint:{
      // files:["Gruntfile.js", "<%= src.js %>", "<%= src.specs %>", "<%= src.scenarios %>"],
      files:["Gruntfile.js", "<%= src.js %>", "<%= src.specs %>"],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }
  });

};