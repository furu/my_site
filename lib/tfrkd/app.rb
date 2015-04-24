require 'sinatra/base'
require 'ostruct'
require 'time'
require 'yaml'
require 'builder'
require 'cgi'

module Tfrkd
  class App < Sinatra::Base
    configure :development do
      require 'pry'
      require 'sinatra/reloader'

      register Sinatra::Reloader
    end

    helpers do
      def h(str)
        ::CGI.escape_html(str)
      end
    end

    def self.parse_git
      sha1, date = `git log HEAD~1..HEAD --pretty=format:'%h^%ci'`
        .strip
        .split('^')
      set :commit_hash, sha1
      set :commit_date, Time.parse(date)
    end
    parse_git

    set :root, File.expand_path('../../..', __FILE__)
    set :articles, []
    set :app_file, __FILE__
    set :site_title, '49.212.143.129'
    set(:cached) { production? }

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

    before do
      if settings.cached?
        cache_control :public, :must_revalidate
        etag settings.commit_hash
        last_modified settings.commit_date
      end
    end

    get '/' do
      erb :index
    end

    get '/log' do
      erb :archive
    end

    get '/log/feed.atom' do
      content_type 'application/atom+xml', charset: 'utf-8'
      builder :feed
    end
  end
end

__END__
