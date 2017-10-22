module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    git: {
       // will invoke "git push origin master" 
       origin: ['rev-parse', 'HEAD'],
    
       // will invoke "git pull upstream master" 
       upstream: 'pull upstream master'
      }
    ,

    http_upload: { 
        your_target: {
          options: {
            url: 'https://hov-stg-aio01.productmadness.com/admin/api/upload_lobby_components',
            method: 'POST',
            rejectUnauthorized: true,
            headers: {
              'Authorization': 'Token',
              'api_token' : '6e114e8f8284a832ba0f81d520e96ac8'
            },
            data: {
              api_token : "6e114e8f8284a832ba0f81d520e96ac8",
              component_type : "ComponentTypeTest",
              component_name : "ComponentNameTest",
              skin_name : "SkinNameTest"
            },
            onComplete: function(data) {
                console.log('Response: ' + data);
            }
          },
          src: 'file.zip',
          dest: 'component_file'
        },
      },
  });

  grunt.loadNpmTasks('grunt-http-upload');
  grunt.loadNpmTasks('grunt-simple-git');

  // Default task(s).
  grunt.registerTask('default', ['git']);

};

// curl --progress-bar --verbose -F 'component_file=@file.zip' -F 'api_token=6e114e8f8284a832ba0f81d520e96ac8' -F 'component_type=ComponentTypeTest' -F 'component_name=ComponentNameTest' -F 'skin_name=SkinNameTest' https://hov-stg-aio01.productmadness.com/admin/api/upload_lobby_components