require 'rubygems'

HEADER = /((^\s*\/\/.*\n)+)/
RUBY_ENV = :development

desc "rebuild the regenerator-min.js files for distribution"
task :build do
  begin
    require 'closure-compiler'
  rescue LoadError
    puts "closure-compiler not found.\nInstall it by running 'gem install closure-compiler"
    exit
  end
  source = File.read 'reload.js'
  header = source.match(HEADER)
  File.open('reload-min.js', 'w+') do |file|
    file.write header[1].squeeze(' ') + Closure::Compiler.new.compress(source)
  end
end

desc "build the docco documentation"
task :doc do
  check 'docco', 'docco', 'https://github.com/jashkenas/docco'
  system 'docco reload.js'
end

desc "run JavaScriptLint on the source"
task :lint do
  system "jsl -nofilelisting -nologo -conf docs/jsl.conf -process public.regenerator.js"
end

#desc "test the CoffeeScript integration"
#task :test do
#  check 'coffee', 'CoffeeScript', 'https://github.com/jashkenas/coffee-script.git'
#  system "coffee test/*.coffee"
#end

# Check for the existence of an executable.
def check(exec, name, url)
  return unless `which #{exec}`.empty?
  puts "#{name} not found.\nInstall it from #{url}"
  exit
end
