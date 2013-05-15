require 'rubygems'
require 'builder'
require 'Date'

desc "see usage"
task :default do 
  system 'rake -T'
end

desc "update sitemap.xml with current date"
task :compile_sitemap do
  output = ''
  xml = Builder::XmlMarkup.new(:target => output, :indent => 2)
  xml.instruct!
  xml.urlset(:xmlns => "http://www.sitemaps.org/schemas/sitemap/0.9") {
    xml.url {
      xml.loc "http://matthiaskadenbach.de"
      xml.lastmod Date.today
      xml.changefreq "weekly"
      xml.priority "1.0"
    }
  }
  # save to file
  open('sitemap.xml', 'w') do |f|
    f << output
  end
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
  cat css/bootstrap.css \
  css/bootstrap-responsive.css \
  css/font-awesome.css \
  css/styles.css > css/styles.min.css.tmp && \
  lessc -yui-compress css/styles.min.css.tmp css/styles.min.css && \
  rm css/styles.min.css.tmp'
end

desc "make js nice"
task :lintjs do
  system 'fixjsstyle \
    js/rotator.jquery.js \
    js/js.js'
end

