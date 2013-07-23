module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        // variable object for source and build directory names
        "builddirs": {
            source: "app",
            destination: "dist"
        },

        clean: {
            // build directory
            builddest: ["<%= builddirs.destination %>/**/*"],
            // temporary concatenated and minified js
            tempjs: ["<%= builddirs.source %>/js/*.concat.js", "<%= builddirs.source %>/js/*.min.js"]
        },

        useminPrepare: {
            html: [
                "<%= builddirs.source %>/index.html"
            ]
        },

        compass: {
            options: {
                config: "<%= builddirs.source %>/config.rb"
            }
        },

        // files added from html using usemin
        concat: {
        },

        // files added from html using usemin
        uglify: {
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= builddirs.source %>",
                        src: ["*.html", "views/**", "favicon.ico"],
                        dest: "<%= builddirs.destination %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= builddirs.source %>",
                        src: "css/**",
                        dest: "<%= builddirs.destination %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= builddirs.source %>",
                        src: "img/**",
                        dest: "<%= builddirs.destination %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= builddirs.source %>",
                        src: ["js/*.min.js", "js/consumers/**", "js/data/**", "js/views/**", "services/*.js"],
                        dest: "<%= builddirs.destination %>"
                    }
                ]
            }
        },

        usemin: {
            html: [
                "<%= builddirs.destination %>/index.html"
            ]
        }

    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-usemin");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", []);
    grunt.registerTask("build", ["clean:builddest", "useminPrepare", "compass", "concat", "uglify", "copy", "usemin", "clean:tempjs"]);

};