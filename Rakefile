# coding: utf-8

namespace :post do
  desc 'Create a blank post.'
  task :create, [:base_file_name] do |t, args|
    markdown_extension = 'md'
    date = Time.now.strftime('%Y-%m-%d')
    file_name = "#{date}-#{args[:base_file_name]}.#{markdown_extension}"
    file_path = File.join(Dir.pwd, 'posts', file_name)
    template = <<EOT
---
title: 
---

EOT
    unless File.exist?(file_path)
      File.open(file_path, 'w') do |f|
        f.write(template)
      end
      puts "Create a post `#{file_name}`."
    else
      puts "Already exist `#{file_name}`."
    end

    sh "mvim #{file_path}"
  end
end
