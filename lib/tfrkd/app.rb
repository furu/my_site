require 'sinatra/base'
require 'ostruct'
require 'time'
require 'yaml'

module Tfrkd
  class App < Sinatra::Base
    configure :development do
      require 'pry'
      require 'sinatra/reloader'

      register Sinatra::Reloader
    end

    configure :production do
      use GithubHook
    end

    set :root, File.expand_path('../../..', __FILE__)
    set :articles, []
    set :app_file, __FILE__

    Dir.glob("#{root}/posts/*.md") do |file|
      meta, content = File.read(file).split("\n\n", 2)
      article = OpenStruct.new(::YAML.load(meta))

      unless article.respond_to?('date')
        article.date = File.basename(file, '.md')
          .match(/(\d{4}-\d{2}-\d{2})/)
          .to_s
      end

      article.date = Time.parse(article.date.to_s)
      article.content = content
      article.slug = File.basename(file, '.md')

      get "/log/#{article.slug}" do
        erb :post, locals: { article: article }
      end

      articles << article
    end

    articles.sort_by! { |article| article.date }
    articles.reverse!

    get '/' do
      erb :index
    end

    get '/log' do
      erb :archive
    end
  end
end

__END__
