require 'sinatra/base'
require 'time'

module Tfrkd
  class GithubHook < Sinatra::Base
    def self.parse_git
      sha1, date = `git log HEAD~1..HEAD --pretty=format:'%h^%ci'`
        .strip
        .split('^')
      set :commit_hash, sha1
      set :commit_date, Time.parse(date)
    end

    set(:autopull) { production? }
    set(:cached) { production? }
    parse_git

    before do
      if settings.cached?
        cache_control :public, :must_revalidate
        etag settings.commit_hash
        last_modified settings.commit_date
      end
    end

    post '/update' do
      content_type :txt

      settings.autopull? && `git pull 2>&1`

      settings.parse_git

      app.settings.reset!
      load app.settings.app_file

      'reloaded!'
    end
  end
end

__END__
