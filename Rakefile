desc "see usage"
task :default do 
  system 'rake -T'
end

desc "compile js files"
task :compilejs do 
  system 'closure-compiler \
        --js js/bootstrap.js \
        --js js/rotator.jquery.js \
        --js js/js.js \
        --js_output_file js/js.min.js'
end

desc "compile css files"
task :compilecss do
  system 'if [ -e css/styles.min.css ]; then rm css/styles.min.css; fi && \
  cat css/*.css > css/styles.min.css.tmp && \
  lessc -yui-compress css/styles.min.css.tmp css/styles.min.css && \
  rm css/styles.min.css.tmp'
end

desc "make js nice"
task :lintjs do
  system 'fixjsstyle \
    js/rotator.jquery.js \
    js/js.js'
end

