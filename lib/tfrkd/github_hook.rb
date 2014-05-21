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
    parse_git

    before do
      cache_control :public, :must_revalidate
      etag settings.commit_hash
      last_modified settings.commit_date
    end

    post '/update' do
      content_type :txt

      if settings.autopull?
        `git pull 2>&1`

        settings.parse_git

        app.settings.reset!
        load app.settings.app_file

        'reload!'
      else
        'ok'
      end
    end
  end
end

__END__
